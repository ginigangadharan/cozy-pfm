(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {
  initialize: function() {
    var Router;
    Router = require('router');
    this.router = new Router();
    if (typeof Object.freeze === 'function') {
      return Object.freeze(this);
    }
  }
};

});

require.register("collections/bank_accesses", function(exports, require, module) {
var BankAccess, BankAccesses, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BankAccess = require('../models/bank_access');

module.exports = BankAccesses = (function(_super) {
  __extends(BankAccesses, _super);

  function BankAccesses() {
    _ref = BankAccesses.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BankAccesses.prototype.model = BankAccess;

  BankAccesses.prototype.url = "bankaccesses";

  return BankAccesses;

})(Backbone.Collection);

});

require.register("collections/bank_accounts", function(exports, require, module) {
var BankAccount, BankAccounts,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BankAccount = require('../models/bank_account');

module.exports = BankAccounts = (function(_super) {
  __extends(BankAccounts, _super);

  BankAccounts.prototype.model = BankAccount;

  BankAccounts.prototype.url = "bankaccounts";

  function BankAccounts(bank) {
    this.bank = bank;
    this.url = "banks/getAccounts/" + this.bank.get("id");
    BankAccounts.__super__.constructor.call(this);
  }

  BankAccounts.prototype.getSum = function() {
    var account, sum, _i, _len, _ref;
    sum = 0;
    _ref = this.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      account = _ref[_i];
      sum += Number(account.get("amount"));
    }
    return sum;
  };

  return BankAccounts;

})(Backbone.Collection);

});

