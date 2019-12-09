import React, { Component } from 'react';
import './App.css';

export function Card(props) {
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
