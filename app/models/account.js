'use strict';

function Account(accNum,name,type,deposit){
  this.accNum = accNum;
  this.name = name;
  this.type = type;
  this.balance = parseInt(deposit);
  this.deposits = [];
  this.withdrawals = [];
  this.fees = [];
  this.isSuspended = false;
}

Account.prototype.deposit = function(amount){
  if(this.isSuspended){
    return;
  }
  this.balance += amount;
  this.deposits.push(amount);
};

Account.prototype.withdraw = function(amount){
  if(this.isSuspended){
    return;
  }
  this.balance -= amount;
  this.withdrawals.push(amount);
  if (this.balance < 0){
    this.balance -= 50;
    this.fees.push(50);
    if(this.fees.length >= 3){
      this.isSuspended = true;
    }
  }
};




module.exports = Account;