require.register("collections/bank_operations", function(exports, require, module) {
var BankOperation, BankOperations, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BankOperation = require('../models/bank_operation');

module.exports = BankOperations = (function(_super) {
  __extends(BankOperations, _super);

  function BankOperations() {
    _ref = BankOperations.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BankOperations.prototype.model = BankOperation;

  BankOperations.prototype.url = "bankoperations";

  BankOperations.prototype.setAccount = function(account) {
    this.account = account;
    return this.url = "bankaccounts/getOperations/" + this.account.get("id");
  };

  return BankOperations;

})(Backbone.Collection);

});

require.register("collections/banks", function(exports, require, module) {
var Bank, Banks, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bank = require('../models/bank');

module.exports = Banks = (function(_super) {
  __extends(Banks, _super);

  function Banks() {
    _ref = Banks.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Banks.prototype.model = Bank;

  Banks.prototype.url = "banks";

  Banks.prototype.getSum = function() {
    var bank, sum, _i, _len, _ref1;
    sum = 0;
    _ref1 = this.models;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      bank = _ref1[_i];
      sum += Number(bank.get("amount"));
    }
    return sum;
  };

  return Banks;

})(Backbone.Collection);

});

require.register("initialize", function(exports, require, module) {
var AppView, BankOperationsCollection, BanksCollection, app;

app = require('application');

AppView = require('views/app');

BanksCollection = require('collections/banks');

BankOperationsCollection = require('collections/bank_operations');

$(function() {
  require('lib/app_helpers');
  /*
          global variables
  */

  window.app = app;
  window.polyglot = new Polyglot({
    "phrases": require('locale/en')
  });
  window.i18n = function(key) {
    return window.polyglot.t(key);
  };
  window.collections = {};
  window.views = {};
  window.collections.banks = new BanksCollection();
  window.collections.operations = new BankOperationsCollection();
  /*
          views
  */

  window.views.appView = new AppView();
  window.views.appView.render();
  window.activeObjects = {};
  _.extend(window.activeObjects, Backbone.Events);
  return app.initialize();
});

});

require.register("lib/app_helpers", function(exports, require, module) {
(function() {
  return (function() {
    var console, dummy, method, methods, _results;
    console = window.console = window.console || {};
    method = void 0;
    dummy = function() {};
    methods = 'assert,count,debug,dir,dirxml,error,exception,\
                   group,groupCollapsed,groupEnd,info,log,markTimeline,\
                   profile,profileEnd,time,timeEnd,trace,warn'.split(',');
    _results = [];
    while (method = methods.pop()) {
      _results.push(console[method] = console[method] || dummy);
    }
    return _results;
  })();
})();

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
  var i, j, n, sign;
  n = this;
  decPlaces = (isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces);
  decSeparator = (decSeparator === undefined ? "." : decSeparator);
  thouSeparator = (thouSeparator === undefined ? "," : thouSeparator);
  sign = (n < 0 ? "-" : "");
  i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
  j = ((j = i.length) > 3 ? j % 3 : 0);
  return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

Number.prototype.money = function() {
  return this.formatMoney(2, " ", ",");
};

Date.prototype.dateString = function() {
  var addZeros, myDate;
  addZeros = function(num) {
    if (Number(num) < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };
  myDate = this;
  return addZeros(myDate.getDate() + 1) + "/" + addZeros(myDate.getMonth()) + "/" + myDate.getFullYear();
};

Date.prototype.timeString = function() {
  var addZeros, myDate;
  addZeros = function(num) {
    if (Number(num) < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };
  myDate = this;
  return addZeros(myDate.getHours()) + ":" + addZeros(myDate.getMinutes());
};

});

require.register("lib/base_view", function(exports, require, module) {
var BaseView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    _ref = BaseView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseView.prototype.template = function() {};

  BaseView.prototype.initialize = function() {};

  BaseView.prototype.getRenderData = function() {
    return {
      model: this.model
    };
  };

  BaseView.prototype.render = function() {
    this.beforeRender();
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  BaseView.prototype.beforeRender = function() {};

  BaseView.prototype.afterRender = function() {};

  BaseView.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  return BaseView;

})(Backbone.View);

});

require.register("lib/view_collection", function(exports, require, module) {
var BaseView, ViewCollection, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('lib/base_view');

module.exports = ViewCollection = (function(_super) {
  __extends(ViewCollection, _super);

  function ViewCollection() {
    this.removeItem = __bind(this.removeItem, this);
    this.addItem = __bind(this.addItem, this);
    _ref = ViewCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ViewCollection.prototype.itemview = null;

  ViewCollection.prototype.views = {};

  ViewCollection.prototype.template = function() {
    return '';
  };

  ViewCollection.prototype.itemViewOptions = function() {};

  ViewCollection.prototype.collectionEl = null;

  ViewCollection.prototype.onChange = function() {
    return this.$el.toggleClass('empty', _.size(this.views) === 0);
  };

  ViewCollection.prototype.appendView = function(view) {
    return this.$collectionEl.append(view.el);
  };

  ViewCollection.prototype.initialize = function() {
    var collectionEl;
    ViewCollection.__super__.initialize.apply(this, arguments);
    this.views = {};
    this.listenTo(this.collection, "reset", this.onReset);
    this.listenTo(this.collection, "add", this.addItem);
    this.listenTo(this.collection, "remove", this.removeItem);
    if (this.collectionEl == null) {
      return collectionEl = el;
    }
  };

  ViewCollection.prototype.render = function() {
    var id, view, _ref1;
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      view.$el.detach();
    }
    return ViewCollection.__super__.render.apply(this, arguments);
  };

  ViewCollection.prototype.afterRender = function() {
    var id, view, _ref1;
    this.$collectionEl = $(this.collectionEl);
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      this.appendView(view.$el);
    }
    this.onReset(this.collection);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.remove = function() {
    this.onReset([]);
    return ViewCollection.__super__.remove.apply(this, arguments);
  };

  ViewCollection.prototype.onReset = function(newcollection) {
    var id, view, _ref1;
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      view.remove();
    }
    return newcollection.forEach(this.addItem);
  };

  ViewCollection.prototype.addItem = function(model) {
    var options, view;
    options = _.extend({}, {
      model: model
    }, this.itemViewOptions(model));
    view = new this.itemview(options);
    this.views[model.cid] = view.render();
    this.appendView(view);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.removeItem = function(model) {
    this.views[model.cid].remove();
    delete this.views[model.cid];
    return this.onChange(this.views);
  };

  return ViewCollection;

})(BaseView);

});

require.register("locale/en", function(exports, require, module) {
module.exports = {
  "menu_accounts": "Accounts",
  "menu_balance": "Balance",
  "menu_search": "Search",
  "menu_add_bank": "Add a new bank access",
  "overall_balance": "overall balance:",
  "add_bank_bank": "Bank",
  "add_bank_credentials": "Credentials",
  "add_bank_login": "Login",
  "add_bank_login_placeholder": "enter login here",
  "add_bank_password": "Password",
  "add_bank_password_placeholder": "enter password here",
  "add_bank_security_notice": "Security notice",
  "add_bank_security_notice_text": "In order to protect our customers, we implemented the best solutions...",
  "add_bank_cancel": "cancel",
  "add_bank_ok": "Verify & Save",
  "accounts_delete_bank": "remove this bank from Cozy",
  "accounts_delete_bank_title": "Confirmation required",
  "accounts_delete_bank_prompt": "Are you sure ? This can't be undone, and will erase ALL your data from this bank.",
  "accounts_delete_bank_confirm": "delete permanently",
  "accounts_delete_account": "remove this account permanently from Cozy",
  "accounts_delete_account_title": "Confirmation required",
  "accounts_delete_account_prompt": "Are you sure ? This can't be undone, and will erase ALL your data from this account.",
  "accounts_delete_account_confirm": "delete permanently",
  "loading": "loading...",
  "verifying": "verifying...",
  "cancel": "cancel",
  "removing": "removing...",
  "error": "error...",
  "sent": "sent successfully...",
  "error_refresh": "Sorry, there was an error. Please refresh and try again.",
  "alert_sure_delete_bank": "Are you sure ? This will remove all of your data from this bank, and can't be undone.",
  "alert_sure_delete_account": "Are you sure ? This will remove all of your data from this account, and can't be undone.",
  "error_loading_accounts": "There was an error loading bank accounts. Please refresh and try again later.",
  "fatal_error": "Something went wrong. Refresh.",
  "error_check_credentials_btn": "Could not log into the server. Click to retry.",
  "error_check_credentials": "We could not log into the bank's server. Please verify your credentials and try again.",
  "balance_please_choose_account": "Please select an account on the left to display its operations",
  "balance_banks_empty": "There are currently no bank accounts saved in your Cozy. Go ahead and create the first one now !",
  "header_date": "Date",
  "header_title": "Title",
  "header_amount": "Amount"
};

});

require.register("models/bank", function(exports, require, module) {
var Bank, BankAccountsCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BankAccountsCollection = require('../collections/bank_accounts');

module.exports = Bank = (function(_super) {
  __extends(Bank, _super);

  function Bank() {
    _ref = Bank.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Bank.prototype.defaults = {
    amount: 0
  };

  Bank.prototype.initialize = function() {
    this.accounts = new BankAccountsCollection(this);
    this.listenTo(this.accounts, "add", this.updateAmount);
    this.listenTo(this.accounts, "remove", this.updateAmount);
    this.listenTo(this.accounts, "destroy", this.updateAmount);
    return this.listenTo(this.accounts, "change", this.updateAmount);
  };

  Bank.prototype.updateAmount = function() {
    this.set("amount", this.accounts.getSum());
    return console.log("updated balance bank " + this.get("name") + " is now " + this.get("amount"));
  };

  return Bank;

})(Backbone.Model);

});

require.register("models/bank_access", function(exports, require, module) {
var BankAccess, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BankAccess = (function(_super) {
  __extends(BankAccess, _super);

  function BankAccess() {
    _ref = BankAccess.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BankAccess.prototype.url = "bankaccesses";

  return BankAccess;

})(Backbone.Model);

});

require.register("models/bank_account", function(exports, require, module) {
var BankAccount, BankOperationsCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BankOperationsCollection = require('../collections/bank_operations');

module.exports = BankAccount = (function(_super) {
  __extends(BankAccount, _super);

  function BankAccount() {
    _ref = BankAccount.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return BankAccount;

})(Backbone.Model);

});

require.register("models/bank_operation", function(exports, require, module) {
var BankOperation, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BankOperation = (function(_super) {
  __extends(BankOperation, _super);

  function BankOperation() {
    _ref = BankOperation.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return BankOperation;

})(Backbone.Model);

});

require.register("router", function(exports, require, module) {
var AppView, BalanceView, MockupView, Router, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MockupView = require('views/mockup');

AppView = require('views/app');

BalanceView = require('views/balance');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    '': 'balance',
    'accounts': 'accounts',
    'search': 'search'
  };

  Router.prototype.balance = function() {
    var _ref1;
    if ((_ref1 = window.views.balanceView) != null) {
      _ref1.render();
    }
    $(".menu-position").removeClass("active");
    return $(".menu-1").addClass("active");
  };

  Router.prototype.accounts = function() {
    var _ref1;
    if ((_ref1 = window.views.accountsView) != null) {
      _ref1.render();
    }
    $(".menu-position").removeClass("active");
    return $(".menu-2").addClass("active");
  };

  Router.prototype.search = function() {
    var _ref1;
    if ((_ref1 = window.views.searchView) != null) {
      _ref1.render();
    }
    $(".menu-position").removeClass("active");
    return $(".menu-3").addClass("active");
  };

  return Router;

})(Backbone.Router);

});

require.register("views/accounts", function(exports, require, module) {
var AccountsBankView, AccountsView, BaseView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

AccountsBankView = require('./accounts_bank');

module.exports = AccountsView = (function(_super) {
  __extends(AccountsView, _super);

  function AccountsView() {
    _ref = AccountsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AccountsView.prototype.template = require('./templates/accounts');

  AccountsView.prototype.el = 'div#content';

  AccountsView.prototype.elBanks = '.content-right-column';

  AccountsView.prototype.render = function() {
    var bank, view, _i, _len, _ref1;
    AccountsView.__super__.render.call(this);
    _ref1 = window.collections.banks.models;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      bank = _ref1[_i];
      view = new AccountsBankView(bank);
      this.$(this.elBanks).append(view.render().el);
    }
    return this;
  };

  return AccountsView;

})(BaseView);

});

require.register("views/accounts_bank", function(exports, require, module) {
var AccountsBankAccountView, AccountsBankView, BankAccountsCollection, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

BankAccountsCollection = require('../collections/bank_accounts');

AccountsBankAccountView = require('./accounts_bank_account');

module.exports = AccountsBankView = (function(_super) {
  __extends(AccountsBankView, _super);

  AccountsBankView.prototype.template = require('./templates/accounts_bank');

  AccountsBankView.prototype.templateModal = require('./templates/modal_confirm');

  AccountsBankView.prototype.className = 'bank-group';

  AccountsBankView.prototype.inUse = false;

  AccountsBankView.prototype.events = {
    "click a.delete-bank": "confirmDeleteBank"
  };

  function AccountsBankView(bank) {
    this.bank = bank;
    AccountsBankView.__super__.constructor.call(this);
  }

  AccountsBankView.prototype.initialize = function() {
    return this.listenTo(this.bank.accounts, "add", this.render);
  };

  AccountsBankView.prototype.confirmDeleteBank = function(event) {
    var button, data;
    event.preventDefault();
    button = $(event.target);
    data = {
      title: window.i18n("accounts_delete_bank_title"),
      body: window.i18n("accounts_delete_bank_prompt"),
      confirm: window.i18n("accounts_delete_bank_confirm")
    };
    $("body").prepend(this.templateModal(data));
    $("#confirmation-dialog").modal();
    $("#confirmation-dialog").modal("show");
    return $("a#confirmation-dialog-confirm").bind("click", {
      button: button,
      bank: this.bank,
      view: this
    }, this.deleteBank);
  };

  AccountsBankView.prototype.deleteBank = function(event) {
    var bank, button, oldText, url, view;
    event.preventDefault();
    $("#confirmation-dialog").modal("hide");
    $("#confirmation-dialog").remove();
    view = event.data.view;
    button = event.data.button;
    bank = event.data.bank;
    oldText = button.html();
    button.addClass("disabled");
    button.html(window.i18n("removing") + " <img src='./loader_inverse.gif' />");
    return $.ajax({
      url: url = "banks/" + bank.get("id"),
      type: "DELETE",
      success: function() {
        bank.accounts.remove(bank.accounts.models);
        return view.$el.html("");
      },
      error: function(err) {
        var inUse;
        console.log("there was an error");
        console.log(err);
        return inUse = false;
      }
    });
  };

  AccountsBankView.prototype.render = function() {
    var bank, view, viewEl;
    view = this;
    viewEl = this.$el;
    bank = this.bank;
    this.bank.accounts.fetch({
      success: function(accounts) {
        var account, accountView, _i, _len, _ref;
        bank.set("amount", bank.accounts.getSum());
        if (accounts.length > 0) {
          view.$el.html(view.template({
            model: view.bank
          }));
          _ref = accounts.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            account = _ref[_i];
            accountView = new AccountsBankAccountView(account, view);
            view.$("tbody#account-container").append(accountView.render().el);
          }
          $(".content-right-column").niceScroll();
          return $(".content-right-column").getNiceScroll().onResize();
        }
      },
      error: function() {
        return alert(window.i18n("error_loading_accounts"));
      }
    });
    return this;
  };

  return AccountsBankView;

})(BaseView);

});

require.register("views/accounts_bank_account", function(exports, require, module) {
var AccountsBankAccountView, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = AccountsBankAccountView = (function(_super) {
  __extends(AccountsBankAccountView, _super);

  AccountsBankAccountView.prototype.template = require('./templates/accounts_bank_account');

  AccountsBankAccountView.prototype.templateModal = require('./templates/modal_confirm');

  AccountsBankAccountView.prototype.tagName = "tr";

  AccountsBankAccountView.prototype.events = {
    "click a.delete-account": "confirmDeleteAccount"
  };

  function AccountsBankAccountView(model, parent) {
    this.model = model;
    this.parent = parent;
    AccountsBankAccountView.__super__.constructor.call(this);
  }

  AccountsBankAccountView.prototype.confirmDeleteAccount = function(event) {
    var button, data, parent, view;
    event.preventDefault();
    view = this;
    parent = this.parent;
    button = $(event.target);
    data = {
      title: window.i18n("accounts_delete_account_title"),
      body: window.i18n("accounts_delete_account_prompt"),
      confirm: window.i18n("accounts_delete_account_confirm")
    };
    $("body").prepend(this.templateModal(data));
    $("#confirmation-dialog").modal();
    $("#confirmation-dialog").modal("show");
    return $("a#confirmation-dialog-confirm").bind("click", {
      button: button,
      model: this.model,
      parent: this.parent,
      view: this
    }, this.deleteAccount);
  };

  AccountsBankAccountView.prototype.deleteAccount = function(event) {
    var button, model, oldText, parent, view;
    event.preventDefault();
    $("#confirmation-dialog").modal("hide");
    $("#confirmation-dialog").remove();
    parent = event.data.parent;
    view = event.data.view;
    button = event.data.button;
    model = event.data.model;
    oldText = button.html();
    button.addClass("disabled");
    button.html(window.i18n("removing") + " <img src='./loader_inverse.gif' />");
    model.url = "bankaccounts/" + model.get("id");
    return model.destroy({
      success: function(model) {
        console.log("destroyed");
        view.destroy();
        if ((parent != null ? parent.bank.accounts.length : void 0) === 0) {
          return parent.destroy();
        }
      },
      error: function(err) {
        console.log("there was an error");
        return console.log(err);
      }
    });
  };

  AccountsBankAccountView.prototype.render = function() {
    this.$el.html(this.template({
      model: this.model
    }));
    return this;
  };

  return AccountsBankAccountView;

})(BaseView);

});

require.register("views/app", function(exports, require, module) {
var AccountsView, AppView, BalanceView, BaseView, NavbarView, NewBankView, SearchView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

NavbarView = require('views/navbar');

NewBankView = require('views/new_bank');

AccountsView = require('views/accounts');

BalanceView = require('views/balance');

SearchView = require('views/search');

module.exports = AppView = (function(_super) {
  __extends(AppView, _super);

  function AppView() {
    _ref = AppView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AppView.prototype.template = require('./templates/app');

  AppView.prototype.el = 'body.application';

  AppView.prototype.afterRender = function() {
    return window.collections.banks.fetch({
      success: function() {
        if (!this.navbarView) {
          this.navbarView = new NavbarView();
        }
        if (!this.newbankView) {
          this.newbankView = new NewBankView();
        }
        if (!window.views.balanceView) {
          window.views.balanceView = new BalanceView();
        }
        if (!window.views.accountsView) {
          window.views.accountsView = new AccountsView();
        }
        if (!window.views.searchView) {
          window.views.searchView = new SearchView();
        }
        this.navbarView.render();
        this.newbankView.render();
        return Backbone.history.start();
      },
      error: function() {
        console.log("Fatal error: could not get the banks list");
        return alert(window.i18n("fatal_error"));
      }
    });
  };

  return AppView;

})(BaseView);

});

require.register("views/balance", function(exports, require, module) {
var BalanceBankView, BalanceOperationsView, BalanceView, BaseView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

BalanceBankView = require('./balance_bank');

BalanceOperationsView = require("./balance_operations");

module.exports = BalanceView = (function(_super) {
  __extends(BalanceView, _super);

  function BalanceView() {
    _ref = BalanceView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BalanceView.prototype.template = require('./templates/balance');

  BalanceView.prototype.el = 'div#content';

  BalanceView.prototype.elAccounts = '#balance-column-left';

  BalanceView.prototype.elOperations = '#balance-column-right';

  BalanceView.prototype.accounts = 0;

  BalanceView.prototype.initialize = function() {
    return this.listenTo(window.activeObjects, "new_access_added_successfully", this.noMoreEmpty);
  };

  BalanceView.prototype.noMoreEmpty = function() {
    var _ref1, _ref2;
    console.log("no more empty");
    if ((_ref1 = this.$(".arrow")) != null) {
      _ref1.hide();
    }
    return (_ref2 = this.$(".loading")) != null ? _ref2.hide() : void 0;
  };

  BalanceView.prototype.render = function() {
    var treatment, view;
    BalanceView.__super__.render.call(this);
    this.operations = new BalanceOperationsView(this.$(this.elOperations));
    this.operations.render();
    view = this;
    treatment = function(bank, callback) {
      var viewBank;
      viewBank = new BalanceBankView(bank);
      $(view.elAccounts).append(viewBank.el);
      return bank.accounts.fetch({
        success: function(col) {
          callback(null, col.length);
          return viewBank.render();
        },
        error: function(col, err, opts) {
          callback(null, col.length);
          return viewBank.$el.html("");
        }
      });
    };
    async.concat(window.collections.banks.models, treatment, function(err, results) {
      if (err) {
        console.log(err);
        alert(window.i18n("error_loading_accounts"));
      }
      this.accounts = results.length;
      $("#balance-column-left").niceScroll();
      $("#balance-column-left").getNiceScroll().onResize();
      if (this.accounts === 0) {
        return $(view.elAccounts).prepend(require("./templates/balance_banks_empty"));
      }
    });
    return this;
  };

  return BalanceView;

})(BaseView);

});

require.register("views/balance_bank", function(exports, require, module) {
var BalanceBankView, BankSubTitleView, BankTitleView, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

BankTitleView = require('./bank_title');

BankSubTitleView = require('./bank_subtitle');

module.exports = BalanceBankView = (function(_super) {
  __extends(BalanceBankView, _super);

  BalanceBankView.prototype.className = 'bank';

  BalanceBankView.prototype.sum = 0;

  function BalanceBankView(bank) {
    this.bank = bank;
    BalanceBankView.__super__.constructor.call(this);
  }

  BalanceBankView.prototype.initialize = function() {
    this.listenTo(this.bank.accounts, "add", this.addOne);
    return this.listenTo(this.bank.accounts, "destroy", this.render);
  };

  BalanceBankView.prototype.addOne = function(account) {
    var viewAccount;
    viewAccount = new BankSubTitleView(account);
    account.view = viewAccount;
    return this.$el.append(viewAccount.render().el);
  };

  BalanceBankView.prototype.render = function() {
    var account, _i, _len, _ref;
    this.viewTitle = new BankTitleView(this.bank);
    this.$el.html(this.viewTitle.render().el);
    this.viewTitle = null;
    this.sum = 0;
    _ref = this.bank.accounts.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      account = _ref[_i];
      this.addOne(account);
    }
    return this;
  };

  return BalanceBankView;

})(BaseView);

});

require.register("views/balance_operations", function(exports, require, module) {
var BalanceOperationsView, BankOperationsCollection, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

BankOperationsCollection = require("../collections/bank_operations");

module.exports = BalanceOperationsView = (function(_super) {
  __extends(BalanceOperationsView, _super);

  BalanceOperationsView.prototype.templateHeader = require('./templates/balance_operations_header');

  BalanceOperationsView.prototype.templateElement = require('./templates/balance_operations_element');

  BalanceOperationsView.prototype.events = {
    'click a.recheck-button': "checkAccount"
  };

  BalanceOperationsView.prototype.inUse = false;

  function BalanceOperationsView(el) {
    this.el = el;
    BalanceOperationsView.__super__.constructor.call(this);
  }

  BalanceOperationsView.prototype.setIntervalWithContext = function(code, delay, context) {
    return setInterval(function() {
      return code.call(context);
    }, delay);
  };

  BalanceOperationsView.prototype.initialize = function() {
    this.listenTo(window.activeObjects, 'changeActiveAccount', this.reload);
    return this.setIntervalWithContext(this.updateTimer, 1000, this);
  };

  BalanceOperationsView.prototype.render = function() {
    this.$el.html(require("./templates/balance_operations_empty"));
    $("#balance-column-right").niceScroll();
    $("#balance-column-right").getNiceScroll().onResize();
    return this;
  };

  BalanceOperationsView.prototype.checkAccount = function(event) {
    var button, url, view;
    event.preventDefault();
    button = $(event.target);
    view = this;
    if (!this.inUse) {
      console.log("Checking account ...");
      view.inUse = true;
      button.html("checking...");
      return $.ajax({
        url: url = "bankaccounts/retrieveOperations/" + this.model.get("id"),
        type: "GET",
        success: function() {
          var _ref, _ref1, _ref2;
          if ((_ref = view.model) != null) {
            _ref.url = "bankaccounts/" + ((_ref1 = view.model) != null ? _ref1.get("id") : void 0);
          }
          return (_ref2 = view.model) != null ? _ref2.fetch({
            success: function() {
              console.log("... checked");
              button.html("checked");
              view.inUse = false;
              return view.reload(view.model);
            },
            error: function() {
              console.log("... there was an error fetching");
              button.html("error...");
              return view.inUse = false;
            }
          }) : void 0;
        },
        error: function(err) {
          console.log("... there was an error checking");
          console.log(err);
          button.html("error...");
          return view.inUse = false;
        }
      });
    }
  };

  BalanceOperationsView.prototype.updateTimer = function() {
    var model;
    if (this.model != null) {
      model = this.model;
      return this.$("span.last-checked").html("Last checked " + (moment(moment(model.get("lastChecked"))).fromNow()) + ". ");
    }
  };

  BalanceOperationsView.prototype.reload = function(account) {
    var view;
    view = this;
    this.model = account;
    this.$el.html(this.templateHeader({
      model: account
    }));
    window.collections.operations.reset();
    window.collections.operations.setAccount(account);
    window.collections.operations.fetch({
      success: function(operations) {
        var operation, _i, _len, _ref;
        view.$("#table-operations").html("");
        view.$(".loading").remove();
        _ref = operations.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          operation = _ref[_i];
          view.$("#table-operations").append(view.templateElement({
            model: operation
          }));
        }
        if (!$.fn.DataTable.fnIsDataTable(this.$("table.table"))) {
          $('table.table').dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": true,
            "bSort": true,
            "bInfo": false,
            "bAutoWidth": false,
            "bDestroy": true,
            "aoColumns": [
              {
                "sType": "date-euro"
              }, null, null
            ]
          });
        }
        $("#balance-column-right").niceScroll();
        return $("#balance-column-right").getNiceScroll().onResize();
      },
      error: function() {
        return console.log("error fetching operations");
      }
    });
    return this;
  };

  return BalanceOperationsView;

})(BaseView);

});

