function com(itmes, amount, val){
  if(amount===0){
    return [val];
  }
  if(itmes.length===0){
    return [];
  }
  var p = com(itmes.slice(1), amount-1, val.concat(itmes[0]));
  var o = com(itmes.slice(1), amount, val);
  return o.concat(p);
}
var inp = Array.from({length: 52}, (x,i) => i);
var hands=com(inp,5,[]);
var ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for(var x=0; x<hands.length; x++){
  var z=calculateHand(hands[x]);
  ans[z[0]]+=1;
}
console.log(ans.slice(1));

function calculateHand(cards){
  var bit =1;
  var hand=[0, 0, 0, 0];
  for (var i=0; i<cards.length; i++){
    if (cards[i]===52){
      continue;
    }
    hand[Math.floor(cards[i]/13)] |= (bit<<cards[i]%13);
  }
  var fl = likeSute(hand);
  var mul = multiplicity(hand);
  if(straightFlush(fl)){
    return straightFlush(fl);
  }
  if(Quads(mul)){
    return Quads(mul);
  }
  if(fullHouse(mul)){
    return fullHouse(mul);
  }
  if(flush(fl)){
    return flush(fl);
  }
  if(straight(hand)){
    return straight(hand);
  }
  if(trips(mul)){
    return trips(mul);
  }
  if(twoPair(mul)){
    return twoPair(mul);
  }
  if(pair(mul)){
    return pair(mul);
  }
  return highCard(mul);
}

function didWin(playersHand, dealersHand){
  var count = Math.min(playersHand.length, dealersHand.length);
  for(var i=0;i<count;i++){
    if(playersHand[i]>dealersHand[i]){
      return 'w';
    }else if(playersHand[i]<dealersHand[i]){
      return 'l';
    }
  }
  return 't';
}

function likeSute(hand){
  var bit =1;
  for (var i=0;i<4;i++){
    var total = 0;
    for (var o=0;o<13;o++){
      if(hand[i] & (bit<<o)){
        total++;
      }
    }
    if (total>=5){
      return hand[i];
    }
  }
  return 0;
}

function straightHelper(hand){
  var st = 7936;//bitmask of 10-A straight
  var weel = 4111;//bitmask of A-5 straight
  for (var i=0;i<9;i++){
    if((st>>i & hand)===(st>>i)){
      return 10-i;
    }
  }
  if((weel & hand)===weel){
      return 1;
  }
  return 0;
}

function multiplicity(hand){
  var bit = 1;
  var mul = Array(13).fill(0);
  for(var i=0;i<13;i++){
    for(var o=0;o<4;o++){
      if(bit<<i & hand[o]){
        mul[i] +=1;
      }
    }
  }
  return mul;
}

function straightFlush(fl){
  if(!fl){
    return 0;
  }
  var st=straightHelper(fl);//check for Straight Flush
  if(st){
    if(st===10){
      return [10, "Royal Flush"];
    }else if(st>0 && st<10){
      return [9, "Straight Flush", st];
    }else{
      throw "unknownHandError";
    }
  }
  return 0;
}

function Quads(mul){
  for(var i=12;i>=0;i--){
    if(mul[i]===4){
      for(var o=12;o>=0;o--){
        if(i!==o && mul[o]>0){
          return [8, "Quads", i, o];
        }
      }
    }
  }
  return 0;
}

function fullHouse(mul){
  for(var i=12;i>=0;i--){
    if(mul[i]===3){
      for(var o=12;o>=0;o--){
        if(i!==o && mul[o]>=2){
          return [7, "Full House", i, o];
        }
      }
    }
  }
  return 0;
}

function flush(fl){
  if(!fl){
    return 0;
  }
  var bit = 1;
  var ans = [6, "Flush"];
  for(var i=12;i>=0;i--){
    if(bit<<i & fl){
      ans.push(i);
      if(ans.length===7){
        return ans;
      }
    }
  }
}

function straight(hand){
  var ans = [5, "Straight"];
  var cards = (hand[0] | hand[1] | hand[2] | hand[3]);
  if(straightHelper(cards)){
    ans.push(straightHelper(cards));
    return ans;
  }
  return 0;
}

function trips(mul){
  for(var i=12;i>=0;i--){
    if(mul[i]===3){
      var ans = [4, "Trips", i];
      for(var o=12;o>=0;o--){
        if(i!==o && mul[o]>0){
          ans.push(o);
          if(ans.length===5){
            return ans;
          }
        }
      }
      return ans;
    }
  }
  return 0;
}

function twoPair(mul){
  for(var i=12;i>=0;i--){
    if(mul[i]===2){
      for(var o=i-1;o>=0;o--){
        if(mul[o]===2){
          for(var p=12;p>=0;p--){
            if(i!==p && o!==p && mul[p]>0){
              return [3, "Two Pair", i, o, p];
            }
          }
        }
      }
    }
  }
  return 0;
}

function pair(mul){
  for(var i=12;i>=0;i--){
    if(mul[i]===2){
      var ans = [2, "Pair", i];
      for(var o=12;o>=0;o--){
        if(i!==o && mul[o]>0){
          ans.push(o);
          if(ans.length===6){
            return ans;
          }
        }
      }
      return ans;
    }
  }
  return 0;
}

function highCard(mul){
  var ans = [1, "High Card"];
  for(var i=12;i>=0;i--){
    if(mul[i]>0){
      ans.push(i);
      if(ans.length===7){
        break;
      }
    }
  }
  return ans;
}
