// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/models/dbManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbManager = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DbManager = /*#__PURE__*/function () {
  function DbManager() {
    _classCallCheck(this, DbManager);

    this.dbName = "hit-man";
  }

  _createClass(DbManager, [{
    key: "getItem",
    value: function getItem() {
      var people;

      if (localStorage.getItem(this.dbName) === null) {
        people = [];
        return people;
      }

      people = JSON.parse(localStorage.getItem(this.dbName));
      return people;
    }
  }, {
    key: "setItem",
    value: function setItem(person) {
      var people = this.getItem();
      people.push(person);
      this.updateItem(people);
    }
  }, {
    key: "updateItem",
    value: function updateItem(data) {
      localStorage.setItem(this.dbName, JSON.stringify(data));
    }
  }, {
    key: "addVictim",
    value: function addVictim(victim, selectedCustomerId) {
      var people = this.getItem();
      var cIndex = people.findIndex(function (item) {
        return item.id === selectedCustomerId;
      });
      people[cIndex].victims.push(victim);
      this.updateItem(people);
    }
  }, {
    key: "cangeVictimStatus",
    value: function cangeVictimStatus(selectedCustomerId, selectedVictimId) {
      var people = this.getItem();
      var cIndex = people.findIndex(function (item) {
        return item.id === selectedCustomerId;
      });
      var vIndex = people[cIndex].victims.findIndex(function (item) {
        return item.id === selectedVictimId;
      });
      people[cIndex].victims[vIndex].missionStatus = !people[cIndex].victims[vIndex].missionStatus;
      this.updateItem(people);
      return people[cIndex].victims[vIndex].missionStatus;
    }
  }, {
    key: "removeCustomer",
    value: function removeCustomer(selectedCustomerId) {
      var people = this.getItem();
      var cIndex = people.findIndex(function (item) {
        return item.id === selectedCustomerId;
      });
      people.splice(people[cIndex], 1);
      this.updateItem(people);
    }
  }, {
    key: "removeVictim",
    value: function removeVictim(selectedCustomerId, selectedVictimId) {
      var people = this.getItem();
      var cIndex = people.findIndex(function (item) {
        return item.id === selectedCustomerId;
      });
      var vIndex = people[cIndex].victims.findIndex(function (item) {
        return item.id === selectedVictimId;
      });
      people[cIndex].victims.splice([vIndex], 1);
      this.updateItem(people);
    }
  }]);

  return DbManager;
}();

exports.DbManager = DbManager;
},{}],"src/views/victimTemplate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.victimTemplate = void 0;
var victimTemplate = "\n    <div class=\"card-body victim-box mx-3 my-2 position-relative\" id=\"__ID__\" data-status=\"__STATUS__\">\n        <button type=\"button\" class=\"btn btn-sm btn-outline-success ml-auto victim-mission-complated-btn\">Mission completed <i class=\"fas fa-check\"></i></button>\n        <button class=\"btn btn-outline-danger btn-sm ml-auto text-right victim-remove-btn\" type=\"button\"><i class=\"fas fa-trash-alt\"></i></button>\n        <div class=\"d-flex\">\n            <div class=\"mr-auto victim-photo-box\">\n                <img data-name=\"victim-photo\" class=\"mr-2\" src=\"__PHOTO__\" alt=\"\" width=\"100\" height=\"100\">\n            </div>\n            <div class=\"col ml-3 victim-info-box p-3\">\n                <div class=\"row\">\n                    <div class=\"col-12 pb-3\">\n                        <strong class=\"\">\n                            <span data-name=\"victim-name\">__NAME__</span>\n                            <span data-name=\"victim-surname\">__LASTNAME__</span>\n                        </strong>\n                        <span class=\"badge badge-info\" data-name=\"victim-gender\"> __GENDER__ </span>\n                        <span class=\"badge badge-warning\" data-name=\"victim-age\"> __AGE__ </span>\n                    </div>\n                    <div class=\"col-12\">\n                        __ADDRESSES__\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n";
exports.victimTemplate = victimTemplate;
},{}],"src/models/addNewVictimToList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddNewVictimToList = void 0;