require.register("views/bank_subtitle", function(exports, require, module) {
var BankSubTitleView, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = BankSubTitleView = (function(_super) {
  __extends(BankSubTitleView, _super);

  BankSubTitleView.prototype.template = require('./templates/balance_bank_subtitle');

  function BankSubTitleView(model) {
    this.model = model;
    BankSubTitleView.__super__.constructor.call(this);
  }

  BankSubTitleView.prototype.events = {
    "click .row": "chooseAccount"
  };

  BankSubTitleView.prototype.initialize = function() {
    this.listenTo(this.model, 'change', this.render);
    return this.listenTo(window.activeObjects, 'changeActiveAccount', this.checkActive);
  };

  BankSubTitleView.prototype.chooseAccount = function(event) {
    console.log("Account chosen: " + this.model.get("title"));
    return window.activeObjects.trigger("changeActiveAccount", this.model);
  };

  BankSubTitleView.prototype.checkActive = function(account) {
    this.$(".row").removeClass("active");
    if (account === this.model) {
      return this.$(".row").addClass("active");
    }
  };

  return BankSubTitleView;

})(BaseView);

});

require.register("views/bank_title", function(exports, require, module) {
var BankTitleView, BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = BankTitleView = (function(_super) {
  __extends(BankTitleView, _super);

  BankTitleView.prototype.template = require('./templates/balance_bank_title');

  function BankTitleView(model) {
    this.model = model;
    BankTitleView.__super__.constructor.call(this);
  }

  BankTitleView.prototype.initialize = function() {
    this.listenTo(this.model, 'change', this.update);
    this.listenTo(this.model.accounts, "add", this.update);
    this.listenTo(this.model.accounts, "destroy", this.update);
    this.listenTo(this.model.accounts, "request", this.displayLoading);
    return this.listenTo(this.model.accounts, "change", this.hideLoading);
  };

  BankTitleView.prototype.displayLoading = function() {
    return this.$(".bank-title-loading").show();
  };

  BankTitleView.prototype.hideLoading = function() {
    return this.$(".bank-title-loading").hide();
  };

  BankTitleView.prototype.update = function() {
    this.model.set("amount", this.model.accounts.getSum());
    this.$(".bank-amount").html(Number(this.model.get('amount')).money());
    if (this.model.accounts.length === 0) {
      this.$(".bank-title").hide();
      this.$(".bank-balance").hide();
    } else {
      this.$(".bank-title").show();
      this.$(".bank-balance").show();
    }
    return this.$(".bank-title-loading").hide();
  };

  BankTitleView.prototype.render = function() {
    BankTitleView.__super__.render.call(this);
    this.update();
    return this;
  };

  return BankTitleView;

})(BaseView);

});

