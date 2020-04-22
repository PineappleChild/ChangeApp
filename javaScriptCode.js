function getVal(){
 let txt = document.getElementById('txt').value;
 txt = cashSplit(txt);
 txt = txt.join(" ");
 document.getElementById("output").innerHTML = txt;
}
function cashSplit(input){
  if(input < 0 || input > 999.99){
    let txt = document.getElementById('txt').value;
    document.getElementById("output").innerHTML = "Please enter a positive number under 1000";
  }else{
    let splited = input;
    const storeArr = [];
    //bills
    if(floorLarge(splited) % 100 === 0){
      let hunVal = floorLarge(splited)/100;
      storeArr.push("HundredBill: " + hunVal);
      splited = splited - (hunVal*100);
    }
    //reduced the total by fifties
    for (let index = 0; index < 5; index++) {
      if((floorLarge(splited)- 10 * index) % 50 === 0){
        let fifthVal = (floorLarge(splited)- 10 * index)/50;
        storeArr.push("FiftyBill: " + fifthVal);
        splited = splited - (fifthVal*50);
      }
    }
    //reduced total by twenties
    if(splited === 20){
      storeArr.push("TwentyBill: " + 1);
      splited = splited - (20);
    }else{
      for (let index = 0; index < 2; index++) {
        if((floorLarge(splited) - (index * 10)) % 20 === 0){
          let twentyVal = (floorLarge(splited) - (index * 10))/20;
          storeArr.push("TwentyBill: " + twentyVal);
          splited = splited - (twentyVal*20);
        }
      }
    }
    //reduced total by tens
    if(floorLarge(splited) % 10 === 0){
      let tenVal = floorLarge(splited)/10;
      storeArr.push("TenBill: " + tenVal);
      splited = splited - (tenVal*10);
    }
    //reduced total by fives
    for (let index = 0; index < 5; index++) {
      if((floorLarge(splited) - index) % 5 == 0){
        let fiveVal = (floorLarge(splited) - index)/5;
        storeArr.push("FiveBill: " + fiveVal);
        splited = splited - (fiveVal*5);
      }
    }
    //total ones
    if(floorLarge(splited) < 5){
      let oneVal = floorLarge(splited);
      storeArr.push("OneBill: " + oneVal);
      splited = hundredth(splited - (oneVal));
    }
    //coins
    if((splited < 1 && splited >= 0.01)){
      if (splited >= 0.75 && splited < 1) {
        storeArr.push("Quarter:" + 3);
        splited = hundredth(splited - (0.75));
      }else if(splited >= 0.50 && splited < 0.75){
        storeArr.push("Quarter:" + 2);
        splited = hundredth(splited - (0.50));
      }else if(splited >= 0.25 && splited < 0.50){
        storeArr.push("Quarter:" + 1);
        splited = hundredth(splited - (0.25));
      }
      if(splited >= 0.20){
        storeArr.push("Dime: " + 2);
        splited = hundredth(splited - (0.20));
      }else if (splited >= 0.10) {
        storeArr.push("Dime: " + 1);
        splited = hundredth(splited - (0.10));
      }
      if(splited < 0.10 && splited > 0.04){
        storeArr.push("Nickle: " + 1);
        splited = hundredth(splited - (0.05));
      }
      if (splited < 0.05) {
        let pennies = splited * 100;
        storeArr.push("Pennies: " + pennies);
        splited = 0;
      }
    }
    return storeArr;
  }
}
//rounds down any number eg: 450 => 400 , 524.34 => 500 , 23.32 => 20 
function floorLarge(input){
  let lengthIn = Math.floor(input).toString().length - 1;
  let val1 = input/(Math.pow(10, lengthIn));
  val1 = Math.floor(val1);
  return val1 * Math.pow(10, lengthIn);
}
function floorMin(input){
  let lengthIn = input * 100;
  lengthIn = floorLarge(lengthIn);
  return lengthIn/100;
}
function hundredth(x) {
  return Number.parseFloat(x).toFixed(2);
}

