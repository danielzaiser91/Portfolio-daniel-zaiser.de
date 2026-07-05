import * as _Decimal from './external packages/break_eternity.mjs';

const Decimal = _Decimal.default;
const DECIMALTYPE = new Decimal(0);
const zero = new Decimal(0);
const one = new Decimal(1);
window.DECIMAL = Decimal;

// CONSTANTS
const THEME = ['theme-energy','theme-r1','theme-r2', 'theme-white','theme-brown'];
const TU_UPGRADE = {
  'QT-1': ['Quick Training', 'increases TU gain by 1 per 15 seconds', 1],
  'QT-2': ['Quicker Training', 'increases TU gain by another 1 per 15 seconds', 10],
  'QT-3': ['Quickest Training', 'Doubles TU gain', 100],
  'Ease-1': ['Easier Training', 'Halves Energy Drain of Training', 100],
  'Auto-Leg': ['Auto Leg Training', 'unlocks Automation for Leg Training', 5],
}
const INVESTABLE_ID = {
  'Legs': 'Legs',
  'Arm': 'Arm',
  'Neck': 'Neck',
  'Shoulder': 'Shoulder',
  'UpperAbdomen': 'UpperAbdomen',
  'LowerAbdomen': 'LowerAbdomen',
  'Facial': 'Facial',
  'Chewing': 'Chewing',
}
/** [name, description, cost, weight] */
const TU_INVESTABLE = {
  [INVESTABLE_ID.Legs]: ['', '', 1, 1],
  [INVESTABLE_ID.Arm]: ['', '', 1e5, 1e5],
  [INVESTABLE_ID.Neck]: ['', '', 1e8, 1e8],
  [INVESTABLE_ID.Shoulder]: ['', '', 1, 0],
  [INVESTABLE_ID.UpperAbdomen]: ['', '', 1, 0],
  [INVESTABLE_ID.LowerAbdomen]: ['', '', 1, 0],
  [INVESTABLE_ID.Facial]: ['', '', 1, 0],
  [INVESTABLE_ID.Chewing]: ['', '', 1, 0],
}

const ENUMS = {
  PERSON_ID: {
    VOICE: 1,
    GUILD_RECEPTIONIST: 'g0',
    TRAINING_INSTRUCTOR: 'g1',
  },
  DIALOGUE_ID: {
    DO_CONTINUE_STATE_ACTION: 'DO_CONTINUE_STATE_ACTION',
    CLOSE_DIALOGUE: 'CLOSE_DIALOGUE',
    SHOW_CONTINUE_PROMPT: 'CONTINUE_PROMPT',
    NOTHING: "[Leave]",
    CHAPTER_0: { // IDs FOR Popup.dialogue
      CHAPTER_INTRO: 1, // start
      INTRODUCE_CITY: 2, // click on city 1st time
      INTRODUCE_GUILD: 3, // click on guild 1st time
      // GUILD_RECEPTIONIST_JOIN: 4, // talk to receptionist 1st time
      INTRODUCE_TRAINING_GROUNDS: 5, // click on training_grounds 1st time
      // AFTER_FIRST_TU_GAINED: 6, // instructor will give tip how to train faster???
      // AFTER_ENERGY_ZERO_FIRST_TIME: 7, // when energy reaches 0 for the first time
    },
  },
  LAYER: {
    ADVENTURE: 1,
    TRAINING_GROUNDS: 2,
    RESEARCH: 3,
    SETTINGS: 4,
    STATS: 5,
  },
  TRAINING: {
    R1: 0,
    R2: 1,
  },
  SUB_LAYER: {
    MAP: 1,
    CITY: 2,
  },
  CITY_PART: {
    CITY_MAP: 0,
    GUILD: 1,
    BLACKSMITH: 2,
    MARKETPLACE: 3,
    TOWN_HALL: 4
  },
  REGION: {
    BARACUDA: 1,
    CONCORD: 2,
  },
  CITY: {
    VERMILLION: 1, // city in Baracuda
    STEPPEN: 2, // city in Concord
  },
  STORY: { // PLAYER READ DIALOGUE, DO NOT SHOW AGAIN --- set game.story_state
    CHAPTER_0: {
      NEXT_STEP__INTRO_CHAPTER: -1,
      NEXT_STEP__INTRO_CITY: 0,
      NEXT_STEP__INTRO_GUILD: 2,
      NEXT_STEP__INTRO_TRAINING_GROUNDS: 3,
      NEXT_STEP__XXX: 4,
    }
  },
}
const TRANSLATIONS_EN = {
  LAYER: {
    [ENUMS.LAYER.ADVENTURE]: 'Adventure',
    [ENUMS.LAYER.TRAINING_GROUNDS]: 'Training Grounds',
    [ENUMS.LAYER.RESEARCH]: 'Research',
    [ENUMS.LAYER.STATS]: 'Stats',
    [ENUMS.LAYER.SETTINGS]: 'Settings',
  },
  PERSON_NAME_AND_IMAGE: {
    [ENUMS.PERSON_ID.VOICE]: ['mysterious voice', 'person-orb'],
    [ENUMS.PERSON_ID.GUILD_RECEPTIONIST]: ['Receptionist Ellie', 'person-orb'],
    [ENUMS.PERSON_ID.TRAINING_INSTRUCTOR]: ['Instructor Raynard', 'person-orb'],
  },
  REGION: {
    [ENUMS.REGION.BARACUDA]: 'Baracuda',
    [ENUMS.REGION.CONCORD]: 'Concord',
  },
  CITY: {
    [ENUMS.CITY.VERMILLION]: 'Vermillion',
    [ENUMS.CITY.STEPPEN]: 'Steppen',
  },
  RESSOURCE: {
    [ENUMS.TRAINING.R1]: 'Strength',
    [ENUMS.TRAINING.R2]: 'Intelligence',
  },
  CITY_PART: {
    [ENUMS.CITY_PART.CITY_MAP]: 'City Map',
    [ENUMS.CITY_PART.GUILD]: 'Guild',
    [ENUMS.CITY_PART.BLACKSMITH]: 'Blacksmith',
    [ENUMS.CITY_PART.MARKETPLACE]: 'Marketplace',
    [ENUMS.CITY_PART.TOWN_HALL]: '???',
  },
  INVESTABLE: {
    [INVESTABLE_ID.Legs]: 'Leg',
    [INVESTABLE_ID.Arm]: 'Arm',
    [INVESTABLE_ID.Neck]: 'Neck',
    [INVESTABLE_ID.Shoulder]: 'Shoulder',
    [INVESTABLE_ID.UpperAbdomen]: 'Upper Abdomen',
    [INVESTABLE_ID.LowerAbdomen]: 'Lower Abdomen',
    [INVESTABLE_ID.Facial]: 'Facial',
    [INVESTABLE_ID.Chewing]: 'Chewing',
  }
}
/**
 * Represents an object with a property and a set method.
 * @typedef {object} DataObject
 * @property {Game} game - game
 * @property {World} world - infos about the game world
 * @property {Player} player - player
 * @property {Ui} ui
 * @property {Settings} settings
 * @returns {void}
 */

const DEVELOP_SAVEGAME = {
  // game: {
  //   story_state: ENUMS.STORY.CHAPTER_0.INSTRUCTOR,
  //   body_vars: {
  //     unlockedR1: 1,
  //     unlockedR11: 1,
  //     leftSidebar: 1
  //   }
  // },
  // player: {
  //   energy: {
  //     current: 15,
  //   },
  //   r1: {
  //     training: {
  //       units: 0
  //     },
  //     tu_invest: [[INVESTABLE_ID.Legs, 0]]
  //   },
  //   training_info: {
  //     max_parallel_trainings: 1,
  //     training_active: [0]
  //   }
  // },
  // world: {
  //   currentLayer: [
  //     ENUMS.LAYER.ADVENTURE,
  //     ENUMS.SUB_LAYER.MAP,
  //     ENUMS.CITY_PART.CITY_MAP
  //   ]
  // }
};
const HTMLDivElement = document.createElement('div');
const HTMLButtonElement = document.createElement('button');
const HTMLParagraphElement = document.createElement('p');
const HTMLHeadingElement = document.createElement('h1');