require.register("views/mockup", function(exports, require, module) {
var AppView, BaseView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = AppView = (function(_super) {
  __extends(AppView, _super);

  function AppView() {
    _ref = AppView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AppView.prototype.template = require('./templates/mockup_balance');

  AppView.prototype.el = 'body.application';

  AppView.prototype.afterRender = function() {
    return $('.content-right-column').niceScroll();
  };

  return AppView;

})(BaseView);

});

require.register("views/navbar", function(exports, require, module) {
var BaseView, NavbarView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = NavbarView = (function(_super) {
  __extends(NavbarView, _super);

  function NavbarView() {
    _ref = NavbarView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  NavbarView.prototype.template = require('./templates/navbar');

  NavbarView.prototype.el = 'div#navbar';

  NavbarView.prototype.initialize = function() {
    this.listenTo(window.collections.banks, "change", this.refreshOverallBalance);
    this.listenTo(window.collections.banks, 'destroy', this.refreshOverallBalance);
    this.listenTo(window.collections.banks, 'update', this.refreshOverallBalance);
    return this.listenTo(window.collections.banks, 'reset', this.refreshOverallBalance);
  };

  NavbarView.prototype.refreshOverallBalance = function() {
    var sum;
    sum = window.collections.banks.getSum();
    console.log("recalculating the overall balance: " + sum);
    return $("span#total-amount").html(sum.money());
  };

  return NavbarView;

})(BaseView);

});

require.register("views/new_bank", function(exports, require, module) {
var BankAccessModel, BaseView, NewBankView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

BankAccessModel = require('../models/bank_access');

module.exports = NewBankView = (function(_super) {
  __extends(NewBankView, _super);

  function NewBankView() {
    _ref = NewBankView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  NewBankView.prototype.template = require('./templates/new_bank');

  NewBankView.prototype.el = 'div#add-bank-window';

  NewBankView.prototype.events = {
    'click #btn-add-bank-save': "saveBank"
  };

  NewBankView.prototype.saveBank = function(event) {
    var bankAccess, button, data, oldText, view;
    event.preventDefault();
    view = this;
    button = $(event.target);
    console.log(button);
    oldText = button.html();
    button.addClass("disabled");
    button.html(window.i18n("verifying") + "<img src='./loader_green.gif' />");
    button.removeClass('btn-warning');
    button.addClass('btn-success');
    this.$(".message-modal").html("");
    data = {
      login: $("#inputLogin").val(),
      password: $("#inputPass").val(),
      bank: $("#inputBank").val()
    };
    bankAccess = new BankAccessModel(data);
    return bankAccess.save(data, {
      success: function(model, response, options) {
        var bank;
        button.html(window.i18n("sent") + " <img src='./loader_green.gif' />");
        bank = window.collections.banks.get(data.bank);
        if (bank != null) {
          console.log("Fetching for new accounts in bank" + bank.get("name"));
          bank.accounts.trigger("loading");
          bank.accounts.fetch();
        }
        $("#add-bank-window").modal("hide");
        button.removeClass("disabled");
        button.html(oldText);
        window.activeObjects.trigger("new_access_added_successfully", model);
        return setTimeout(500, function() {
          return $("#add-bank-window").modal("hide");
        });
      },
      error: function(model, xhr, options) {
        console.log("Error :" + xhr);
        button.html(window.i18n("error_check_credentials_btn"));
        button.removeClass('btn-success');
        button.removeClass('disabled');
        button.addClass('btn-warning');
        return this.$(".message-modal").html("<div class='alert alert-danger'>" + window.i18n("error_check_credentials") + "</div>");
      }
    });
  };

  NewBankView.prototype.getRenderData = function() {
    return {
      banks: window.collections.banks.models
    };
  };

  return NewBankView;

})(BaseView);

});

require.register("views/search", function(exports, require, module) {
var BalanceOperationsView, BaseView, SearchBankView, SearchView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

SearchBankView = require('./search_bank');

BalanceOperationsView = require("./balance_operations");

module.exports = SearchView = (function(_super) {
  __extends(SearchView, _super);

  function SearchView() {
    _ref = SearchView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SearchView.prototype.template = require('./templates/balance');

  SearchView.prototype.el = 'div#content';

  SearchView.prototype.elAccounts = '#balance-column-left';

  SearchView.prototype.elOperations = '#balance-column-right';

  SearchView.prototype.accounts = 0;

  SearchView.prototype.initialize = function() {
    return this.listenTo(window.activeObjects, "new_access_added_successfully", this.noMoreEmpty);
  };

  SearchView.prototype.noMoreEmpty = function() {
    var _ref1, _ref2;
    console.log("no more empty");
    if ((_ref1 = this.$(".arrow")) != null) {
      _ref1.hide();
    }
    return (_ref2 = this.$(".loading")) != null ? _ref2.hide() : void 0;
  };

  SearchView.prototype.render = function() {
    var treatment, view;
    SearchView.__super__.render.call(this);
    this.operations = new BalanceOperationsView(this.$(this.elOperations));
    this.operations.render();
    view = this;
    treatment = function(bank, callback) {
      var viewBank;
      viewBank = new SearchBankView(bank);
      $(view.elAccounts).append(viewBank.el);
      return bank.accounts.fetch({
        success: function(col) {
          callback(null, col.length);
          return viewBank.render();
        },
        error: function(col, err, opts) {
          callback(null, col.length);
          return viewBank.$el.html("");
        }
      });
    };
    async.concat(window.collections.banks.models, treatment, function(err, results) {
      if (err) {
        console.log(err);
        alert(window.i18n("error_loading_accounts"));
      }
      this.accounts = results.length;
      $("#balance-column-left").niceScroll();
      $("#balance-column-left").getNiceScroll().onResize();
      if (this.accounts === 0) {
        return $(view.elAccounts).prepend(require("./templates/balance_banks_empty"));
      }
    });
    return this;
  };

  return SearchView;

})(BaseView);

});

require.register("views/search_bank", function(exports, require, module) {
var BaseView, SearchBankSubTitleView, SearchBankTitleView, SearchBankView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

SearchBankTitleView = require('./search_bank_title');

SearchBankSubTitleView = require('./search_bank_subtitle');

module.exports = SearchBankView = (function(_super) {
  __extends(SearchBankView, _super);

  SearchBankView.prototype.className = 'bank';

  SearchBankView.prototype.events = {
    "change .choice-bank": "bankChosen",
    "change .choice-account": "accountChosen"
  };

  function SearchBankView(bank) {
    this.bank = bank;
    SearchBankView.__super__.constructor.call(this);
  }

  SearchBankView.prototype.initialize = function() {
    this.listenTo(this.bank.accounts, "add", this.addOne);
    return this.listenTo(this.bank.accounts, "destroy", this.render);
  };

  SearchBankView.prototype.bankChosen = function(event) {
    var enabled;
    enabled = this.$(event.target).prop("checked");
    console.log("[Search] " + this.bank.get("name") + ": " + enabled);
    $.each(this.$("input[type=checkbox].choice-account"), function(index, element) {
      return $(element).prop("checked", enabled);
    });
    this.bank.checked = true;
    return window.collections.banks.trigger("search-update-accounts");
  };

  SearchBankView.prototype.addOne = function(account) {
    var viewAccount;
    viewAccount = new SearchBankSubTitleView(account);
    account.view = viewAccount;
    return this.$el.append(viewAccount.render().el);
  };

  SearchBankView.prototype.render = function() {
    var account, _i, _len, _ref;
    this.viewTitle = new SearchBankTitleView(this.bank);
    this.$el.html(this.viewTitle.render().el);
    this.viewTitle = null;
    this.sum = 0;
    _ref = this.bank.accounts.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      account = _ref[_i];
      this.addOne(account);
    }
    return this;
  };

  return SearchBankView;

})(BaseView);

});

require.register("views/search_bank_subtitle", function(exports, require, module) {
var BaseView, SearchBankSubTitleView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = SearchBankSubTitleView = (function(_super) {
  __extends(SearchBankSubTitleView, _super);

  SearchBankSubTitleView.prototype.template = require('./templates/search_bank_subtitle');

  function SearchBankSubTitleView(model) {
    this.model = model;
    SearchBankSubTitleView.__super__.constructor.call(this);
  }

  SearchBankSubTitleView.prototype.events = {
    "change .choice-account": "accountChosen"
  };

  SearchBankSubTitleView.prototype.accountChosen = function(event) {
    var enabled;
    enabled = this.$(event.target).prop("checked");
    console.log("[Search] " + this.model.get("title") + ": " + enabled);
    this.model.checked = true;
    return window.collections.banks.trigger("search-update-accounts");
  };

  SearchBankSubTitleView.prototype.initialize = function() {
    return this.listenTo(this.model, 'change', this.render);
  };

  return SearchBankSubTitleView;

})(BaseView);

});

require.register("views/search_bank_title", function(exports, require, module) {
var BaseView, SearchBankTitleView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = SearchBankTitleView = (function(_super) {
  __extends(SearchBankTitleView, _super);

  SearchBankTitleView.prototype.template = require('./templates/search_bank_title');

  function SearchBankTitleView(model) {
    this.model = model;
    SearchBankTitleView.__super__.constructor.call(this);
  }

  SearchBankTitleView.prototype.initialize = function() {
    this.listenTo(this.model.accounts, "add", this.update);
    this.listenTo(this.model.accounts, "destroy", this.update);
    this.listenTo(this.model.accounts, "request", this.displayLoading);
    return this.listenTo(this.model.accounts, "change", this.hideLoading);
  };

  SearchBankTitleView.prototype.displayLoading = function() {
    return this.$(".bank-title-loading").show();
  };

  SearchBankTitleView.prototype.hideLoading = function() {
    return this.$(".bank-title-loading").hide();
  };

  SearchBankTitleView.prototype.update = function() {
    if (this.model.accounts.length === 0) {
      this.$(".bank-title").hide();
      this.$(".bank-title-checkbox").hide();
    } else {
      this.$(".bank-title").show();
      this.$(".bank-title-checkbox").show();
    }
    return this.$(".bank-title-loading").hide();
  };

  SearchBankTitleView.prototype.render = function() {
    SearchBankTitleView.__super__.render.call(this);
    this.update();
    return this;
  };

  return SearchBankTitleView;

})(BaseView);

});

require.register("views/templates/accounts", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row content-background"><div class="col-lg-12 content-right-column"></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/accounts_bank", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>' + escape((interp = model.get("name")) == null ? '' : interp) + '<a class="btn btn-cozy pull-right delete-bank">' + escape((interp = window.i18n("accounts_delete_bank")) == null ? '' : interp) + '</a></h2><table class="table-accounts table table-striped table-hover table-bordered"><tbody id="account-container"></tbody></table>');
}
return buf.join("");
};
});