var _victimTemplate = require("../views/victimTemplate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddNewVictimToList = /*#__PURE__*/function () {
  function AddNewVictimToList() {
    _classCallCheck(this, AddNewVictimToList);
  }

  _createClass(AddNewVictimToList, [{
    key: "addNew",
    value: function addNew(victim, selectedCustomerId) {
      var victimsListContainer = document.querySelector("#".concat(selectedCustomerId));
      var adressIndex = 0;

      var victimView = _victimTemplate.victimTemplate.replace(/__STATUS__/, victim.missionStatus).replace(/__ID__/, victim.id).replace(/__PHOTO__/, victim.photo).replace(/__NAME__/, victim.name).replace(/__LASTNAME__/, victim.lastName).replace(/__GENDER__/, victim.gender).replace(/__AGE__/, victim.age).replace(/__ADDRESSES__/, victim.addresses.map(function (item) {
        adressIndex++;
        return "<div>Adres ".concat(adressIndex, ": ").concat(item, "</div>");
      }).join(""));

      victimsListContainer.insertAdjacentHTML('afterbegin', victimView);
    }
  }]);

  return AddNewVictimToList;
}();

exports.AddNewVictimToList = AddNewVictimToList;
},{"../views/victimTemplate":"src/views/victimTemplate.js"}],"src/models/resetValues.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetValues = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResetValues = /*#__PURE__*/function () {
  function ResetValues() {
    _classCallCheck(this, ResetValues);
  }

  _createClass(ResetValues, [{
    key: "resetValues",
    value: function resetValues() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (item) {
        item.value = "";
      });
    }
  }]);

  return ResetValues;
}();

exports.ResetValues = ResetValues;
},{}],"src/views/eventsVictim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsVictim = eventsVictim;

var _dbManager = require("../models/dbManager");

var _addNewVictimToList = require("../models/addNewVictimToList");

var _resetValues = require("../models/resetValues");