// HELPER
/** src https://jsfiddle.net/Stelios2020/ukmf5304/6/ */
function download(content, mimeType, filename){
  const a = document.createElement('a');
  const blob = new Blob([content], {type: mimeType});
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}
async function animate(el, ms, [style, to]) {
  el.style.transition = style +' '+ ms+'ms';
  el.style[style] = to;
  return new Promise(resolve => { setTimeout(() => resolve(), ms)});
}
/**
 * 
 * @param {Array<HTMLElement>} elements html elements to update
 * @param {string} value value to assign to el.attribute
 * @param {string} attribute attribute chain on the element, nested attributes connected with "."
 */
function updateElements(elements, value, attribute) {
  if (value === undefined) return;

  elements.forEach(el => {
    const nestedKeys = attribute.split('.');
    const lastKey = nestedKeys.slice(-1)[0];
    let accessAttr = undefined;
    if (nestedKeys.length > 1) {
      nestedKeys.slice(0,-1).forEach(nestedKey => {
        accessAttr = !accessAttr ? el[nestedKey] : accessAttr[nestedKey];
      });
    }
    accessAttr ??= el;
    if (accessAttr[lastKey] !== value) {
      accessAttr[lastKey] = value;
    }
  });
}
function clickListener(el, fn, thisCtx) {
  el.addEventListener('click', ev => {
    ev.stopPropagation();
    ev.preventDefault();
    fn.call(thisCtx ?? window,ev)}
  );
}

function getSavegame() {
  const savegame = Settings.getLocalSave();
  return savegame || {};
  // return DEVELOP_SAVEGAME;
}

function id(s) { return document.getElementById(s) }
function q(s) { return document.querySelector(s) }
function all(s) { return Array.from(document.querySelectorAll(s)); }
function getDifferences(obj1 = {}, obj2 = {}) {
  const diff = {};
  let equal = true;
  for (const key in obj2) {
    if (Array.isArray(obj2[key])) {
      if (!Array.isArray(obj1[key]) || JSON.stringify(obj1[key].sort()) !== JSON.stringify(obj2[key].sort())) {
        diff[key] = obj2[key];
        equal = false;
      }
    } else if (typeof obj2[key] === 'object') {
      const nestedDiff = getDifferences(obj1[key], obj2[key]);
      if (nestedDiff) {
        diff[key] = nestedDiff;
        equal = false;
      }
    } else if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
      equal = false;
    }
  }
  return !Object.keys(diff).length ? null : diff;
}
/** @this {typeof DECIMALTYPE} */
DECIMALTYPE.constructor.prototype.p = function (precision = 2) {
  if (this.lt('0.'.padEnd(precision+1,'0')+'1') && this.gte(0)) return '0';
  return this.toString().replace(new RegExp(`(?<=\\.\\d{${precision}})\\d+`),'');
}

// disable right click
document.addEventListener("contextmenu", ev => ev.preventDefault());


class World {
  _currentRegionAndCity = [];
  get currentRegionAndCity() {
    return this._currentRegionAndCity;
  }
  set currentRegionAndCity(val) {
    let [newRegion, newCity] = val ?? [];
    const [currRegion, currCity] = this._currentRegionAndCity;
    newRegion = newRegion ?? currRegion ?? ENUMS.REGION.BARACUDA;
    newCity = newCity ?? currCity ?? ENUMS.CITY.VERMILLION;
    if (currRegion !== newRegion) {
      // region change html
      const regionText = TRANSLATIONS_EN.REGION[newRegion];
      all('[current_region_name]').forEach(el => el.textContent = regionText);
    }
    if (currCity !== newCity) {
      // city change html
      const cityText = TRANSLATIONS_EN.CITY[newCity];
      all('[current_city_name]').forEach(el => el.textContent = cityText);
    }
    this._currentRegionAndCity = [newRegion, newCity];
  }
  _currentLayer = [];
  set currentLayer(val) {
    let [newLayer, newSubLayer, newCitypart] = val ?? [];
    const [currLayer, currSubLayer, currCitypart] = this._currentLayer;
    newLayer = newLayer ?? currLayer ?? ENUMS.LAYER.ADVENTURE;
    newSubLayer = newSubLayer ?? currSubLayer ?? ENUMS.SUB_LAYER.CITY;
    newCitypart = newCitypart ?? currCitypart ?? ENUMS.CITY_PART.CITY_MAP;
    if (newLayer !== currLayer) {
      // change html layer attr
      DATA.ui.Elements.layerEl.dataset.showLayer = String(newLayer);
    }
    if (newSubLayer !== currSubLayer) {
      // change html subLayer attr
      DATA.ui.Elements.layerEl.dataset.showSubLayer = String(newSubLayer);
    }
    if (newCitypart !== currCitypart) {
      // change html cityPart attr
      DATA.ui.Elements.layerEl.dataset.currentCityPart = String(newCitypart);
      const cityPartText = TRANSLATIONS_EN.CITY_PART[newCitypart];
      all('[current_city_part]').forEach(el => el.textContent = cityPartText);
    }

    this._currentLayer = [newLayer, newSubLayer, newCitypart];
  }
  get currentLayer() {
    return this._currentLayer;
  }

  constructor(worldSave = {}) {
    this.loadSave(worldSave);
  }

  getSaveData() {
    return {
      currentLayer: this.currentLayer,
      currentRegionAndCity: this.currentRegionAndCity
    }
  }

  loadSave(worldSave) {
    this.currentLayer = worldSave.currentLayer;
    this.currentRegionAndCity = worldSave.currentRegionAndCity;
  }
}

class Encryption {
  static encoder = new TextEncoder();
  static decoder = new TextDecoder();

  static decrypt_encrypted_string_to_object(jsonString) {
    const obj = JSON.parse(jsonString);
    const encryptedUint8Array = new Uint8Array(Object.values(obj));
    return JSON.parse(Encryption.decoder.decode(encryptedUint8Array));
  }
  /** @returns {string} */
  static encrypt_object_to_string(object) {
    const encryptedUint8Array = Encryption.encoder.encode(JSON.stringify(object))
    return JSON.stringify(encryptedUint8Array);
  }
}

class Settings {
  saveInterval = 30; // in seconds
  constructor(savegameSettings = {}) {
    this.loadFromSavegame(savegameSettings);
    this.initUiListeners();
  }

  getSaveData() {
    return {
      saveInterval: this.saveInterval
    };
  }

  loadFromSavegame(savegameSettings = {}) {
    this.saveInterval = savegameSettings.saveInterval ?? this.saveInterval;
  }
  
  initUiListeners() {
    q('[data-save-local]').addEventListener('click', Settings.saveLocal, this);
    clickListener(q('[data-download-savefile]'), Settings.downloadSavefile, this);
    clickListener(q('[data-reset-savefile]'), Settings.resetSavefile, this);
    q('[data-load-savefile]').addEventListener('change', Settings.askUserToSelectASavefile.bind(this));
  }

  static askUserToSelectASavefile(event) {
    const file = event.target.files[0];
    event.target.value = null;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      Settings.loadFromSavefile(e.target.result);
    };
    reader.readAsText(file);
  }

  static get_current_gameData_as_encrypted_string() {
    const data = {
      world: DATA.world.getSaveData(),
      game: DATA.game.getSaveData(),
      ui: DATA.ui.getSaveData(),
      player: DATA.player.getSaveData(),
      settings: DATA.settings.getSaveData()
    }
    return Encryption.encrypt_object_to_string(data);
  }

  static loadFromSavefile(saveFileAsEncryptedString) {
    try {
      const savefile = Encryption.decrypt_encrypted_string_to_object(saveFileAsEncryptedString);
      DATA.world.loadSave(savefile.world);
      DATA.game.loadFromSavegame(savefile.game);
      DATA.ui.loadFromSavegame(savefile.ui);
      DATA.player.loadFromSavegame(savefile.player);
      DATA.settings.loadFromSavegame(savefile.settings);
    } catch (e) {
      console.error('Error while loading savefile:', e);
    }
  }

  static downloadSavefile() {
    const filename = 'incremental-adventure-__' + new Date().toLocaleString() + '.saveFile';
    download(Settings.get_current_gameData_as_encrypted_string(), 'text/plain', filename);
  }
  static resetSavefile() {
    if (!confirm('Are you sure you want to reset your savefile?')) return;
    localStorage.removeItem('incremental-adventure-save');
    DATA.world = new World();
    DATA.game = new Game();
    DATA.ui = new Ui();
    DATA.player = new Player();
    DATA.settings = new Settings();
    console.log('savefile reset');
  }

  /** TODO: maybe change to indexeddb */
  static saveLocal() { localStorage.setItem('incremental-adventure-save', Settings.get_current_gameData_as_encrypted_string()); console.log('game saved in localStorage'); }
  static getLocalSave() {
    const save = localStorage.getItem('incremental-adventure-save');
    if (!save) return null;
    return Encryption.decrypt_encrypted_string_to_object(save);
  }
}