require.register("views/templates/accounts_bank_account", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<td class="account-title">' + escape((interp = model.get("title")) == null ? '' : interp) + '</td><td class="operation-amount"><span class="pull-right"></span><a class="btn btn-small btn-cozy pull-right delete-account">' + escape((interp = window.i18n("accounts_delete_account")) == null ? '' : interp) + '</a></td>');
}
return buf.join("");
};
});

require.register("views/templates/app", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- navigation bar--><div id="navbar" class="navbar navbar-fixed-top navbar-inverse"></div><!-- modal window to add a new bank--><div id="add-bank-window" class="modal"></div><!-- content--><div id="content" class="container"></div>');
}
return buf.join("");
};
});

require.register("views/templates/balance", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row content-background"><div id="balance-column-left" class="col-lg-4 content-left-column"></div><div id="balance-column-right" class="col-lg-8 content-right-column"></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/balance_bank_subtitle", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row accounts-sub"><div class="col-lg-7"><p class="pull-left">' + escape((interp = model.get('title')) == null ? '' : interp) + '</p></div><div class="col-lg-5"><p class="pull-right">' + escape((interp = Number(model.get('amount')).money()) == null ? '' : interp) + ' <span class="euro-sign">&euro;</span></p></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/balance_bank_title", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row accounts-top"><div class="col-lg-7"><p class="pull-left"> <span class="bank-title-loading"><img src="./loader.gif"/></span><span class="bank-title"> ' + escape((interp = model.get('name')) == null ? '' : interp) + '</span></p></div><div class="col-lg-5"><p class="pull-right bank-balance"><span class="bank-amount">' + escape((interp = Number(model.get('amount')).money()) == null ? '' : interp) + ' </span><span class="euro-sign"> &euro;</span></p></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/balance_banks_empty", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p class="arrow text-right"><img src="images/arrow_vertical.png"/></p><p class="loading">' + escape((interp = window.i18n("balance_banks_empty")) == null ? '' : interp) + '</p>');
}
return buf.join("");
};
});