function eventsVictim() {
  var addNewVictimBtn = document.querySelector('[data-name="new-victim-btn"]');
  var addNewVictimName = document.querySelector('#victim-name');
  var addNewVictimLastName = document.querySelector('#victim-lastName');
  var addNewVictimAge = document.querySelector('#victim-age');
  var addNewVictimGender = document.querySelector('#victim-gender');
  var addNewVictimPhoto = document.querySelector('#victim-photo');
  var addNewVictimAdressBtn = document.querySelector('.btn-add-adress');
  var listContainer = document.querySelector("#customersListContainer");
  var selectedCustomerId;
  addNewVictimBtn.addEventListener('click', function () {
    var addNewVictimAdress = document.querySelectorAll('.victim-adress');
    var name = addNewVictimName.value;
    var lastName = addNewVictimLastName.value;
    var age = addNewVictimAge.value;
    var gender = addNewVictimGender.value;
    var photo = addNewVictimPhoto.value;
    var addresses = [];
    addNewVictimAdress.forEach(function (item) {
      addresses.push(item.value);
    });
    var victim = {
      id: "v-" + new Date().getTime(),
      name: name,
      lastName: lastName,
      age: age,
      gender: gender,
      photo: photo,
      addresses: addresses,
      missionStatus: false
    };
    var db = new _dbManager.DbManager();
    var addVictim = new _addNewVictimToList.AddNewVictimToList();
    addVictim.addNew(victim, selectedCustomerId);
    db.addVictim(victim, selectedCustomerId);
    var reset = new _resetValues.ResetValues();
    reset.resetValues(addNewVictimName, addNewVictimLastName, addNewVictimAge, addNewVictimGender, addNewVictimPhoto, [addNewVictimAdress]);
    addNewVictimAdress.forEach(function (item) {
      item.value = "";
    });
  });
  addNewVictimAdressBtn.addEventListener("click", function (e) {
    var victimAdressTemlate = "<input type=\"text\" class=\"form-control victim-adress mb-2\" placeholder=\"Adress...\">";
    e.target.parentElement.insertAdjacentHTML("beforeend", victimAdressTemlate);
    e.preventDefault();
  });
  listContainer.addEventListener("click", function (e) {
    var targetElm = e.target;

    if (targetElm.classList.contains("add-victims-modal-btn")) {
      selectedCustomerId = targetElm.parentElement.parentElement.getAttribute("id");
    }

    if (targetElm.classList.contains("victim-mission-complated-btn")) {
      var selectedVictimId = targetElm.parentElement.getAttribute("id");

      var _selectedCustomerId = targetElm.parentElement.parentElement.getAttribute("id");

      var victimBox = targetElm.parentElement;
      var db = new _dbManager.DbManager();

      if (db.cangeVictimStatus(_selectedCustomerId, selectedVictimId)) {
        victimBox.dataset.status = "true";
        return;
      }

      victimBox.dataset.status = "false";
    }

    if (targetElm.classList.contains("victim-remove-btn")) {
      var _selectedVictimId = targetElm.parentElement.getAttribute("id");

      var _selectedCustomerId2 = targetElm.parentElement.parentElement.getAttribute("id");

      var _db = new _dbManager.DbManager();

      targetElm.parentElement.remove();

      _db.removeVictim(_selectedCustomerId2, _selectedVictimId);
    }
  });
}
},{"../models/dbManager":"src/models/dbManager.js","../models/addNewVictimToList":"src/models/addNewVictimToList.js","../models/resetValues":"src/models/resetValues.js"}],"src/models/addNewCustomerToList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddNewCustomerToList = void 0;

var _victimTemplate = require("../views/victimTemplate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddNewCustomerToList = /*#__PURE__*/function () {
  function AddNewCustomerToList() {
    _classCallCheck(this, AddNewCustomerToList);
  }

  _createClass(AddNewCustomerToList, [{
    key: "addNew",
    value: function addNew(customer) {
      var customersListContainer = document.querySelector("#customersListContainer");
      var adressIndex = 0;
      var customerTemplate = "\n    <div class=\"card\" data-customerid=\"".concat(customer.id, "\">\n        <button class=\"btn btn-outline-danger btn-sm ml-auto text-right customer-remove-btn\" type=\"button\">\n               <i class=\"fas fa-trash-alt\"></i>\n        </button>\n        <div id=\"customer-").concat(customer.id, "\" class=\"card-header d-flex align-items-center\"  data-toggle=\"collapse\" data-target=\"#").concat(customer.id, "\">\n            <i class=\"fas fa-chevron-down\"></i> \n            <div class=\"col mr-5\"><i class=\"fas fa-user-secret\"></i> <span data-name=\"customer-name\">").concat(customer.name, "</span> <span data-name=\"customer-surname\">").concat(customer.lastName, "</span></div>\n            <div class=\"col mr-5\">").concat(customer.phone, "</div>\n        </div>\n        <div id=\"").concat(customer.id, "\" class=\"collapse\" data-parent=\"#customersListContainer\" >\n         ").concat(customer.victims.reduce(function (carry, victim) {
        return carry + _victimTemplate.victimTemplate.replace(/__STATUS__/, victim.missionStatus).replace(/__ID__/, victim.id).replace(/__PHOTO__/, victim.photo).replace(/__NAME__/, victim.name).replace(/__LASTNAME__/, victim.lastName).replace(/__GENDER__/, victim.gender).replace(/__AGE__/, victim.age).replace(/__ADDRESSES__/, victim.addresses.map(function (item) {
          adressIndex++;
          return "<div>Adres ".concat(adressIndex, ": ").concat(item, "</div>");
        }).join(""));
      }, ''), "\n         \n            <div class=\"d-flex mt-2 px-3 pb-2\">\n                <button type=\"button\" class=\"btn btn-danger ml-auto btn-sm add-victims-modal-btn\" data-toggle=\"modal\" data-target=\"#victimRegisterForm\">Add Victim <i class=\"fas fa-user-plus\"></i></button>\n            </div>\n        </div>\n    </div>\n");
      customersListContainer.innerHTML += customerTemplate;
    }
  }]);

  return AddNewCustomerToList;
}();