/**
 * An instance of ObjectName.
 * @type {DataObject}
 */
const DATA = {
  world: undefined,
  game: undefined,
  ui: undefined,
  player: undefined,
  settings: undefined
};

class Game {
  __game_loop_id = 0;
  /** ENUMS.STORY */
  story_state = ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_CHAPTER;
  body_vars = Game.defaultBodyVars;
  _previousViewValues = {};
  _gameLoopCounter = 0;
  _tickspeed = 20;

  static defaultBodyVars = {
    unlockedR1: 0,
    unlockedR11: 0,
    unlockedR11Milestones: 0,
    unlockedR12: 0,
    unlockedR13: 0,
    unlockedR14: 0,
    unlockedR15: 0,
    unlockedR16: 0,
    unlockedR17: 0,
    unlockedR18: 0,
    unlockedR2: 0,
    unlockedAdventureTab: 0,
    unlockedTrainingTab: 0,
    unlockedF2: 0,
    unlockedEnergyTGTab:0,
    unlockedCity1: 1,
    unlockedCity2: 0,
    tutorialStep: 0,
    leftSidebar: 0,
    rightSidebar: 0
  }

  constructor(savegame = {}) {
    this.loadFromSavegame(savegame);
  }

  getSaveData() {
    return {
      story_state: this.story_state,
      body_vars: this.body_vars
    }
  }
  
  loadFromSavegame(savegame = {}) {
    this.story_state = savegame.story_state ?? ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_CHAPTER;
    if (typeof savegame.body_vars === 'object') this.body_vars = { ...Game.defaultBodyVars, ...savegame.body_vars };

    this.init();
  }
  
  init() {
    this.onChangeBodyVars();
    this.check_should_show_intro();
    this.init_game_loop();
  }

  changeBodyVar(bodyVar, val) {
    this.body_vars[bodyVar] = val;
    DATA.ui.onChange_bodyVars(this.body_vars);
  }

  onChangeBodyVars() {
    DATA.ui.onChange_bodyVars(this.body_vars);
  }

  check_should_show_intro() {
    if (this.story_state === ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_CHAPTER) {
      DATA.ui.popup.openDialogue(ENUMS.DIALOGUE_ID.CHAPTER_0.CHAPTER_INTRO);
    }
  }

  init_game_loop() {
    if (this.__game_loop_id) clearInterval(this.__game_loop_id);
    this._gameLoopCounter = 0;
    this.__game_loop_id = setInterval(this.gameLoop.bind(this), this._tickspeed);
  }

  /**
   * @example msTick(1000) // returns true every second
   *  @returns {boolean} true, when gametime has passed x milliseconds
   * */
  msTick(x) { return this._gameLoopCounter % Math.ceil(x/this._tickspeed) === 0; }
  gameLoop() {
    this._gameLoopCounter++;
    this.calcOnEveryTick();
    if (this.msTick(DATA.settings.saveInterval*1000)) Settings.saveLocal();



    // if (this.msTick(100)) { console.log(_gameLoopCounter/5,' 100ms have passed...'); } 
    // if (this.msTick(1000)) console.log(_gameLoopCounter/50,' seconds have passed...');
    // if (this.msTick(10000)) console.log('another 10 seconds have passed...');
  }
  calcOnEveryTick() {
    DATA.player.calculate(100);
    const curr = DATA.player.getCurrentViewValues();
    const diffObject = getDifferences(this._previousViewValues, curr);
    if (diffObject) {
      DATA.ui.updatePlayerValuesInView(diffObject);
      this._previousViewValues = curr;
    }
  }
}

class Player {
  /** @type {Choices} */
  choices;
  status = {
    training_info: {
      max_parallel_trainings: 1,
      training_active: [0] // [r1,r2,r3,r4] -- training buttons, replace with 0/1
    }
  }

  constructor(savegame = {}) {
    this.loadFromSavegame(savegame);
    this.init();
  }

  getSaveData() {
    return {
      choices: this.choices.getSaveData(),
      energy: this.energy.getSaveData(),
      r1: this.r1.getSaveData(),
      training_info: this.status.training_info
    };
  }

  loadFromSavegame(savegame) {
    this.choices = new Choices(savegame.choices);
    this.energy = new Energy(savegame.energy);
    this.r1 = new R1(savegame.r1);
    this.setTrainingStatus(savegame.training_info);
  }

  init() {
    // local init
  }

  setTrainingStatus(training_info = {}) {
    if (typeof training_info !== 'object') return;
    this.status.training_info = {
      ...this.status.training_info,
      ...training_info
    };
    this.updateTrainingButtonLabels();
  }

  updateTrainingButtonLabels() {
    this.status.training_info.training_active.forEach((nr, index) => {
      this.updateTrainingButtonLabel(index);
    });
  }

  updateTrainingButtonLabel(index) {
    const disable = false; // maybe add a disabled state in the future
    const isActive = !!this.status.training_info.training_active[index];
    let state = isActive ? 'start':'stop';
    const stateLabel = !isActive ? 'begin ':'stop ';
    if (disable) state = 'disable';
    const label = stateLabel + TRANSLATIONS_EN.RESSOURCE[index] + ' training';
    DATA.ui.changeTrainingStatusButton(index, state, label);
  }

  isAllowedToToggleTraining(index) {
    const info = this.status.training_info;
    const isActive = info.training_active[index];
    if (!isActive) {
      const total_active = Object.values(info.training_active).filter(value => !!value).length;
      const isAllowed = info.max_parallel_trainings > total_active;
      if (!isAllowed) {
        // inform user somehow that the action is not allowed // floating bubble notifications... or tooltip?
        console.log('you can\'t train more than '+info.max_parallel_trainings+' trainings at once');
        return false;
      }
    }
    return true;
  }

  toggleTraining(index) {
    if (!this.isAllowedToToggleTraining(index)) return;
    const training_active = this.status.training_info.training_active;
    training_active[index] = training_active[index] ? 0 : 1;
    this.updateTrainingButtonLabel(index);
  }

  calculate(milliseconds) {
    // change data based on time passed
    this.energy.calculate(milliseconds);
    this.r1.calculate(milliseconds);
  }

  getCurrentViewValues() {
    /**
     * TODO: add tu per sec, tu-bar
     */
    const tu_perSec = !this.r1.isTrainingActive() ? zero : this.r1.getTUperSec();
    const r1costPerSec = !this.r1.isTrainingActive() ? zero : this.r1.getTrainingCostPerSec();
    const energyPerSec = this.energy.getEnergyPerSec().minus(r1costPerSec);
    return {
      r1: {
        nextUnlockable: this.r1.nextUnlockable(),
        total: this.r1.getTotal().p(),
        tu: this.r1.training.units.p(),
        tu_perSec: tu_perSec.p(),
        tu_bar: this.r1.training.bar_progress.times(100).p(),
        purchaseable: Object.values(this.r1.tu_invest).filter(invest => invest.isPurchaseable).map(invest => invest.id),
        [INVESTABLE_ID.Legs]: this.r1.tu_invest[INVESTABLE_ID.Legs].bought.p(),
        [INVESTABLE_ID.Arm]: this.r1.tu_invest[INVESTABLE_ID.Arm].bought.p(),
        [INVESTABLE_ID.Neck]: this.r1.tu_invest[INVESTABLE_ID.Neck].bought.p(),
        [INVESTABLE_ID.Shoulder]: this.r1.tu_invest[INVESTABLE_ID.Shoulder].bought.p(),
        [INVESTABLE_ID.UpperAbdomen]: this.r1.tu_invest[INVESTABLE_ID.UpperAbdomen].bought.p(),
        [INVESTABLE_ID.LowerAbdomen]: this.r1.tu_invest[INVESTABLE_ID.LowerAbdomen].bought.p(),
        [INVESTABLE_ID.Facial]: this.r1.tu_invest[INVESTABLE_ID.Facial].bought.p(),
        [INVESTABLE_ID.Chewing]: this.r1.tu_invest[INVESTABLE_ID.Chewing].bought.p(),
        investable_cost: {
          [INVESTABLE_ID.Legs]: this.r1.tu_invest[INVESTABLE_ID.Legs].cost.p(),
          [INVESTABLE_ID.Arm]: this.r1.tu_invest[INVESTABLE_ID.Arm].cost.p(),
          [INVESTABLE_ID.Neck]: this.r1.tu_invest[INVESTABLE_ID.Neck].cost.p(),
          [INVESTABLE_ID.Shoulder]: this.r1.tu_invest[INVESTABLE_ID.Shoulder].cost.p(),
          [INVESTABLE_ID.UpperAbdomen]: this.r1.tu_invest[INVESTABLE_ID.UpperAbdomen].cost.p(),
          [INVESTABLE_ID.LowerAbdomen]: this.r1.tu_invest[INVESTABLE_ID.LowerAbdomen].cost.p(),
          [INVESTABLE_ID.Facial]: this.r1.tu_invest[INVESTABLE_ID.Facial].cost.p(),
          [INVESTABLE_ID.Chewing]: this.r1.tu_invest[INVESTABLE_ID.Chewing].cost.p(),
        },
        milestoneInfo: Object.fromEntries(Object.values(this.r1.tu_invest).map(i => 
          [i.id, i.getMilestoneInfoForUi]
        )),
      },
      energy: {
        max: this.energy.max.p(),
        current: this.energy.current.p(),
        perSec: energyPerSec.p(),
        bar: this.energy.current.div(this.energy.max).times(100).p()
      }
    };
  }
}

