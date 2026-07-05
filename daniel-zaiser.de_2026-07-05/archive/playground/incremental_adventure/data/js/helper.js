const default_el = document.createElement('div');
const log_array = [];

export function log(s) {
  console.log(s);
  log_array.push(s);
}

export function error(s) {
  console.error(s);
  log_array.push(s);
}

export function q(s) {
  const el = document.querySelector(s);
  if (!el) {
    error('query returns null for "'+s+'"');
    return default_el;
  }
  
  return document.querySelector(s);
};

export function qAll(s) {
  const el = document.querySelectorAll(s);
  if (!el?.length) {
    error('query returns null for "'+s+'"');
    return default_el;
  }
  
  return document.querySelector(s);
};


