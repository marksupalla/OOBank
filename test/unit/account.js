/*jshint expr:true*/
/*global describe, it*/

'use strict';


var expect = require('chai').expect;
var Account = require('../../app/models/account');

describe('Account', function(){
  describe('constructor', function(){
    it('should create an account with Name, Type, Amount with Deposits and Withdrawls', function(){
      var account1= new Account(3,'Sarah', 'Savings', 1500);
      expect(account1).to.be.instanceof(Account);
      expect(account1.accNum).to.equal(3);
      expect(account1.name).to.equal('Sarah');
      expect(account1.type).to.equal('Savings');
      expect(account1.balance).to.equal(1500);
      expect(account1.deposits).to.have.length(0);
      expect(account1.withdrawals).to.have.length(0);
    });
  });

  describe('#deposit',function(){
    it('should add deposit to balance', function(){
      var account1= new Account(3,'Sarah', 'Savings', 1500);
      account1.deposit(5000);
      expect(account1.balance).to.equal(6500);
    });
  });

  describe('#withdraw',function(){
    it('should subtract deposit from balance', function(){
      var account1= new Account(3,'Sarah', 'Savings', 5000);
      account1.withdraw(3000);
      expect(account1.balance).to.equal(2000);
    });
  });

  describe('#withdraw',function(){
    it('should subtract fee when overdrawn',function(){
      var account1= new Account(3,'Sarah', 'Savings', 1500);
      account1.withdraw(1600);
      expect(account1.balance).to.equal(-150);
    });
  });

  describe('#withdraw',function(){
    it('should suspend account if withdrawn over 3 times',function(){
      var account1= new Account(3,'Sarah', 'Savings', 1500);
      account1.fees.length = 3;
      account1.withdraw(1600);
      expect(account1.isSuspended).to.be.true;
    });
  });
});