class R1 {
  static DEFAULTS = {
    BASE: 1,
    TRAINING: {
      UNITS: 0,
      UNITS_PER_SEC: 10/100,
      COST_PER_SEC: 15/100
    }
  }

  /**
   * Upgrades for Training Units, which can be bought with R1 Upgrade Points
   */
  tu_upgrades = Object.fromEntries(Object.entries(TU_UPGRADE).map(([id, [name, description, cost, effect]]) => [id,new TUUpgrade(id, name, description, cost, effect)]));
  tu_invest = Object.fromEntries(Object.entries(TU_INVESTABLE).map(([id, [name, description, cost, weight]]) => [id,new TUInvest(id, name, description, cost, weight)]));

  base = DECIMALTYPE;
  training = {
    units: DECIMALTYPE,
    bar_progress: DECIMALTYPE,
    units_per_sec: DECIMALTYPE,
    cost_per_sec: DECIMALTYPE,
  };

  unlockableIndex = -1;
  unlockables = [
    { uiText: 'Reach 100 Leg Muscle Mass' },
  ]

  constructor(savegameR1 = {}) {
    this.loadFromSavegame(savegameR1);
    this.init();
  }

  /** @returns {DECIMALTYPE} */
  getTotal() {
    let total = new Decimal(0);
    Object.values(this.tu_invest).forEach(invest => {
      total = total.plus(invest.bought.times(invest.weight));
    });
    return this.base.plus(total);
  }

  nextUnlockable() {
    return this.unlockables[this.unlockableIndex+1]?.uiText ?? 'successfully unlocked all unlockables';
  }

  getSaveData() {
    return {
      training: {
        units: this.training.units.toString(),
      },
      unlockableIndex: this.unlockableIndex,
      tu_upgrades: Object.values(this.tu_upgrades).filter(upg => upg.isUnlocked).map(upg => upg.id),
      tu_invest: Object.values(this.tu_invest).map((invest) => [invest.id, invest.bought.p()]),
    }
  }

  /** @param {{tu_upgrades?: string[], tu_invest?:[string, number][]}} savegameR1 */
  loadFromSavegame(savegameR1 = {}) {
    this.unlockableIndex = savegameR1.unlockableIndex ?? -1;
    this.training.units = new Decimal(savegameR1.training?.units ?? R1.DEFAULTS.TRAINING.UNITS);
    this.training.bar_progress = new Decimal(savegameR1.training?.bar_progress ?? 0);
    // purchaseable upgrades
    Object.values(this.tu_invest).forEach(invest => {
      invest.isPurchaseable = this.training.units.gte(invest.cost)
    });
    if (savegameR1.tu_upgrades) {
      savegameR1.tu_upgrades.forEach((upgradeId) => {
        this.tu_upgrades[upgradeId].isUnlocked = true;
      });
    }
    if (savegameR1.tu_invest) {
      savegameR1.tu_invest.forEach(([upgradeId, bought]) => {
        const invest = this.tu_invest[upgradeId];
        invest.bought = new Decimal(bought);
      });
    }
  }

  init() {
    /** calculated, not saved to savegame */
    this.training.units_per_sec = new Decimal(R1.DEFAULTS.TRAINING.UNITS_PER_SEC);
    this.training.cost_per_sec = new Decimal(R1.DEFAULTS.TRAINING.COST_PER_SEC);
    this.base = new Decimal(R1.DEFAULTS.BASE);
  }

  getTrainingCostPerSec() {
    let cost = this.training.cost_per_sec;
    if (this.tu_upgrades['Ease-1'].isUnlocked) cost = cost.div(2);
    return cost;
  }

  minEffectiveness = new Decimal(0.01);
  trainingUnitStrain(tu, start = 10, upperLimit = 100, minEffectiveness = this.minEffectiveness, decayRate = 90) {
    return tu.lte(start) ? one :
           tu.lt(upperLimit) ? one.minus(tu.minus(start).div(decayRate).pow(2)) :
           minEffectiveness;
  }

  getTUperSec() {
    let tu_per_sec = this.training.units_per_sec;
    if (this.tu_upgrades['QT-1'].isUnlocked) tu_per_sec = tu_per_sec.plus(1/15);
    if (this.tu_upgrades['QT-2'].isUnlocked) tu_per_sec = tu_per_sec.plus(1/15);
    if (this.tu_upgrades['QT-3'].isUnlocked) tu_per_sec = tu_per_sec.times(2);

    // tu amount causes further tu gain to take more time = strain
    tu_per_sec = this.training.units_per_sec.times(this.trainingUnitStrain(this.training.units));

    return tu_per_sec;
  }

  calculate(milliseconds) {
    this.calculateTrainingEffectFor(milliseconds);
  }

  calculateTrainingEffectFor(milliseconds) {
    const isTrainingActive = this.isTrainingActive();
    if (!isTrainingActive) return;

    const energyCost = this.getTrainingCostPerSec().times(milliseconds/1000);
    const energy = DATA.player.energy;
    if (energy.current.gte(energyCost)) {
      // calc current energy - based on training cost
      energy.current = energy.current.minus(energyCost);

      // calc training units and bar progress
      this.training.bar_progress = this.training.bar_progress.plus(this.getTUperSec().times(milliseconds/1000));
      if (this.training.bar_progress.gte(1)) {
        const wholeNumberPart = this.training.bar_progress.floor();
        this.training.units = this.training.units.plus(wholeNumberPart);
        this.training.bar_progress = this.training.bar_progress.minus(wholeNumberPart);

        this.calculateEffectOfUnitGain();
      }
    } else {
      // not enough energy, stop training
      DATA.player.toggleTraining(ENUMS.TRAINING.R1);
      DATA.ui.popup.notify(`⚡ out of energy ⚡

Trainings stopped`, 'theme-energy')
    }
  }

  calculateEffectOfUnitGain() {
    // calc if tu-invest buttons have become purchaseable after tu change
    this.tu_invest.Legs.isPurchaseable = this.training.units.gte(this.tu_invest.Legs.cost);
  }

  isTrainingActive() {
    return DATA.player.status.training_info.training_active[ENUMS.TRAINING.R1];
  }
}

class Upgrade {
  isUnlocked = false;
  name = '';
  description = '';
  baseCost = 0;
  /** immer wenn bought geändert wird, brauch ich den milestone check, daher getter/setter */
  _bought;
  get bought() { return this._bought ?? new Decimal(0) }
  set bought(val) {
    this._bought = val;
    this.newMilestoneReachedCheck();
  }

  constructor(id, name, description, baseCost, costIncrease = [{ at: 10, by: 1.5 }, { at: 100, by: 10 }]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.baseCost = baseCost;
    this.costIncrease = costIncrease; // [{ at: 10, by: 1.5 }, ...] - when to increase cost and by how much
  }

