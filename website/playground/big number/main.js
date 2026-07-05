class Str {
  _val = 0;
  get val() { return this._val }
  set val(v) {this._val = v; this.onValChange(); }
  els = {
    incBtns: qAll('[str-incBtn]'),
    ui_incBy: qAll('[str-incBy]'),
    ui_str_score: qAll('[ui-str-score]'),
    upgradeBtns: []
  }
  milestones = [
    { target: 10, reached: false, effectText: '+1🗡️' }, // +1 per click?
    { target: 100, reached: false, effectText: 'x2🗡️' }, // *1.2 per click?
    { target: 1e3, reached: false, effectText: '+⬆️' }, // unlock upgrade
    { target: 1e4, reached: false, effectText: '++⬆️' }, // unlock upgrade
    { target: 1e6, reached: false, effectText: '🤖⬆️' }, // unlock upgrade
    { target: 2e6, reached: false, effectText: '☘️' }, // unlock prestige
  ]
  pp = 0;
  pp_min_req = 5e6;
  // (5e6)*1.2**4
  calcAffordableAmount(calcedVal, ppNr = 0, accCost = 0) {
    const cost = this.pp_min_req*(1.2**ppNr);
    const canAfford = calcedVal >= cost;
    if (!canAfford) return [ppNr, accCost + cost];
    return this.calcAffordableAmount(calcedVal-cost, ++ppNr, accCost+cost);
  }
  get_next_PP_cost_and_amount_affordable() {
    return this.calcAffordableAmount(this.val);
  }
  upgrades = [
    { cost: 1, costIncMult: 2, unlocked: false, effectText: '+1🗡️', bought: 0, auto: false }, // +1 per bought
    { cost: 100, costIncMult: 5, unlocked: false, effectText: 'x2🗡️', bought: 0, auto: false }, // x2 per bought
  ]

  constructor() { this.init() }

  init() {
    this.initListeners();
    this.initMilestones();
    this.initUpgrades();
  }
  initUpgrades() {
    const upgradesContainer = document.getElementById('upgrades');
    this.upgrades.forEach((upgrade, index) => {
      const upgradeClone = newClone('_upgrade');
      if (!upgradeClone) return console.error('cloneHTMLElement missing');
      if (upgrade.unlocked) upgradeClone.classList.add('unlocked');
      upgradeClone.querySelector('.cost').textContent = numF(this.calcUpgradeCostForLevel(upgrade, 1));
      upgradeClone.querySelector('.effect').textContent = upgrade.effectText;
      upgradeClone.querySelector('.totalEff').textContent = upgrade.bought;
      upgradeClone.querySelector('.EffAfter').textContent = upgrade.bought+1;
      click(upgradeClone.querySelector('.btn'), () => this.onUpgradeClickIdx(index), this);
      click(upgradeClone.querySelector('input'), () => this.onUpgradeAutoIdx(index), this);
      if (this.val < upgrade.cost) upgradeClone.setAttribute('disabled','true');
      upgradesContainer.appendChild(upgradeClone);
      this.els.upgradeBtns.push(upgradeClone);
    });
  }

  howMuchDoesUpgradeLvlCost(upgrade, lvl = 1) {
    return (upgrade.costIncAdditive ?? 0) + (upgrade.cost * (upgrade.costIncMult ?? 1)**(lvl - 1));
  }
  // TODO: Continue here --- calc cost for any level
  calcUpgradeCostForLevel(upgrade, amount = 1) {
    if (amount <= 0) return 0;
    let total = 0;
    total+=this.howMuchDoesUpgradeLvlCost(upgrade, upgrade.bought+1);
    return total + this.calcUpgradeCostForLevel(upgrade, amount-1);
  }

  _upgradeAutoInterval = null;
  onUpgradeAutoIdx(idx) {
    const el = this.els.upgradeBtns[idx];
    const upgrade = this.upgrades[idx];
    el.checked = !el.checked;
    upgrade.auto = el.checked;
    const startLoop = this.upgrades.some(_upgrade => _upgrade.auto);
    if (this._upgradeAutoInterval) {
      clearInterval(this._upgradeAutoInterval);
      this._upgradeAutoInterval = null;
    }
    if (!startLoop) {
      // on stop loop
    } else {
      // on start / continue loop
      const intervalSpeed = 500;
      this._upgradeAutoInterval = setInterval(() => {
        this.upgrades.forEach((upg, index) => {
          if(!upg.auto) return;
          this.onUpgradeClickIdx(index);
        });
      }, intervalSpeed);
    }
  }

  onUpgradeClickIdx(idx) {
    const el = this.els.upgradeBtns[idx];
    const upgrade = this.upgrades[idx];
    const buyAmount = 1;
    const cost = this.calcUpgradeCostForLevel(upgrade, buyAmount);
    if (this.val < cost) return;
    this.val-=cost;
    upgrade.bought+=buyAmount;
    let text = { totalEff: '', effAfter: '' };
    switch(idx) {
      case 0: {
        text = {
          totalEff: '+' + numF(upgrade.bought),
          effAfter: '+' + numF(upgrade.bought+1)
        }
        break
      }
      case 1: {
        text = {
          totalEff: 'x' + numF(2**upgrade.bought),
          effAfter: 'x' + numF(2**(upgrade.bought+1))
        }
        break
      }
      default:
        break;
    }
    el.querySelector('.cost').textContent = numF(this.howMuchDoesUpgradeLvlCost(upgrade, upgrade.bought+1));
    el.querySelector('.totalEff').textContent = text.totalEff;
    el.querySelector('.EffAfter').textContent = text.effAfter;
    this.updateIncLabel();
  }
  initMilestones() {
    const milestonesContainer = document.getElementById('milestones');
    this.milestones.forEach(milestone => {
      const milestoneClone = newClone('_milestone');
      if (!milestoneClone) return console.error('cloneHTMLElement missing');
      if (!milestone.reached) milestoneClone.classList.add('denied_btn');
      milestoneClone.querySelector('.goal').textContent = numF(milestone.target);
      milestoneClone.querySelector('.effect').textContent = milestone.effectText;
      milestonesContainer.appendChild(milestoneClone);
    });
  }
  initListeners() {
    clickAll(this.els.incBtns, this.onStrInc, this);
  }
  calcIncBy() {
    const baseInc = 1;
    let additiveBonus = 0;
    let multiplicativeBonus = 1;
    if (this.milestones[0].reached) additiveBonus+=1;
    if (this.milestones[1].reached) multiplicativeBonus+=1;
    additiveBonus+=this.upgrades[0].bought;
    multiplicativeBonus=multiplicativeBonus * 2**this.upgrades[1].bought;
    return multiplicativeBonus * (baseInc + additiveBonus);
  }
  onStrInc() {
    this.val = this.val + this.calcIncBy();
  }
  onValChange() {
    if (!unlocks.milestones && this.val > 0) unlock('milestones');
    updateTextAll(this.els.ui_str_score, numF(this.val));
    this.checkValGoalReached();
  }
  updateIncLabel() {
    const incText = numF(this.calcIncBy());
    this.els.ui_incBy.forEach(el => el.textContent = incText);
  }
  checkIfMilestoneUnlockedSomething(milestoneIdx) {
    switch(milestoneIdx) {
      case 0:
      case 1: {
        this.updateIncLabel();
        break;
      }
      case 2: 
        unlock('upgrades');
        this.unlockUpgradeIdx(0)
        break;
      case 3:
        this.unlockUpgradeIdx(1)
        break;
      case 4: 
        unlock('auto_upgrades');
        break;
      case 5: 
        unlock('prestige');
        break;
      default: break;
    }
  }
  unlockUpgradeIdx(idx) {
    this.upgrades[idx].unlocked = true;
    this.els.upgradeBtns[idx].classList.add('unlocked');
  }
  checkValGoalReached() {
    this.milestones.forEach((milestone, index) => {
      if (milestone.reached) return;
      if (milestone.target <= this.val) {
        milestone.reached = true;
        const milestoneEl = document.getElementById('milestones').children[index];
        milestoneEl.classList.remove('denied_btn');
        this.checkIfMilestoneUnlockedSomething(index);
      }
    });
    // hidden val goals / checks
    this.prestigeCheck();
  }
  prestigeCheck() {
    const [amountAffordable, nextPPCost] = this.get_next_PP_cost_and_amount_affordable();
    amountAffordable > 0 ? q('#prestige').classList.remove('denied_btn') : q('#prestige').classList.add('denied_btn');
    q('.pp').textContent = '+'+numF(amountAffordable);
    q('.next_pp_at').textContent = numF(nextPPCost);
  }
}

