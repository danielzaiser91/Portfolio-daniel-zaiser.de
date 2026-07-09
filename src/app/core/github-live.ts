import { Injectable, signal } from '@angular/core';

export interface LiveRepoStats {
  commits?: number;
  /** YYYY-MM, from the repo's pushed_at. */
  lastTouched?: string;
  /** YYYY-MM, from the repo's created_at. */
  started?: string;
  language?: string;
}

const OWNER = 'danielzaiser91';
const API = 'https://api.github.com';
const CACHE_KEY = 'dz-gh-live-stats-v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

interface CachePayload {
  fetchedAt: number;
  stats: Record<string, LiveRepoStats>;
}

interface GhRepo {
  name: string;
  language: string | null;
  pushed_at: string;
  created_at: string;
}

/**
 * Fetches live repo stats (commits, dates, language) straight from the public GitHub REST API —
 * no backend, no token. GitHub exposes CORS + the `Link` pagination header for anonymous requests,
 * so commit counts can be read client-side via the last-page number.
 *
 * This is progressive enhancement only: callers always have static fallback data, so a failed or
 * rate-limited fetch (60 req/h per IP, unauthenticated) never breaks the page — it just means the
 * page shows the last-known-good snapshot instead of fully live numbers.
 */
@Injectable({ providedIn: 'root' })
export class GithubLiveStats {
  readonly stats = signal<Record<string, LiveRepoStats>>({});
  readonly loading = signal(false);

  private started = false;

  /** Kick off a live refresh for the given repo names. Cheap to call repeatedly — only fetches once per cache TTL. */
  ensure(repoNames: string[]): void {
    if (this.started) {
      return;
    }
    this.started = true;

    const cached = this.readCache();
    if (cached) {
      this.stats.set(cached.stats);
      if (Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        return;
      }
    }
    void this.refresh(repoNames);
  }

  private async refresh(repoNames: string[]): Promise<void> {
    this.loading.set(true);
    try {
      const res = await fetch(`${API}/users/${OWNER}/repos?per_page=100`);
      if (!res.ok) {
        return;
      }
      const repos: GhRepo[] = await res.json();
      const byName = new Map(repos.map((r) => [r.name, r]));

      const merged: Record<string, LiveRepoStats> = { ...this.stats() };
      for (const name of repoNames) {
        const r = byName.get(name);
        if (r) {
          merged[name] = {
            ...merged[name],
            lastTouched: r.pushed_at?.slice(0, 7),
            started: r.created_at?.slice(0, 7),
            language: r.language ?? merged[name]?.language,
          };
        }
      }
      this.stats.set({ ...merged });

      const results = await Promise.allSettled(repoNames.map((name) => this.fetchCommitCount(name)));
      const withCommits = { ...this.stats() };
      for (const result of results) {
        if (result.status === 'fulfilled') {
          withCommits[result.value.name] = { ...withCommits[result.value.name], commits: result.value.commits };
        }
      }
      this.stats.set(withCommits);
      this.writeCache(withCommits);
    } catch {
      // Network/CORS/rate-limit failure — keep whatever cache or static fallback callers already have.
    } finally {
      this.loading.set(false);
    }
  }

  private async fetchCommitCount(name: string): Promise<{ name: string; commits: number }> {
    const res = await fetch(`${API}/repos/${OWNER}/${name}/commits?per_page=1`);
    if (!res.ok) {
      throw new Error(`${name}: ${res.status}`);
    }
    const link = res.headers.get('link');
    const match = link?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    return { name, commits: match ? Number(match[1]) : 1 };
  }

  private readCache(): CachePayload | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? (JSON.parse(raw) as CachePayload) : null;
    } catch {
      return null;
    }
  }

  private writeCache(stats: Record<string, LiveRepoStats>): void {
    try {
      const payload: CachePayload = { fetchedAt: Date.now(), stats };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {
      // Storage full/unavailable/private-mode — non-fatal, just skip caching.
    }
  }
}