  get cost() {
    let cost = new Decimal(this.baseCost);
    this.costIncrease.forEach(({ at, by }) => {
      if (this.bought.gte(at)) cost = cost.times(by);
    });
    return cost;
  }
}
class TUInvest extends Upgrade {
  isPurchaseable = false;
  milestonesUnlocked = false; // TODO: At some point need to unlock milestones connect to r1
  baseWeight = DECIMALTYPE;
  get weight() {
    return this.baseWeight.times(this.currentMilestoneMulti);
  };

  /** @type {{ requirement: string, effect: string, reached: boolean }[]} */
  get getMilestoneInfoForUi() {
    const uiInfo = [];
    this.milestones.forEach(([requirement, effect], index) => {
      uiInfo.push({
        requirement: 'Reach a Leg Muscle Mass of ' + new Decimal(requirement).p(),
        effect: 'increases the multiplier to x' + effect,
        reached: index <= this.currentMilestoneIndex
      });
    });
    return uiInfo
  }

  /** [unlocked at, effective multiplier] */
  milestones = [[1,1], [10,2], [10**2,3], [10**4,4], [10**8,5], [10**16,6], [10**32,7], [10**64,8]];
  currentMilestoneMulti = 1; // could be linear increase or multiplied, thats why its seperated from index
  currentMilestoneIndex = 0;

  constructor(id, name, description, cost, baseWeight) {
    super(id, name, description, cost);
    this.baseWeight = new Decimal(baseWeight);
  }

  purchase() {
    if (DATA.player.r1.training.units.lt(this.cost)) return;

    DATA.player.r1.training.units = DATA.player.r1.training.units.minus(this.cost);
    this.isPurchaseable = DATA.player.r1.training.units.gte(this.cost);
    this.bought = this.bought.plus(1);
    DATA.game.changeBodyVar('rightSidebar', 1);

    this.checkEffectOfPurchase();
  }

  checkEffectOfPurchase() {
    this.checkIfSomethingUnlocked();
  }

  checkIfSomethingUnlocked() {
    switch(this.id) {
      case INVESTABLE_ID.Legs: return this.checkLegUnlock();
    }
  }

  checkLegUnlock()  {
    if (DATA.player.r1.unlockableIndex !== -1) return;
    const conditionFulfilled = this.bought.gte(100);
    if (!conditionFulfilled) return;
    DATA.player.r1.unlockableIndex++;
    DATA.game.changeBodyVar('unlockedR12', 1);
    DATA.ui.popup.achievementNotify(0);
  }

  newMilestoneReachedCheck() {
    if (!this.milestonesUnlocked) return;
    let index = 0;
    this.milestones.forEach(([ms],i) => {
      if (this.bought.gte(ms)) index = i;
      else return;
    });
    this.currentMilestoneMulti = this.milestones[index][1];
    this.currentMilestoneIndex = index;
  }
}

class TUUpgrade extends Upgrade {
  isUnlocked = false;

  constructor(id, name, description, cost) {
    super(id, name, description, cost);
  }
}

class Energy {
  static DEFAULT_MAX = 15;
  static DEFAULT_REGEN = 5/100; // per sec

  /** @type {typeof DECIMALTYPE} */
  max; regen_per_second; current;

  constructor(savegameEnergy = {}) {
    this.loadFromSavegame(savegameEnergy);
    this.init();
  }

  getSaveData() {
    return {
      max: this.max.toString(),
      regen_per_second: this.regen_per_second.toString(),
      current: this.current.toString()
    }
  }

  getEnergyPerSec() {
    // future: apply boosts or something
    return this.regen_per_second;
  }

  loadFromSavegame(savegameEnergy) {
    this.current = new Decimal(savegameEnergy.current ?? Energy.DEFAULT_MAX);
  }

  init() {
    // vars that are static, and will not be saved in savegame
    this.max = new Decimal(Energy.DEFAULT_MAX);
    this.regen_per_second = new Decimal(Energy.DEFAULT_REGEN);
  }

  calculate(milliseconds) {
    this.current = this.current.plus(this.getEnergyPerSec().times(milliseconds/1000));
    if (this.current.gte(this.max)) this.current = this.max;
  }
}

class Choices {
  motivation = -1;
  constructor(choicesSavegame = {}) {
    this.loadFromSavegame(choicesSavegame);
    this.init();
  }

  getSaveData() {
    return { motivation: this.motivation };
  }

  loadFromSavegame(choicesSavegame) {
    if (Number.isInteger(choicesSavegame.motivation)) this.motivation = choicesSavegame.motivation;
  }

  init() {
    // console.log('Choices initialized'); 
  }
}

class Ui {
  popup = new Popup();
  Elements = {
    layerEl: HTMLDivElement,
    city: {
      guild: {
        talk_to_Receptionist: HTMLButtonElement,
        talk_to_Instructor: HTMLButtonElement,
        attempt_adventurer_exam: HTMLButtonElement
      }
    },
    r1: {
      nextUnlockableEl: HTMLDivElement,
      base: [HTMLDivElement],
      tu: [HTMLDivElement],
      tu_perSec: [HTMLDivElement],
      tu_bar: [HTMLDivElement],
      investables: {
        [INVESTABLE_ID.Legs]: {
          purchase_btn: HTMLDivElement,
          purchase_btn__label: HTMLDivElement,
          purchase_btn__cost: HTMLDivElement,
          /**[ms, req, effect] */
          milestones: [HTMLDivElement, HTMLDivElement,HTMLDivElement],
        }
      },
      investablesBought: {}
    },
    energy: {
      max: [HTMLDivElement],
      current: [HTMLDivElement],
      perSec: [HTMLDivElement],
      bar: [HTMLDivElement]
    },
    trainingButtons: {
      [ENUMS.TRAINING.R1]: HTMLDivElement,
      [ENUMS.TRAINING.R2]: HTMLDivElement,
    },
  }

  constructor(savegameUi = {}) {
    this.loadFromSavegame(savegameUi);
    this.initLocalVars();
    this.initUiListeners();
  }

  loadFromSavegame(savegameUi = {}) {
    this.popup.loadFromSavegame(savegameUi.popup);
  }

  getSaveData() {
    return {
      popup: this.popup.getSaveData(),
    };
  }

  initLocalVars() {
    this.Elements.layerEl = id('layer');
    this.Elements.trainingButtons[ENUMS.TRAINING.R1] = id('begin_training_r1');
    this.Elements.trainingButtons[ENUMS.TRAINING.R2] = id('begin_training_r2');
    this.Elements.r1.total = all('[data-strength-total]');
    this.Elements.r1.tu = all('[data-r1-tu]');
    this.Elements.r1.tu_bar = all('[data-r1-tu-bar]');
    this.Elements.r1.tu_perSec = all('[data-r1-tu-per-sec]');
    this.Elements.r1.nextUnlockableEl = q('[data-next-r1-tui]');
    all('[data-r1-investable]').forEach(el => {
      const id = el.dataset.r1Investable;
      const purchase_btn = q('[data-r1-investable='+id+'] [data-purchase]');
      const milestones = [];
      const requirements = all('[data-r1-investable='+id+'] [data-milestone-requirement]');
      const effects = all('[data-r1-investable='+id+'] [data-milestone-effect]');
      const milestoneEls = all('[data-r1-investable='+id+'] [data-milestone]');
      milestoneEls.forEach((ms,index) => {
        milestones.push([ms,requirements[index],effects[index]]);
      });
      this.Elements.r1.investables[id] = {
        purchase_btn: purchase_btn,
        purchase_btn__label: q('[data-r1-investable='+id+'] [data-label]'),
        purchase_btn__cost: q('[data-r1-investable='+id+'] [data-cost]'),
        milestones
      };
      clickListener(purchase_btn, () => DATA.player.r1.tu_invest[id].purchase(), this);
    });
    all('[data-r1-investable-bought]').forEach(el => {
      const id = el.dataset.r1InvestableBought;
      if (this.Elements.r1.investablesBought[id]) {
        this.Elements.r1.investablesBought[id].push(el);
      } else {
        this.Elements.r1.investablesBought[id] = [el];
      }
    });
    this.Elements.energy.max = all('[data-energy-max]');
    this.Elements.energy.current = all('[data-energy-current]');
    this.Elements.energy.perSec = all('[data-energy-per-sec]');
    this.Elements.energy.bar = all('[data-energy-bar]');

    // city -- guild -- actions
    const guildEls = this.Elements.city.guild;
    [guildEls.talk_to_Receptionist, guildEls.talk_to_Instructor ,guildEls.attempt_adventurer_exam] = all('#city_121_guild .actions button');
  }

