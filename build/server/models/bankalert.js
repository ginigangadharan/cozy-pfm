// Generated by CoffeeScript 1.8.0
var BankAlert, americano;

americano = require('americano');

module.exports = BankAlert = americano.getModel('bankalert', {
  bankAccount: String,
  type: String,
  frequency: String,
  limit: Number,
  order: String
});

BankAlert.all = function(callback) {
  return BankAlert.request("all", callback);
};

BankAlert.allFromBankAccount = function(account, callback) {
  var params;
  params = {
    key: account.id
  };
  return BankAlert.request("allByBankAccount", params, callback);
};

BankAlert.allByAccountAndType = function(accountID, type, callback) {
  var params;
  params = {
    key: [accountID, type]
  };
  return BankAlert.request("allByBankAccountAndType", params, callback);
};

BankAlert.allReportsByFrequency = function(frequency, callback) {
  var params;
  params = {
    key: ["report", frequency]
  };
  return BankAlert.request("allReportsByFrequency", params, callback);
};

BankAlert.destroyByAccount = function(id, callback) {
  return BankAlert.requestDestroy("allByBankAccount", {
    key: id
  }, callback);
};

BankAlert.prototype.testTransaction = function(operation) {
  var alertLimit, amount;
  if (this.type !== "transaction") {
    return false;
  } else {
    alertLimit = Number(this.limit);
    amount = Math.abs(operation.amount);
    return (this.order === "lt" && amount <= alertLimit) || (this.order === "gt" && amount >= alertLimit);
  }
};

BankAlert.prototype.testBalance = function(account) {
  var alertLimit, balance;
  if (this.type !== "balance") {
    return false;
  } else {
    alertLimit = Number(this.limit);
    balance = account.getBalance();
    return (this.order === "lt" && balance <= alertLimit) || (this.order === "gt" && balance >= alertLimit);
  }
};
