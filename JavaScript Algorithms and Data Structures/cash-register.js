/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {

  for(let i=0;i<cid.length;i++) {
    cid[i][1] = Number((cid[i][1]).toFixed(2))
  }

  let totalCash = Number((cid.reduce((a,b) => a+b[1],0)).toFixed(2));
  let change = Number((cash - price).toFixed(2));

  let moneyVals = {
      "PENNY": {
        value: Number((0.01).toFixed(2)),
        stock: Number((cid[0][1]/0.01).toFixed(2)),
      },
      "NICKEL": {
        value: Number((0.05).toFixed(2)),
        stock: Number((cid[1][1]/0.05).toFixed(2)),
      },
      "DIME": {
        value: Number((0.10).toFixed(2)),
        stock: Number((cid[2][1]/0.10).toFixed(2)),
      },
      "QUARTER": {
        value: Number((0.25).toFixed(2)),
        stock: Number((cid[3][1]/0.25).toFixed(2)),
      },
      "ONE": {
        value: 1,
        stock: Number((cid[4][1]/1).toFixed(2)),
      },
      "FIVE": {
        value: 5,
        stock: Number((cid[5][1]/5).toFixed(2)),
      },
      "TEN": {
        value: 10,
        stock: Number((cid[6][1]/10).toFixed(2)),
      },
      "TWENTY": {
        value: 20,
        stock: Number((cid[7][1]/20).toFixed(2)),
      },
      "ONE HUNDRED": {
        value: 100,
        stock: Number((cid[8][1]/100).toFixed(2)),
      },
    }

  //Get right coin
  let coinsUsed = [];

  for(let objects in moneyVals){
    if(moneyVals[objects]["value"] == change) {
      coinsUsed.push(Object.keys(objects), moneyVals[objects]["value"]);
    }
  }

  let runningCash = 0;
  if (coinsUsed.length == 0) {
    for(let i=cid.length-1, stock=moneyVals[cid[i][0]].stock; i >= 0; i--) {
      stock = moneyVals[cid[i][0]].stock
      if(moneyVals[cid[i][0]].value > change) {
        continue;
      } else {
        while(stock > 0 && Number((runningCash).toFixed(2)) + Number((moneyVals[cid[i][0]].value).toFixed(2)) <= change + 0.000005) { //Compensating for bad floats
          runningCash += Number((moneyVals[cid[i][0]].value).toFixed(2));
          runningCash = Number((runningCash).toFixed(2));
          stock--;
        }
        coinsUsed.push([cid[i][0], parseFloat((cid[i][1]-(stock*moneyVals[cid[i][0]].value).toFixed(2)).toFixed(2))])
      }
    }
  }

  if (totalCash - runningCash == 0) {
    coinsUsed=coinsUsed.filter(a => a[1] != 0.00);
    outer: for (let coins in moneyVals) {
      for(let money of coinsUsed) {
        if(coins == money[0]){
          continue outer;
        }
      }
      coinsUsed.push([coins, 0])
    }
  } else if(runningCash == change) {
    coinsUsed=coinsUsed.filter(a => a[1] != 0.00);
  } else {
    coinsUsed = undefined;
  }

  

  console.log(runningCash)

  if(change > totalCash || coinsUsed == undefined){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else {
    let returnObj = {status: "", change: coinsUsed};
    if(totalCash - runningCash == 0) {
      returnObj.status = "CLOSED";
    } else {
      returnObj.status = "OPEN";
    }

    return returnObj;
  }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