  updatePlayerValuesInView(valueDiff) {
    Object.entries(valueDiff).forEach(([key, value]) => {
      switch(key) {
        case 'r1': {
          updateElements([this.Elements.r1.nextUnlockableEl], value.nextUnlockable, 'textContent');
          updateElements(this.Elements.r1.total, value.total, 'textContent');
          updateElements(this.Elements.r1.tu, value.tu, 'textContent');
          updateElements(this.Elements.r1.tu_perSec, value.tu_perSec, 'textContent');
          updateElements(this.Elements.r1.tu_bar, value.tu_bar+'%', 'style.width');
          if (value.purchaseable) {
            const valSet = new Set(value.purchaseable);
            Object.entries(this.Elements.r1.investables).forEach(([id, {purchase_btn:el}]) => {
              if (valSet.has(id)) {
                el.classList.remove('not-allowed','theme-grey');
              } else {
                el.classList.add('not-allowed','theme-grey');
              }
            });
          }
          if (value.investable_cost) {
            Object.entries(this.Elements.r1.investables).forEach(([id, { purchase_btn__label, purchase_btn__cost }]) => {
              if (!value.investable_cost[id]) return;
              purchase_btn__label.textContent = TRANSLATIONS_EN.INVESTABLE[id] + ' Muscles';
              purchase_btn__cost.textContent = value.investable_cost[id];
            });
          }
          if (value.milestoneInfo) {
            Object.entries(this.Elements.r1.investables).forEach(([id, el]) => {
              if (!value.milestoneInfo[id]) return;
              el.milestones.forEach(([milestone, requirementEl, effectEl], index) => {
                if (!milestone) return console.error('milestone Element in HTML missing');
                const { requirement, effect, reached } = value.milestoneInfo[id][index]
                updateElements([requirementEl], requirement, 'textContent');
                updateElements([effectEl], effect, 'textContent');
                if (reached) milestone.classList.remove('theme-grey');
                else milestone.classList.add('theme-grey');
                
              });
            });
          }
          updateElements(this.Elements.r1.investablesBought.Legs, value.Legs, 'textContent');
          break;
        }
        case 'energy': {
          updateElements(this.Elements.energy.max, value.max, 'textContent');
          updateElements(this.Elements.energy.current, value.current, 'textContent');
          updateElements(this.Elements.energy.perSec, value.perSec, 'textContent');
          updateElements(this.Elements.energy.bar, value.bar+'%', 'style.width');
          break;
        }
      }
    });
  }

  /** @param {Game.defaultBodyVars} body_vars */
  onChange_bodyVars(body_vars) {
    if (typeof body_vars !== 'object') throw Error('body_vars type mismatch');
    Object.entries(body_vars).forEach(([key, value]) => {
      document.body.dataset[key] = value;
    });
    const a = new Decimal();
    a.abs;
  }

  initUiListeners() {
    // Layer Nav
    clickListener(id('navigate_to_1'), () => this.selectLayer(ENUMS.LAYER.ADVENTURE), this); // adventure Layer
    clickListener(id('navigate_to_2'), () => this.selectLayer(ENUMS.LAYER.TRAINING_GROUNDS), this); // Training Grounds Layer
    clickListener(id('navigate_to_3'), () => this.selectLayer(ENUMS.LAYER.RESEARCH), this); // research Layer
    clickListener(id('navigate_to_Stats'), () => this.selectLayer(ENUMS.LAYER.STATS), this); // stats Layer
    clickListener(id('navigate_to_Settings'), () => this.selectLayer(ENUMS.LAYER.SETTINGS), this); // settings Layer
    clickListener(id('nav_to_11'), () => this.selectLayer(ENUMS.LAYER.ADVENTURE, ENUMS.SUB_LAYER.MAP), this); // map, inside of adventure Layer
    clickListener(id('nav_to_12'), () => this.onPressCity(ENUMS.CITY.VERMILLION), this); // city, inside of map
    clickListener(id('nav_to_13'), () => this.onPressCity(ENUMS.CITY.STEPPEN), this); // city#2, inside of map
    
    // city Nav
    clickListener(id('nav_to_city_0'), () => this.selectCityPart(ENUMS.CITY_PART.CITY_MAP), this); // city-map, inside of city
    clickListener(id('nav_to_city_1'), this.onPressGuild, this); // guild, inside of city
    clickListener(id('nav_to_city_2'), () => this.selectCityPart(ENUMS.CITY_PART.BLACKSMITH), this); // Blacksmith, inside of city
    clickListener(id('nav_to_city_3'), () => this.selectCityPart(ENUMS.CITY_PART.MARKETPLACE), this); // Marketplace, inside of city
    clickListener(id('nav_to_city_townhall'), () => this.selectCityPart(ENUMS.CITY_PART.TOWN_HALL), this); // Town Hall, inside of city

    // toggle training buttons
    clickListener(this.Elements.trainingButtons[ENUMS.TRAINING.R1], () => DATA.player.toggleTraining(ENUMS.TRAINING.R1), this);

    // guild actions
    clickListener(this.Elements.city.guild.talk_to_Receptionist, () => DATA.ui.popup.beginDialogue(ENUMS.PERSON_ID.GUILD_RECEPTIONIST), this);
    clickListener(this.Elements.city.guild.talk_to_Instructor, () => DATA.ui.popup.beginDialogue(ENUMS.PERSON_ID.TRAINING_INSTRUCTOR), this);
  }

  changeTrainingStatusButton(index, state, label) {
    const btn = this.Elements.trainingButtons[index];
    const labelEl = btn.querySelector('label');
    if (labelEl) labelEl.textContent = label;
    else btn.textContent = label;
    btn.classList.remove('disabled');
    switch(state) {
      case 'start': return btn.classList.add('in-training');
      case 'stop': return btn.classList.remove('in-training');
      case 'disable': return btn.classList.add('disabled');
    }
  }

  selectCityPart(part) {
    const preventBeforeGuildVisit = [ENUMS.CITY_PART.BLACKSMITH, ENUMS.CITY_PART.MARKETPLACE, ENUMS.CITY_PART.TOWN_HALL];
    if (preventBeforeGuildVisit.includes(part) && DATA.game.body_vars.unlockedTrainingTab === 0) {
      return this.popup.notify('you should visit the guild first');
    }
    this.selectLayer(ENUMS.LAYER.ADVENTURE, ENUMS.SUB_LAYER.CITY, part);
  }

  onPressCity(selectedCity = ENUMS.CITY.VERMILLION) {
    if (DATA.game.story_state === ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_CITY) DATA.ui.popup.openDialogue(ENUMS.DIALOGUE_ID.CHAPTER_0.INTRODUCE_CITY);
    const cityUnlocked = DATA.game.body_vars['unlockedCity'+selectedCity] === 1;
    if (!cityUnlocked) {
      return this.popup.notify('You have not yet unlocked the city of ' + TRANSLATIONS_EN.CITY[selectedCity] + '.');
    }
    this.selectCityPart(ENUMS.CITY_PART.CITY_MAP);
  }

  onPressGuild() {
    if (DATA.game.story_state === ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_GUILD) DATA.ui.popup.openDialogue(ENUMS.DIALOGUE_ID.CHAPTER_0.INTRODUCE_GUILD);
    this.selectCityPart(ENUMS.CITY_PART.GUILD);
  }
  
  selectLayer(layer, sublayer = ENUMS.SUB_LAYER.MAP, cityPart = ENUMS.CITY_PART.CITY_MAP) {
    DATA.world.currentLayer = [layer, sublayer, cityPart];
  }
}

class Popup {
  isClickAnywhereActive = false;
  // NPCS
  npcs = {
    [ENUMS.PERSON_ID.GUILD_RECEPTIONIST]: new GUILD_RECEPTIONIST(),
    [ENUMS.PERSON_ID.TRAINING_INSTRUCTOR]: new TRAINING_INSTRUCTOR(),
  };
  // notification Elements
  notificationContainer = HTMLDivElement;
  notificationEls = [HTMLDivElement];