const unlocks = {
  milestones: false,
  upgrades: false,
  auto_upgrades: false,
}
function unlock(id) {
  unlocks[id] = true;
  document.body.classList.add(id+'_unlocked');
}
function newGame() {
  const game = {
    attr: {
      str: new Str(),
    }
  };
}
newGame()


















/// HELPER ///

/** @param {string} selector @returns {HTMLElement | null} */
function q(selector) {
  return document.querySelector(selector);
}
/** @param {string} selector @returns {HTMLElement[] | []} */
function qAll(selector) {
  return [...document.querySelectorAll(selector)];
}

/** @param {HTMLElement} el @param {*} thisCtx @param {() => void} fn @returns {void} */
function click(el, fn, thisCtx) {
  return el.addEventListener('click', fn.bind(thisCtx));
}
/** @param {HTMLElement[]} els @param {*} thisCtx @param {() => void} fn @returns {void} */
function clickAll(els, fn, thisCtx) {
  els.forEach(el => click(el, fn, thisCtx));
}
/** @param {HTMLElement} els @param {string} text @returns {void} */
function updateText(el, text) {
  el.textContent = text;
}
/** @param {HTMLElement[]} els @param {string} text @returns {void} */
function updateTextAll(els, text) {
  els.forEach(el => updateText(el, text));
}
/** @param {number} num @returns {string} */
function numF(num) {
  return num.toLocaleString(undefined, { maximumSignificantDigits: 3, notation: 'compact', roundingMode: 'floor' });
}
/** @param {string} cloneId @returns {HTMLElement | null} */
function newClone(cloneId) {
  const clone = document.getElementById(cloneId).cloneNode(true);
  clone.removeAttribute('id');
  return clone;
}
