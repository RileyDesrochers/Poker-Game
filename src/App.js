import React, { Component } from 'react';
import './App.css';

function Card(props) {
  if(props.id>=52||props.id<0){
    return (
        <button className="card"><p className="unknownCardPrint">?</p></button>
    );
  }

  var type;
  var sute=["",''];

  if(props.id<13){
    sute[0]="heart";
    sute[1]='\u2665';//Heart
  }else if(props.id<26){
    sute[0]="club";
    sute[1]='\u2663';//Club
  }else if(props.id<39){
    sute[0]="diamond";
    sute[1]='\u2666';//Diamond
  }else{
    sute[0]="spade";
    sute[1]='\u2660';//Spade
  }

  switch(props.id%13) {
    case 12:
      type="A";
    break;
    case 11:
      type="K";
    break;
    case 10:
      type="Q";
    break;
    case 9:
      type="J";
    break;
    default:
      type=parseInt(props.id%13+2, 10);
  }

  return (
    <button className={"card " + sute[0]}><p className="print" align="left">{type}</p> <p className="print" align="right">{sute[1]}</p></button>
  );
}

class GameBoard extends React.Component {
  render() {

        var show = ["", "hide", "hide", "hide", "hide"];

        var showPlay = "hide";
        if (this.props.game.play===0 && this.props.game.gamePhase!==0 && this.props.game.gamePhase!==4){
          showPlay = "";
        }

        var display = ["", "4X", "2X", "1X", ""];

        var nextText;
        if (this.props.game.gamePhase===0){
          nextText = "Start!";
        }else if(this.props.game.gamePhase===3){
          if(this.props.game.play===0){
            nextText = "Fold";
          }else{
            nextText = "See Showdown!";
          }
        }else if(this.props.game.gamePhase===4){
          nextText = "See winnings";
        }else{
          nextText = "Next";
        }

        var playersHand;
        if(this.props.game.playersHand===0){
          playersHand="";
        }else{
          playersHand=": "+this.props.game.playersHand[1];
        }

        var dealersHand;
        if(this.props.game.dealersHand===0){
          dealersHand="";
        }else{
          dealersHand=": "+this.props.game.dealersHand[1];
        }

    return (
      <div className="gameBoard">
        <div id="dealersCards">
          <h2>Dealers Cards{dealersHand}</h2>
          <table>
            <tbody>
              <tr>
                <th><Card id={this.props.game.dealersCards[0]} /></th>
                <th><Card id={this.props.game.dealersCards[1]} /></th>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div id="communityCard">
          <h2>Community Card</h2>
          <table>
            <tbody>
              <tr>
                <th><Card id={this.props.game.communityCards[0]} /></th>
                <th><Card id={this.props.game.communityCards[1]} /></th>
                <th><Card id={this.props.game.communityCards[2]} /></th>
                <th><Card id={this.props.game.communityCards[3]} /></th>
                <th><Card id={this.props.game.communityCards[4]} /></th>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div id="yourHand">
          <h2>Your Hand{playersHand}</h2>
          <table>
            <tbody>
              <tr>
                <th><Card id={this.props.game.playerCards[0]} /></th>
                <th><Card id={this.props.game.playerCards[1]} /></th>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <h2>wallet: {this.props.game.wallet}</h2>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th><p><b>Trips</b></p></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th><input id="trips" type="number" className={"inp "+ show[this.props.game.gamePhase]}></input></th>
              <th><button className={show[this.props.game.gamePhase]} onClick={() => this.props.onClick("trips")}>place bet</button></th>
              <th><button className="bettingSquere">{this.props.game.trips}</button></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th><p><b>Ante</b></p></th>
              <th></th>
              <th><p><b>Blind</b></p></th>
            </tr>
            <tr>
              <th><input id="ante" type="number" className={"inp "+ show[this.props.game.gamePhase]}></input></th>
              <th><button className={show[this.props.game.gamePhase]} onClick={() => this.props.onClick("ante")}>place bet</button></th>
              <th><button className="bettingSquere" >{this.props.game.ante}</button></th>
              <th><b>=</b></th>
              <th><button className="bettingSquere" >{this.props.game.blind}</button></th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th><p><b>Play</b></p></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th><p className={showPlay}><b>{display[this.props.game.gamePhase]}</b></p></th>
              <th><button className={showPlay} onClick={() => this.props.onClick("play")}>place bet</button></th>
              <th><button className="bettingSquere" >{this.props.game.play}</button></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tbody>
        </table>
        <br />
        <button onClick={() => this.props.onClick("start")}>{nextText}</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: Array.from({length: 52}, (x,i) => i),
      dealersCards: [52,52],
      dealersHand: 0,
      communityCards: [52,52,52,52,52],
      playerCards: [52,52],
      playersHand: 0,
      gamePhase: 0,
      wallet: 1000,
      trips: 0,
      ante: 0,
      blind: 0,
      play: 0,
    };
  }