  // Achievement Elements
  achievementEl = [HTMLDivElement];

  // DialogueState
  currentState = [ENUMS.DIALOGUE_ID.CHAPTER_0.CHAPTER_INTRO,0];

  constructor() {
    this.dialogueEls = {
      dialogueMainEl: id('dialogue'),
      dismiss: id('dismiss_dialogue'),
      npcTemplate: id('dialogue-template-npc'),
      playerTemplate: id('dialogue-template-player'),
      conversationArea: id('conversation'),
      personImage: id('person-image'),
      personName: id('person-name'),
      playerResponse: {
        preText: id('response-text'),
        actions: all('#response-actions button')
      }
    }
    this.notificationContainer = id('notification-container');
    this.notificationEls = all('.notification');
    this.achievementEl = [id('achievements'), q('#achievements [data-achievement-title]'), q('#achievements .body')];
    this.achievementEl[0].addEventListener('click', () => this.achievementEl[0].classList.add('d-none'));
    this.dialogueEls.playerResponse.actions.forEach((btn, index) => {
      clickListener(btn, ev => {ev.preventDefault() ;this.actionButtonPressed(index, btn)}, this);
    });

    // dismiss on click anywhere, if dismiss visible
    document.body.addEventListener('click', (ev) => {
      // to prevent weird bubbling bug
      // const clickedActionBtn = ev.target.classList.contains('d_action');
      // if (clickedActionBtn || this.dialogueEls.dismiss.classList.contains('d-none')) return;
      if (!this.isClickAnywhereActive) return;

      this.continueState();
    });
    this.initNotifyQueueChecker();
  }

  loadFromSavegame(popupSave = {}) {
    if (popupSave.npcs?.length) {
      popupSave.npcs.forEach(([pid,vars]) => {
        vars.forEach((val,index) => {
          this.npcs[pid].dialogueVars[index] = val;
        })
      })
    }
  }

  getSaveData() {
    return {
      npcs: Object.values(this.npcs).map(npc => [npc.personId, npc.dialogueVars]),
    }
  }

  beginDialogue(person) {
    this.dialogue[person] = this.npcs[person].getDialogueOptions();
    this.openDialogue(person);
    // switch (person) {
    //   case ENUMS.PERSON_ID.GUILD_RECEPTIONIST:
    //     break;
    //   case ENUMS.PERSON_ID.TRAINING_INSTRUCTOR:
    //     this.dialogue[person] = this.npcs[person].getDialogueOptions();
    //     this.openDialogue(ENUMS.PERSON_ID.GUILD_RECEPTIONIST);
    //     break;
    // }
  }

  openDialogue(dialogueID,subnr=0, keep = false) {
    this.isClickAnywhereActive = false;
    this.currentState = [dialogueID, subnr];
    if (!keep) this.dialogueEls.conversationArea.replaceChildren(); // remove all dialoge items
    const {person, text, actions, preText } = this.dialogue[dialogueID][subnr];
    const [name,image] = TRANSLATIONS_EN.PERSON_NAME_AND_IMAGE[person];
    this.dialogueEls.dialogueMainEl.classList.remove('d-none');
    this.dialogueEls.personName.textContent = name;
    this.dialogueEls.personImage.className = 'person-img ' + image;
    this.npcMsg(text);
    this.dialogueEls.playerResponse.preText.parentElement.classList.add('d-none');
    if (preText) {
      this.dialogueEls.playerResponse.preText.parentElement.classList.remove('d-none');
      this.dialogueEls.playerResponse.preText.textContent = preText;
    }
    this.dialogueEls.playerResponse.actions.forEach(action => action.classList.add('d-none'));
    let options = typeof actions === 'function' ? actions() : actions;
    options.forEach((action,index) => {
      if (action.text === ENUMS.DIALOGUE_ID.SHOW_CONTINUE_PROMPT) {
        this.dialogueEls.dismiss.classList.remove('d-none');
        this.isClickAnywhereActive = true;
        return;
      }
      const btn = this.dialogueEls.playerResponse.actions[index];
      btn.textContent = action.text;
      btn.classList.remove('d-none');
    });
  }

  msg(msg, by) {
    const textNode = this.dialogueEls[by === 'npc' ? 'npcTemplate' : 'playerTemplate'].cloneNode();
    textNode.classList.remove('d-none');
    textNode.textContent = msg;
    this.dialogueEls.conversationArea.appendChild(textNode);
    setTimeout(() => textNode.scrollIntoView());
  }
  playerMsg(msg) { this.msg(msg, 'player'); }
  npcMsg(msg) { this.msg(msg, 'npc'); }

  currentVisibleNotifications = [];
  notifyQueue = [];
  lastElementUsedIndex = 0;
  notify(text, theme) { this.notifyQueue.push([text, theme]); }
  initNotifyQueueChecker() { setInterval(() => this.checkNotifyQueue(), 100); }
  checkNotifyQueue() {
    if (!this.notifyQueue.length) return;
    if (this.currentVisibleNotifications.length >= 4) return;
    const [nextNotification, theme] = this.notifyQueue.splice(0, 1)[0];
    this.currentVisibleNotifications.push(nextNotification);
    const nextNotificationElement = this.notificationEls[this.lastElementUsedIndex];
    this.removeThemes(nextNotificationElement);
    this.addTheme(nextNotificationElement, theme ?? 'theme-white');
    this.lastElementUsedIndex = this.lastElementUsedIndex === 3 ? 0 : this.lastElementUsedIndex+1;
    nextNotificationElement.textContent = nextNotification;
    const [style, to, from] = ['opacity', '0', '1'];
    nextNotificationElement.classList.remove('d-none'); // turn visible
    setTimeout(() => {
      animate(nextNotificationElement, 1000, [style, to]).then(() => {
        nextNotificationElement.classList.add('d-none');
        this.currentVisibleNotifications.splice(0,1);
        nextNotificationElement.style[style] = from;
      });
    },5000);
  }

  addTheme(el, theme) { el.classList.add(theme); }
  removeThemes(el) { el.classList.remove(...THEME) }

  achievements = [
    new Achievement('Never skip Leg Day!','Reach 100 Leg Muscle Mass'),
  ]
  achievementNotify(nr) {
    updateElements([this.achievementEl[1]],this.achievements[nr].title,'textContent');
    updateElements([this.achievementEl[2]],this.achievements[nr].body,'textContent');
    this.achievementEl[0].classList.remove('d-none');
  }

  actionButtonPressed(btnIndex, btn) {
    const [nr, subNr] = this.currentState;
    this.playerMsg(btn.textContent);
    const action = this.dialogue[nr][subNr].actions[btnIndex].action;
    if (action === ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION) {
      this.continueState();
    } else if (action === ENUMS.DIALOGUE_ID.CLOSE_DIALOGUE) {
      this.closeDialogue();
    } else {
      action.bind(this)(); // call the action, with this as context
    }
  }