exports.AddNewCustomerToList = AddNewCustomerToList;
},{"../views/victimTemplate":"src/views/victimTemplate.js"}],"src/views/eventsCustomer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsCustomer = eventsCustomer;

var _dbManager = require("../models/dbManager");

var _addNewCustomerToList = require("../models/addNewCustomerToList");

var _resetValues = require("../models/resetValues");

function eventsCustomer() {
  var addNewCustomerBtn = document.querySelector('[data-name="new-customer-btn"]');
  var addNewCustomerName = document.querySelector('#customer-name');
  var addNewCustomerLastName = document.querySelector('#customer-lastName');
  var addNewCustomerPhone = document.querySelector('#customer-phone');
  var listContainer = document.querySelector("#customersListContainer");
  addNewCustomerBtn.addEventListener('click', function () {
    var name = addNewCustomerName.value;
    var lastName = addNewCustomerLastName.value;
    var phone = addNewCustomerPhone.value;
    var customer = {
      id: "c-" + new Date().getTime(),
      name: name,
      lastName: lastName,
      phone: phone,
      victims: []
    };
    var db = new _dbManager.DbManager();
    var addCustomer = new _addNewCustomerToList.AddNewCustomerToList();
    addCustomer.addNew(customer);
    db.setItem(customer);
    var reset = new _resetValues.ResetValues();
    reset.resetValues(addNewCustomerName, addNewCustomerLastName, addNewCustomerPhone);
  });
  listContainer.addEventListener("click", function (e) {
    var targetElm = e.target;

    if (targetElm.classList.contains("customer-remove-btn")) {
      var selectedCustomerId = targetElm.parentElement.getAttribute("data-customerid");
      var db = new _dbManager.DbManager();
      db.removeCustomer(selectedCustomerId);
      targetElm.parentElement.remove();
    }
  });
}
},{"../models/dbManager":"src/models/dbManager.js","../models/addNewCustomerToList":"src/models/addNewCustomerToList.js","../models/resetValues":"src/models/resetValues.js"}],"src/models/initialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Initialize = void 0;

var _dbManager = require("./dbManager");

var _addNewCustomerToList = require("./addNewCustomerToList");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Initialize = /*#__PURE__*/function () {
  function Initialize() {
    _classCallCheck(this, Initialize);
  }

  _createClass(Initialize, [{
    key: "init",
    value: function init() {
      var db = new _dbManager.DbManager();
      var addToList = new _addNewCustomerToList.AddNewCustomerToList();
      var people = db.getItem();
      people.forEach(function (person) {
        addToList.addNew(person);
      });
    }
  }]);

  return Initialize;
}();

exports.Initialize = Initialize;
},{"./dbManager":"src/models/dbManager.js","./addNewCustomerToList":"src/models/addNewCustomerToList.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _eventsVictim = require("./src/views/eventsVictim");

var _eventsCustomer = require("./src/views/eventsCustomer");

var _initialize = require("./src/models/initialize");

(0, _eventsCustomer.eventsCustomer)();
(0, _eventsVictim.eventsVictim)();
var start = new _initialize.Initialize();
start.init();
},{"./src/views/eventsVictim":"src/views/eventsVictim.js","./src/views/eventsCustomer":"src/views/eventsCustomer.js","./src/models/initialize":"src/models/initialize.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60608" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map