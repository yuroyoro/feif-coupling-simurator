import Units from "./Units.js";

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const Store = assign({}, EventEmitter.prototype, {

  setDefaultState() {
    this.route = "透魔";
    this.myunit   = {
      "sex"          : "M",
      "advantage"    : "健康",
      "disadvantage" : "暴走しがち",
      "klass"        : "騎士",
    };


    this.males    = Units.males();
    this.females  = Units.females();
    this.children = Units.children();
    this.extra    = Units.extra();

    this.males.forEach(  (unit) => this.setChild(unit));
    this.females.forEach((unit) => this.setChild(unit));

    var mu = this.setupMyUnit();
    this.males.unshift(mu);

    this.selected = {};
  },

  setupMyUnit() {
    var mu = Units.myunit( this.myunit );
    this.mu = mu;
    this.setChild(mu, true);
    mu.child.classes.push(mu.classes[1]);
    return mu;
  },

  reset() {
    this.setDefaultState();
    this.emitChange();
  },

  setChild(unit, clone) {
    if( !unit.child ) return;

    var child = this.find(unit.child, this.children);
    if( clone ) {
      child = assign({}, child);
      child.classes = child.classes.map((v) => v);
    }
    unit.child = child;
    child.parent = unit;

    child.pmax = unit.pmax.map((v) => v);
  },

  find(name, from) {
    for(var i = 0; i < from.length; i++ ) {
      var v = from[i];
      if( name == v.name ){
        return v;
      }
    }

    return null;
  },

  search(name) {
    return (
      this.find(name, this.males)   ||
      this.find(name, this.females) ||
      this.find(name, this.children) ||
      this.find(name, this.extra)
    );
  },

  male(name) {
    return this.find(name, this.males);
  },

  female(name) {
    return this.find(name, this.females);
  },

  changeRoute(route) {
    if( this.route == route ) return;

    var myunit = this.myunit;
    this.setDefaultState(); // reset
    this.setRoute(route);

    // restore myunit
    this.setSex(myunit.sex);
    this.myunit = myunit;
    this.changeMyunit();

    this.emitChange();
  },

  setRoute(route){
    this.route = route;
    switch(route) {
    case "白夜":
      this.males   = this.males.filter((c) => c.type != "dark");
      this.females = this.females.filter((c) => c.type != "dark");
      this.children= this.children.filter((c) => c.type != "dark");
      break;
    case "暗夜":
      this.males   = this.males.filter((c) => c.type != "light");
      this.females = this.females.filter((c) => c.type != "light");
      this.children= this.children.filter((c) => c.type != "light");
      break;
    }
  },

  changeSex(sex) {
    this.setSex(sex);
    this.emitChange();
  },

  setSex(sex) {
    this.myunit.sex = sex;
    var mu = this.setupMyUnit();

    switch(sex) {
    case "M":
      this.females.shift();
      this.males.shift();
      this.males.unshift(mu);
      this.males.forEach((unit) => {
        if( unit.husband && unit.husband.myunit ) {
          unit.husband = null;
        }
      });
      break;
    case "F":
      this.males.shift();
      this.males.unshift(mu);
      this.females.unshift(mu);
      this.females.forEach((unit) => {
        if( unit.husband && unit.husband.myunit  ) {
          unit.husband = null;
        }
      });
    }
  },

  changeAdvantage(v, dis) {
    if( dis ) {
      this.myunit.disadvantage = v;
    } else {
      this.myunit.advantage = v;
    }

    this.changeMyunit();
    this.emitChange();
  },

  changeKlass(v) {
    this.myunit.klass = v;

    this.changeMyunit();
    this.emitChange();
  },

  changeMyunit() {
    var mu = this.setupMyUnit();

    var old = this.males.shift();
    if( old.husband ) mu.husband = old.husband;
    this.males.unshift(mu);

    if( mu.sex == "F" ) {
      this.females.shift();
      this.females.unshift(mu);
    }
    var f = (unit) => {
      if( unit.husband && unit.husband.myunit  ) {
        unit.husband = mu;
      }
    };

    this.males.forEach(f);
    this.females.forEach(f);
  },

  toggle(name) {
    var target = this.male(name);
    if( target ) target.selected = !target.selected;

    this.emitChange();
  },

  select(unit, husband) {
    if( unit.husband ) {
      unit.husband.husband = null;
    }
    unit.husband = husband;
    husband.husband = unit;

    unit.selected = false;

    this.selected[unit.name] = husband.name;

    // マイユニットが子世代を指定してる場合は計算し直す
    if( this.mu.husband ) {
      if( unit.child && unit.child.name ==  this.mu.husband.name ) {
        this.mu.husband = this.computeChild(unit, husband, unit.child);
      }
      if( husband.child && husband.child.name ==  this.mu.husband.name ) {
        this.mu.husband = this.computeChild(husband, unit, husband.child);
      }
    }

    this.emitChange();
  },

  unselect(unit) {
    if( unit.husband ) {
      unit.husband.husband = null;
    }
    unit.husband = null;

    unit.selected = false;

    this.emitChange();
  },

  candidates(unit) {
    var f = null;
    var husbands = [];
    var result   =[];
    switch(unit.sex) {
    case "M":
      f = this.male(unit.name);
      husbands = this.females;
      break;
    case "F":
      f = this.female(unit.name);
      husbands = this.males.filter((u) => f.sex != u.sex );
      break;
    }

    for(var i = 0; i < husbands.length; i++) {
      var husband = husbands[i];
      // どちらかが共通
      if( f.type == "common" || husband.type == "common") {
        result.push(husband);
        continue;
      }

      // 同じ陣営で王族同士ではない
      if( f.type == husband.type && !(f.norble && husband.norble) ) {
        result.push(husband);
        continue;
      }

      // 異なる陣営で王族同士
      if( f.type != husband.type && (f.norble && husband.norble) ) {
        result.push(husband);
        continue;
      }

      // 特例
      if( f.special ) {
        for(var j = 0; j < f.special.length; j++) {
          if( husband.name == f.special[j]) {
            result.push(husband);
            continue;
          }
        }
      }
    }

    // マイユニット
    if( unit.myunit ) {
      // 少数
      var extype = null;
      switch(this.route) {
      case "白夜" :
        extype = "light";
        break;
      case "暗夜" :
        extype = "dark";
        break;
      }

      if( extype ){
        this.extra.filter((c) => {
          return (c.type == "common" || c.type == extype) && c.sex != unit.sex;
        }).forEach((c) => {
          result.push(c);
        });
      }

      // 子世代
      this.children.filter((c) => {
        return (c.sex != unit.sex) && (unit.child.name != c.name) && c.parent;
      }).forEach((c) => {
        var r = this.computeChild(c.parent, c.parent.husband, c);
        result.push(r);
      });
    }

    return result;
  },

  computeChild(unit, husband, ch) {
    var child = assign({}, (ch || unit.child));
    if( !husband ) {
      return child;
    }

    // 職
    child.classes = child.classes.map((v) => v);
    if( child.name == "シグレ" && husband.name == "ジョーカー" ) {
      child.classes.push(child.spclass);
    } else {
      for(var i = 0; i < husband.classes.length; i++) {
        var c = husband.classes[i];
        if( c == "歌姫" ) continue;
        if( child.classes.indexOf(c) >= 0 ) continue;
        child.classes.push(c);
        break;
      }
      if( child.classes.length < 3 && child.spclass) {
        child.classes.push(child.spclass);
      }
    }

    // 上限
    child.pmax = [];
    unit.pmax.forEach((v, i) => {
      child.pmax[i] = v + husband.pmax[i] + 1;
    });

    // 成長率
    var prate = [];

    child.prate.forEach((v, i) => {
      prate[i] = Math.floor( (v + husband.prate[i]) / 2);
    });
    child.prate = prate;

    // 王族
    child.norble = child.norble || unit.norble || husband.norble;

    return child;
  },

  list(sex, type) {
    var from = [];

    switch(sex) {
    case "male":
      from = this.males;
      break;
    case "female":
      from = this.females;
      break;
    }

    var res = [];
    for(var i=0; i < from.length; i++) {
      var unit = from[i];
      if( unit.type == type ) {
        res.push(unit);
      }
    }
    return res;
  },

  save() {
    var state = {
      "route":     this.route,
      "myunit":    this.myunit,
      "selected" : this.selected,
    };
    var val = JSON.stringify(state);

    localStorage.feif = val;
  },

  load() {
    var v = localStorage.feif;
    if(v) {
      return JSON.parse(v);
    }
    return null;
  },

  initialize() {
    var state = this.load();
    this.setDefaultState();
    if ( state ) {
      this.setRoute(state.route);
      this.setSex(state.myunit.sex);
      this.myunit = state.myunit;
      this.changeMyunit();
      var keys = Object.keys(state.selected);
      for(var i = 0; i < keys.length; i++) {
        var k       = keys[i];
        var unit    = this.search(k);
        var husband = this.search(state.selected[k]);
        this.select(unit, husband);
      }
      console.log("loaded state");
      console.log(state);
    }
  },

  emitChange() {
    this.emit("change");
    this.save();
  },

  addChangeListener(callback) {
    this.on("change", callback);
  },

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  },

  getState() {
    return {
      "route":    this.route,
      "myunit":   this.myunit,

      "commons": {
        "males":   this.list("male",   "common"),
        "females": this.list("female", "common"),
      },
      "lights":  {
        "males":   this.list("male",   "light"),
        "females": this.list("female", "light"),
      },
      "darks":  {
        "males":   this.list("male",   "dark"),
        "females": this.list("female", "dark"),
      },
    };
  },

});

export default Store;