require.register("views/templates/balance_operations_element", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( (model.get("amount") > 0))
{
buf.push('<tr class="success"><td class="operation-date">' + escape((interp = new Date(model.get('date')).dateString()) == null ? '' : interp) + '</td><td class="operation-title">' + escape((interp = model.get('title')) == null ? '' : interp) + '</td><td class="operation-amount"><span class="pull-right">' + escape((interp = Number(model.get('amount')).money()) == null ? '' : interp) + '</span></td></tr>');
}
else
{
buf.push('<tr><td class="operation-date">' + escape((interp = new Date(model.get('date')).dateString()) == null ? '' : interp) + '</td><td class="operation-title">' + escape((interp = model.get('title')) == null ? '' : interp) + '</td><td class="operation-amount"><span class="pull-right">' + escape((interp = Number(model.get('amount')).money()) == null ? '' : interp) + '</span></td></tr>');
}
}
return buf.join("");
};
});

require.register("views/templates/balance_operations_empty", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<br/><br/><p class="loading">' + escape((interp = window.i18n("balance_please_choose_account")) == null ? '' : interp) + '</p>');
}
return buf.join("");
};
});

require.register("views/templates/balance_operations_header", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>' + escape((interp = model.get("title")) == null ? '' : interp) + '</h2><p><span class="last-checked">Last checked ' + escape((interp = moment(moment(model.get("lastChecked"))).fromNow()) == null ? '' : interp) + '. </span><a class="recheck-button btn-link">recheck now</a></p><div class="text-center loading loader-operations"><img src="./loader_big_blue.gif"/></div><table class="table tablesorter table-striped table-hover"><thead><tr><th class="text-left">' + escape((interp = window.i18n("header_date")) == null ? '' : interp) + '</th><th class="text-center">' + escape((interp = window.i18n("header_title")) == null ? '' : interp) + '</th><th class="text-right">' + escape((interp = window.i18n("header_amount")) == null ? '' : interp) + '</th></tr></thead><tbody id="table-operations"></tbody></table>');
}
return buf.join("");
};
});