  dialogue = {
    [ENUMS.PERSON_ID.GUILD_RECEPTIONIST]: undefined,
    [ENUMS.DIALOGUE_ID.CHAPTER_0.CHAPTER_INTRO]: { // Beginning of the game
      title: 'Chapter 0 - Becoming an Adventurer!',
      0: {
        person: ENUMS.PERSON_ID.VOICE,
        text: 'Hello there!',
        actions: [ { text: 'Me...?', action: this.continueState } ]
      },
      1: {
        person: ENUMS.PERSON_ID.VOICE,
        text: "Yes you! You want to be an adventurer, isn't that right?",
        actions: [ { text: 'Yeah...', action: this.continueState } ]
      },
      2: {
        person: ENUMS.PERSON_ID.VOICE,
        text: "So you don't want to be a farmer like your parents?",
        actions: [ { text: 'No!', action: this.continueState } ]
      },
      3: {
        person: ENUMS.PERSON_ID.VOICE,
        text: "So tell me, what is your motivation? What are you looking for?",
        preText: 'I want to:',
        actions: [
          { text: 'be rich!', action: () => this.motivationChoice(1) },
          { text: 'be strong!', action: () => this.motivationChoice(2) },
          { text: 'become popular!', action: () => this.motivationChoice(3) },
          { text: 'learn new things!', action: () => this.motivationChoice(4) },
        ]
      },
      4: {
        person: ENUMS.PERSON_ID.VOICE,
        text: "Alright!\n\n\nLet's not waste any more time, and head out there!\nFirst Stop: "+TRANSLATIONS_EN.CITY[ENUMS.CITY.VERMILLION]+", the closest city in the region of "+TRANSLATIONS_EN.REGION[ENUMS.REGION.BARACUDA]+".",
        actions: [ { text: 'Lets go!', action: () => this.setStoryStateAndClose(ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_CITY) } ]
      }
    },
    [ENUMS.DIALOGUE_ID.CHAPTER_0.INTRODUCE_CITY]: { // entering the city
      0: {
        text: 'you just entered '+TRANSLATIONS_EN.CITY[ENUMS.CITY.VERMILLION]+'. It\'s a small city, but offers everything one might need.\nThe local adventurer guild outpost, might be small, but that should not matter to you.\nYou should go there right away, and ask to join.',
        actions: [ { text: 'Could it really be that easy?...', action: this.closeDialogue } ]
      }
    },
    [ENUMS.DIALOGUE_ID.CHAPTER_0.INTRODUCE_GUILD]: { // entering the guild
      0: {
        text: () => 'upon entering the guild, you are greeted by the receptionist.\n\n"Hey there, welcome to the adventurer guild of '+TRANSLATIONS_EN.CITY[ENUMS.CITY.VERMILLION]+'!\nHow may i be of service?"',
        actions: [ { text: "I'd like to register as an adventurer", action: this.continueState } ]
      },
      1: {
        text: () => '"Sure! We are always looking for new recruits.\nYou just need to pass the entry exam. We don\'t want to put unfit contenders into danger, so we need to ensure, you can defend yourself."',
        actions: [ { text: "Sign me up then", action: this.continueState } ]
      },
      2: {
        text: () => '"Just head over to the trainings ground and talk with the training officer.\nHe will help you prepare for the exam, in case you don\'t meet the physical requirements yet."',
        actions: [ { text: "I'll head over there right away, thank you very much.", action: this.closeDialogue } ]
      }
    },
    [ENUMS.DIALOGUE_ID.CHAPTER_0.INTRODUCE_TRAINING_GROUNDS]: { // entering the training grounds
      0: {
        text: "you arrive at the guild's training grounds. The guild's training officer approaches.\n\n\"You look puny, you've come to the right place to improve your weak physique.\"",
        actions: [ { text: "That was unnecessarily mean...", action: this.continueState } ]
      },
      1: {
        text: '"Haha", the old man laughs out loud, "No harm intended. I apologize. You can go over there and begin with some basic exercises."',
        actions: [ { text: "Lead the way, old man.", action: this.closeDialogue } ]
      },
    },
  }

  motivationChoice(nr) {
    DATA.player.choices.motivation = nr;
    this.continueState();
  }

  continueState() {
    this.dialogueEls.dismiss.classList.add('d-none');
    this.openDialogue(...[this.currentState[0], ++this.currentState[1]], true);
  }
  closeDialogue() { this.dialogueEls.dialogueMainEl.classList.add('d-none'); }
  set1AndClose(bodyVar) { DATA.game.body_vars.changeBodyVar(bodyVar, 1); this.closeDialogue(); }
  setStoryStateAndClose(story_state) { DATA.game.story_state = story_state; this.closeDialogue(); }
}

class NPC {
  personId = 'XXX';
  dialogueVars = [];

  createSimpleDialogue() {
    // to be implemented...
  }
}
class TRAINING_INSTRUCTOR extends NPC {
  personId = ENUMS.PERSON_ID.TRAINING_INSTRUCTOR;
  dialogueVars = [0];
  getDialogueOptions() {
    const requirementsMetForInitialDialogue = DATA.game.story_state === ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_TRAINING_GROUNDS;
    if (this.dialogueVars[0] === 0 && requirementsMetForInitialDialogue) return this.initialDialogueOptions();

    return {0: {
      person: this.personId,
      text: 'You need something?',
      actions: [ Dialogue.nothingAction ]
    }};
  }

  initialDialogueOptions() {
    const onEnd = () => {
      this.dialogueVars[0] = 1;
      DATA.game.changeBodyVar('unlockedTrainingTab', 1);
      DATA.game.changeBodyVar('leftSidebar', 1);
      DATA.game.changeBodyVar('unlockedAdventureTab', 1);
      DATA.game.changeBodyVar('unlockedR1', 1);
      DATA.game.changeBodyVar('unlockedR11', 1);
      
      DATA.ui.popup.setStoryStateAndClose(ENUMS.STORY.CHAPTER_0.NEXT_STEP__XXX);
    };
    const person = this.personId;
    return {
      0: {
        person,
        text: 'Yeah?',
        actions: [ { text: 'I want to become an adventurer, and was told to come here.', action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION } ]
      },
      1: {
        person,
        text: `Oh? And you think you can just waltz in here and become an adventurer?`,
        actions: [ { text: 'I...', action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION } ]
      },
      2: {
        person,
        text: "I was just kidding, hahha!\n\nOf course you can become an adventurer, but first you need to pass the physical exam.",
        actions: [ Dialogue.continueAction ]
      },
      3: {
        person,
        text: "I'll help you get in shape, for starters you can do some basic exercises over there, and then come back to me.",
        actions: [
          { text: "You're kinda rude", action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION },
          { text: "Alright! Let's do this!", action: onEnd },
        ]
      },
      4: {
        person,
        text: "Oh? Was I? Sorry about that, I didn't mean anything by it.",
        actions: [
          { text: "Whatever, i'll just begin with my training...", action: onEnd },
          { text: "I see, alright then. I'll begin with my training.", action: onEnd },
        ]
      }
    }
  }
}

class GUILD_RECEPTIONIST extends NPC {
  personId = ENUMS.PERSON_ID.GUILD_RECEPTIONIST;
  // [exam, ]
  dialogueVars = [0];
  getDialogueOptions() {
    if (!this.dialogueVars[0]) return this.initialDialogueOptions();

    // TODO: Add more dialogue options after initial dialogue...
    return {0: {
      person: this.personId,
      text: 'Hello! How may i be of service?',
      actions: [ Dialogue.nothingAction ]
    }};
  }

  initialDialogueOptions() {
    const onEnd = () => {
      this.dialogueVars[0] = 1;
      DATA.ui.popup.setStoryStateAndClose(ENUMS.STORY.CHAPTER_0.NEXT_STEP__INTRO_TRAINING_GROUNDS);
    };
    const person = this.personId;
    return {
      0: {
        person,
        text: 'Hello! Oh! A new Face? How may i be of service?',
        actions: [ { text: 'I would like to become an adventurer!', action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION } ]
      },
      1: {
        person,
        text: `Oh? That is wonderful to hear. We, the guild of ${TRANSLATIONS_EN.CITY[ENUMS.CITY.VERMILLION]} are always happy to welcome new members in our midst!`,
        actions: [ Dialogue.continueAction ]
      },
      2: {
        person,
        text: "But to officially make you a member, you'll need to pass the Adventurer physical exam",
        actions: [ { text: 'Sign me up then!', action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION } ]
      },
      3: {
        person,
        text: "No signup necessary, just head on over to our Training Grounds, straight to that door, and look for an old man. That'll be our instructor Raynard.",
        actions: [ Dialogue.continueAction ]
      },
      4: {
        person,
        text: "He will help you get in shape for the physical exam, if you need to, and then test your skills.",
        actions: [
          { text: "Thank you so much, i'll go there right away.", action: onEnd },
          { text: "I'll be back in no time", action: onEnd },
        ]
      }
    }
  }
}

class Dialogue {
  static continueAction = { text: ENUMS.DIALOGUE_ID.SHOW_CONTINUE_PROMPT, action: ENUMS.DIALOGUE_ID.DO_CONTINUE_STATE_ACTION };
  static nothingAction = { text: ENUMS.DIALOGUE_ID.NOTHING, action: ENUMS.DIALOGUE_ID.CLOSE_DIALOGUE };
}

class Achievement {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savegame = getSavegame();
  DATA.ui = new Ui(savegame.ui);
  DATA.settings = new Settings(savegame.settings);
  DATA.world = new World(savegame.world);
  DATA.game = new Game(savegame.game);
  DATA.player = new Player(savegame.player);
});