  handleClick(type) {// sperate into handles
    var state = this.state;
    var val,dif,input;
    if(type==="trips"){
      if(state.gamePhase!==0){
        return;
      }
      val = parseInt(document.getElementById(type).value, 10);
      if(Number.isNaN(val)||val<0){
        alert("please enter a positive integer in the input field");
        return;
      }
      if(this.canBet(val, state.trips)){
        dif = val - state.trips;
        state.wallet -= dif;
        state.trips = val;
        this.setState(state);
      }
    }

    else if(type==="ante"){
      if(state.gamePhase!==0){
        return;
      }
      val = parseInt(document.getElementById(type).value, 10);
      if(Number.isNaN(val)||val<=0){
        alert("please enter a positive integer in the input field");
        return;
      }
      if(this.canBet(val*2, state.ante)){
        dif = val*2 - state.ante*2;
        state.wallet -= dif;
        state.ante = val;
        state.blind = val;
        this.setState(state);
      }
    }

    else if(type==="play"){
      if(state.play!==0 || state.gamePhase===0){
        return;
      }
      switch (state.gamePhase) {
        case 0:
          return;
        case 1:
          val = state.ante*4;
          break;
        case 2:
          val = state.ante*2;
          break;
        case 3:
          val = state.ante;
          break;
        case 4:
          return;
        default:
          throw "unknownGamePhase";
      }
      if(this.canBet(val, state.play)){
        dif = val - state.play;
        state.wallet -= dif;
        state.play = val;
        this.setState(state);
      }
    }

    else if(type==="start"){
      switch (state.gamePhase){
        case 0:
          if(state.ante<=0){
            alert("you need to place an Ante/Blind bet first");
            return;
          }else if(state.wallet < state.ante*3){
            alert("You won't be able to play the game properly please lower your Ante bet")
            return;
          }else if(state.wallet < state.ante*6){
            if (confirm("warning you won't be able to place the full 4X Ante bet, would you like to continue?")===false){
              return;
            }
          }
          state.gamePhase = 1;
          state.deck = shuffle(state.deck);
          state.playerCards[0] = state.deck[51];
          state.playerCards[1] = state.deck[50];
          state.deck = state.deck.slice(0,50);
          state.playersHand = calculateHand(state.playerCards.concat(state.communityCards));
          break;
        case 1:
          state.gamePhase = 2;
          state.deck = shuffle(state.deck);
          state.communityCards[0] = state.deck[49];
          state.communityCards[1] = state.deck[48];
          state.communityCards[2] = state.deck[47];
          state.deck = state.deck.slice(0,47);
          state.playersHand = calculateHand(state.playerCards.concat(state.communityCards));
          break;
        case 2:
          state.gamePhase = 3;
          state.deck = shuffle(state.deck);
          state.communityCards[3] = state.deck[46];
          state.communityCards[4] = state.deck[45];
          state.deck = state.deck.slice(0,45);
          state.playersHand = calculateHand(state.playerCards.concat(state.communityCards));
          break;
        case 3:
          state.gamePhase = 4;
          state.deck = shuffle(state.deck);
          state.dealersCards[0] = state.deck[44];
          state.dealersCards[1] = state.deck[43];
          state.dealersHand = calculateHand(state.dealersCards.concat(state.communityCards));
          break;
        case 4:
          var alertMsg = "";
          var win = didWin(state.playersHand, state.dealersHand);
          if(state.play===0){
            win='f';
          }
          if(win==='w'){
            state.wallet += state.play*2;
            alertMsg = "You won " + state.play + " on your Play squere!\n";
            if(state.dealersHand[0]>1){
              state.wallet += state.ante*2;
              alertMsg += "Dealer has a pair or better so you win your Ante\n";
            }else{
              state.wallet += state.ante;
              alertMsg += "Dealer did not qulify but you get to keep your Ante\n";
            }
            switch (state.playersHand[0]){
              case 5:
                state.wallet += state.ante*2;
                alertMsg += "You have a Straight! Blind pays 1X, you win " + state.ante + "\n";
                break;
              case 6:
                state.wallet += state.ante*2;
                alertMsg += "You have a Flush! Blind pays 1X, you win " + state.ante*1.5 + "\n";
                break;
              case 7:
                state.wallet += state.ante*4;
                alertMsg += "You have a Full House! Blind pays 3X, you win " + state.ante*3 + "\n";
                break;
              case 8:
                state.wallet += state.ante*13;
                alertMsg += "You have Quads! Blind pays 12X, you win " + state.ante*10 + "\n";
                break;
              case 9:
                state.wallet += state.ante*51;
                alertMsg += "You have a Straight Flush! Blind pays 50X, you win " + state.ante*50 + "\n";
                break;
              case 10:
                state.wallet += state.ante*501;
                alertMsg += "You have a Royal Flush!!! Blind pays 500X, you win " + state.ante*500 + "\n";
                break;
              default:
                state.wallet += state.ante;
                alertMsg += "You do not have a strong hand however you get your Blind back\n";
            }
          }else if(win==='l'){
            alertMsg = "You lost\n";
          }else if(win==='t'){
            state.wallet += state.play+state.ante*2;
            alertMsg = "You tied the dealer so you get back your Play, Ante, and Blind bet\n";
          }else{
            alertMsg = "You Folded\n";
          }
          switch (state.playersHand[0]){
            case 4:
              state.wallet += state.trips*4;
              alertMsg += "You have Three of a kind! Trips pays 3X, you win " + state.trips*3 + "\n";
              break;
            case 5:
              state.wallet += state.trips*6;
              alertMsg += "Trips pays 5X, on your Straight you win " + state.trips*5 + "\n";
              break;
            case 6:
              state.wallet += state.trips*7;
              alertMsg += "Trips pays 6X, on your Flush you win " + state.trips*6 + "\n";
              break;
            case 7:
              state.wallet += state.trips*9;
              alertMsg += "Trips pays 8X, on your Full House you win " + state.trips*8 + "\n";
              break;
            case 8:
              state.wallet += state.trips*31;
              alertMsg += "Trips pays 30X, on your Quads you win " + state.trips*30 + "\n";
              break;
            case 9:
              state.wallet += state.trips*41;
              alertMsg += "Trips pays 40X, on your Straight Flush you win " + state.trips*40 + "\n";
              break;
            case 10:
              state.wallet += state.trips*51;
              alertMsg += "Trips pays 50X, on your Royal Flush you win " + state.trips*50 + "\n";
              break;
            default:
              alertMsg += "You do not have a strong hand so you lose your Trips bet\n";
          }
          alert(alertMsg);
          state.deck = Array.from({length: 52}, (x,i) => i);
          state.dealersCards = [52,52];
          state.dealersHand = 0;
          state.communityCards = [52,52,52,52,52];
          state.playerCards = [52,52];
          state.playersHand = 0;
          state.gamePhase = 0;
          state.trips = 0;
          state.ante = 0;
          state.blind = 0;
          state.play = 0;
          this.setState(state);
          break;
        default:
          return;
      }
      this.setState(state);
    }
  }

  canBet(betAmount, curVal){
    if((betAmount - curVal) > this.state.wallet){
      alert("You dont have enough money for this!");
      return false;
    }

    return true;
  }

  render() {
    return (//todo: sanitize input, add calculate winner function
      <div align="center">
        <h1>ultimate texas holdem!</h1>
        <div align="center" class="grid">
          <div>
            <GameBoard game={this.state} onClick={i => this.handleClick(i)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;


function shuffle(deck){
  for (var x=0;x<10;x++){
    for (var i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck=deck.reverse();
  }
  return deck;
}


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