require.register("views/templates/mockup_balance", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="navbar navbar-fixed-top navbar-inverse"><div class="container"><button type="button" data-toggle="collapse" data-target=".nav-collapse" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Cozy PFM</span><div class="nav-collapse collapse"><ul class="nav navbar-nav"><li class="active"><a id="menu-pos-balance" href="#">Balance</a></li><li><a id="menu-pos-accounts" href="#accounts">Accounts</a></li><li><a id="menu-pos-new-bank" data-toggle="modal" href="#add-bank-window">Add a new bank</a></li></ul><ul class="nav navbar-nav pull-right"><p class="navbar-text">overall balance <span id="total-amount">+12967.72</span></p></ul></div></div></div><div id="content" class="container"><div class="row content-background"><div class="col-lg-4 content-left-column"><div class="row accounts-top"><div class="col-lg-8"><p class="pull-left">Le Crédit Lyonnais</p></div><div class="col-lg-4"><p class="pull-right">+12942.23 <span class="euro-sign">&euro;</span></p></div></div><div class="row accounts-sub"><div class="col-lg-8"><p class="pull-left">Compte bancaire</p></div><div class="col-lg-4"><p class="pull-right">+12942.23 <span class="euro-sign">&euro;</span></p></div></div><div class="row accounts-top active"><div class="col-lg-8"><p class="pull-left">Société Générale</p></div><div class="col-lg-4"><p class="pull-right">+25.49 <span class="euro-sign">&euro;</span></p></div></div><div class="row accounts-sub"><div class="col-lg-8"><p class="pull-left">Compte bancaire 1</p></div><div class="col-lg-4"><p class="pull-right">+26.49 <span class="euro-sign">&euro;</span></p></div></div><div class="row accounts-sub"><div class="col-lg-8"><p class="pull-left">Compte bancaire 2</p></div><div class="col-lg-4"><p class="pull-right">-1.00 <span class="euro-sign">&euro;</span></p></div></div></div><div class="col-lg-8 content-right-column"><h2>Société Générale</h2><table id="table-operations" class="table table-striped table-hover"><tbody><tr><td class="operation-date">17/07/2013</td><td class="operation-title">Ferrari Paris</td><td class="operation-amount"><span class="pull-right">-490550.00</span></td></tr><tr class="success"><td class="operation-date">17/07/2013</td><td class="operation-title">CB Tesco</td><td class="operation-amount"><span class="pull-right positive-balance">+123.30</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-12.90</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">Ferrari Paris</td><td class="operation-amount"><span class="pull-right">-490550.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Apple</td><td class="operation-amount"><span class="pull-right">- 1899.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-1.23</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-25.39</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-0.12</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">Ferrari Paris</td><td class="operation-amount"><span class="pull-right">-490550.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Apple</td><td class="operation-amount"><span class="pull-right">- 1899.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-1.23</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-25.39</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-0.12</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Apple</td><td class="operation-amount"><span class="pull-right">- 1899.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-1.23</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-25.39</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-0.12</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">Ferrari Paris</td><td class="operation-amount"><span class="pull-right">-490550.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Apple</td><td class="operation-amount"><span class="pull-right">- 1899.00</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-1.23</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-25.39</span></td></tr><tr><td class="operation-date">17/07/2013</td><td class="operation-title">CB Intermarché</td><td class="operation-amount"><span class="pull-right">-0.12</span></td></tr></tbody></table></div></div><div id="add-bank-window" class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h4 class="modal-title">Add a new bank</h4></div><div class="modal-body"><form><fieldset><legend>Bank</legend><div class="form-group"><select class="form-control"><option>Le Crédit Lyonnais</option><option>Société Générale</option></select></div></fieldset><fieldset><legend>Credentials</legend><div class="form-group"><label for="inputLogin">Login</label><input id="inputLogin" type="text" placeholder="enter login" class="form-control"/></div><div class="form-group"><label for="inputPass">Password</label><input id="inputPass" type="password" placeholder="enter password" class="form-control"/></div></fieldset></form><h3 class="important-notice">Security notice</h3><p>In order to protect our customers, we implemented the best solutions.</p><p>We are great, because ...</p></div><div class="modal-footer"><a data-dismiss="modal" href="#" class="btn btn-link">cancel</a><a href="#" class="btn btn-success">Verify & Save</a></div></div></div></div><!--.row#foot<div class="col-lg-12"><p class="text-muted">Click here to read about <a href="#">our highest security standards</a></p><p class="text-muted pull-right"><a href="http://cozycloud.cc">CozyCloud.cc </a>- the cloud you own.</p></div>--></div>');
}
return buf.join("");
};
});

