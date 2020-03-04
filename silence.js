//Trump tweets dataset from https://www.kaggle.com/austinreese/trump-tweets/data
let table;
let tweet;
let tweets = [];
let synth;

function preload(){
  table = loadTable("trumptweets.csv", "csv", "header");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<table.getRowCount(); i++){
    let date = table.getRow(i).get("date").slice(0,10);
    let time = table.getRow(i).get("date").slice(11,16);
    tweet = table.getRow(i).get("content");
    word = tweet.split(" ");
    result = [];
    //console.log(word);
    //for(let j=0; i<word.length; j++){
      //console.log(word[j]);
      // if(word[j] != null){
      //   if(!word[j].includes("http")){
      //     result.push(word[j]);
      //   }
      // }
      //result.push(word[j]);
    //}
    //word = result;

    tweets[i] = {
      date: date,
      time: time,
      tweet: tweet,
      word: word,
      // wordsLength: getWordLengths(tweet),
      // haveSilence: haveSilence(tweet),
    }
    // console.log(haveSilence(tweet))
  }
  // console.log(tweets);
  frameRate(20);

  synth = new Tone.Synth().toMaster();
}

function windowResized(){
  canvas = resizeCanvas(windowWidth, windowHeight);
}

// function getWordLengths(str){
//   let len = [];
//   let words = str.split(" ");
//   // console.log(words);
//   for (let i=0; i < words.length; i++){
//     len.push(words[i].length);
//   }
//   return len;
// }
//
// function haveSilence(str){
//   let haveSilence = [];
//   let words = str.toLowerCase().split(" ");
//
//   if (words.includes("silence")){
//     console.log("yes")
//     haveSilence.push("yes");
//     // haveSilence.push(yes)
//   } else {
//     // console.log("no")
//     haveSilence.push("no");
//   }
// }

let i = 0;
function draw(){
background(21, 18, 169);
textAlign(CENTER);
textSize(16);
  // for (let i=0; i<1; i++){
  //  for(let j=0; j< tweets[0].word.length; j++){
  //    console.log(tweets[0].word[2]);
  //    if(tweets[i].word[j] == "be" || tweets[i].word[j] == "Be" || tweets[i].word[j] =="BE"){
  //      fill(0);
  //      text(tweets[i].word[j], width/2, (j+1)*30);
  //    } else {
  //      fill(255, 0, 0);
  //      text(tweets[i].word[j], width/2, (j+1)*30);
  //    }
  //  }
  // }

  if (i<tweets.length){
    for(let j=0; j< tweets[0].word.length; j++){
      fill(138, 142, 158);
      text(tweets[j].date, random(width), height/2-130);
      text(tweets[j].time, random(width), height/2-100);
      if(tweets[i].word[j] == "silence" || tweets[i].word[j] == "Silence" || tweets[i].word[j] =="SILENCE"){
        fill(255, 255, 255);
        text(tweets[i].word[j], width/2, (j+1)*28);
        synth.triggerAttackRelease("C4", "32n");
      } else {

        let theWord = tweets[i].word[j];
        if (theWord != undefined && !theWord.includes("http") && !theWord.includes(".com")){
          noStroke();
          fill(220, 0, 0);
          text(tweets[i].word[j], width/2, (j+1)*28);
          // console.log(tweets[i].word[j].length)
          rectMode(CENTER);
          if(!tweets[i].word[j]){
            // rect(width/2, (j+1)*30, 30, 22)
          } else {
            rect(width/2, (j+1)*28-5, tweets[i].word[j].length*11, 18)
          }

        }



      }
    }
  } i++;
}