require.register("views/templates/modal_confirm", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="confirmation-dialog" class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h4 class="modal-title">' + escape((interp = title) == null ? '' : interp) + '</h4></div><div class="modal-body"><p> \n' + escape((interp = body) == null ? '' : interp) + '</p></div><div class="modal-footer"><a data-dismiss="modal" href="#" class="btn btn-link">' + escape((interp = window.i18n("cancel")) == null ? '' : interp) + '</a><a id="confirmation-dialog-confirm" href="#" class="btn btn-cozy">' + escape((interp = confirm) == null ? '' : interp) + '</a></div></div></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/navbar", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><button type="button" data-toggle="collapse" data-target=".nav-collapse" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Cozy PFM</span><div class="nav-collapse collapse"><ul class="nav navbar-nav"><li class="menu-position menu-1"><a id="menu-pos-balance" href="#">' + escape((interp = window.i18n("menu_balance")) == null ? '' : interp) + '</a></li><li class="menu-position menu-2"><a id="menu-pos-accounts" href="#accounts">' + escape((interp = window.i18n("menu_accounts")) == null ? '' : interp) + '</a></li><li class="menu-position menu-3"><a id="menu-pos-accounts" href="#search">' + escape((interp = window.i18n("menu_search")) == null ? '' : interp) + '</a></li><li><a id="menu-pos-new-bank" data-toggle="modal" href="#add-bank-window">' + escape((interp = window.i18n("menu_add_bank")) == null ? '' : interp) + '</a></li></ul><ul class="nav navbar-nav pull-right"><p class="navbar-text">' + escape((interp = window.i18n("overall_balance")) == null ? '' : interp) + ' <span id="total-amount">0,00</span></p></ul></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/new_bank", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h4 class="modal-title">' + escape((interp = window.i18n("menu_add_bank")) == null ? '' : interp) + '</h4></div><div class="modal-body"><div class="message-modal"></div><form><fieldset><legend>' + escape((interp = window.i18n("add_bank_bank")) == null ? '' : interp) + '</legend><div class="form-group"><select id="inputBank" class="form-control">');
// iterate banks
;(function(){
  if ('number' == typeof banks.length) {

    for (var $index = 0, $$l = banks.length; $index < $$l; $index++) {
      var bank = banks[$index];

buf.push('<option');
buf.push(attrs({ 'value':(bank.get("id")) }, {"value":true}));
buf.push('>');
var __val__ = bank.get("name")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</option>');
    }

  } else {
    var $$l = 0;
    for (var $index in banks) {
      $$l++;      var bank = banks[$index];

buf.push('<option');
buf.push(attrs({ 'value':(bank.get("id")) }, {"value":true}));
buf.push('>');
var __val__ = bank.get("name")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</option>');
    }

  }
}).call(this);

buf.push('</select></div></fieldset><fieldset><legend>' + escape((interp = window.i18n("add_bank_credentials")) == null ? '' : interp) + '</legend><div class="form-group"><label for="inputLogin">' + escape((interp = window.i18n("add_bank_login")) == null ? '' : interp) + '</label><input');
buf.push(attrs({ 'id':('inputLogin'), 'type':('text'), 'placeholder':(window.i18n("add_bank_login_placeholder")), "class": ('form-control') }, {"type":true,"placeholder":true}));
buf.push('/></div><div class="form-group"><label for="inputPass">' + escape((interp = window.i18n("add_bank_password")) == null ? '' : interp) + '</label><input');
buf.push(attrs({ 'id':('inputPass'), 'type':('password'), 'placeholder':(window.i18n("add_bank_password_placeholder")), "class": ('form-control') }, {"type":true,"placeholder":true}));
buf.push('/></div></fieldset></form><h3 class="important-notice"> \n' + escape((interp = window.i18n("add_bank_security_notice")) == null ? '' : interp) + '</h3><p> \n' + escape((interp = window.i18n("add_bank_security_notice_text")) == null ? '' : interp) + '</p></div><div class="modal-footer"><a data-dismiss="modal" href="#" class="btn btn-link">' + escape((interp = window.i18n("add_bank_cancel")) == null ? '' : interp) + '</a><a id="btn-add-bank-save" href="#" class="btn btn-success">' + escape((interp = window.i18n("add_bank_ok")) == null ? '' : interp) + '</a></div></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/search_bank_subtitle", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row accounts-sub"><div class="col-lg-7"><p class="pull-left">' + escape((interp = model.get('title')) == null ? '' : interp) + '</p></div><div class="col-lg-5"><p class="pull-right"><input type="checkbox" class="choice-account"/></p></div></div>');
}
return buf.join("");
};
});

require.register("views/templates/search_bank_title", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row accounts-top"><div class="col-lg-7"><p class="pull-left"> <span class="bank-title-loading"><img src="./loader.gif"/></span><span class="bank-title"> ' + escape((interp = model.get('name')) == null ? '' : interp) + '</span></p></div><div class="col-lg-5"><p class="pull-right bank-title-checkbox"><input type="checkbox" class="choice-bank"/></p></div></div>');
}
return buf.join("");
};
});


//@ sourceMappingURL=app.js.map