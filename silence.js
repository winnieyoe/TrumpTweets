//Trump tweets dataset from https://www.kaggle.com/austinreese/trump-tweets/data
let table;
let canvas;
let twitterNotification;
let tweet;
let tweets = [];
let synth;
let input = document.getElementById("inputWord");
let inputWord = "silence";
let submitForm = document.getElementById("form");
let wordCount = document.getElementById("wordCount");
let allCount = document.getElementById("allCount");
let count = 0;

function preload(){
  table = loadTable("trumptweets.csv", "csv", "header");
  soundFormats('mp3', 'ogg');
  twitterNotification = loadSound('assets/twitter.mp3');
}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent("visual");

  for (let i=0; i<table.getRowCount(); i++){
    let date = table.getRow(i).get("date").slice(0,10);
    let time = table.getRow(i).get("date").slice(11,16);
    tweet = table.getRow(i).get("content");
    word = tweet.split(" ").filter( (w) => w!==undefined && w.length > 0 ); //left: input of function, right: output of function

    tweets[i] = {
      date: date,
      time: time,
      tweet: tweet,
      word: word,
      // wordsLength: getWordLengths(tweet),
      // haveSilence: haveSilence(tweet),
    }
  }
  frameRate(10);

  synth = new Tone.Synth().toMaster();
}

function windowResized(){
  canvas = resizeCanvas(windowWidth, windowHeight);
}

submitForm.onsubmit = function(e){
  e.preventDefault();
  inputWord = input.value;
  alert("Searching for '" + inputWord.toUpperCase() + "' in Trump Tweets");
  count = 0;
}

let i = 0;
function draw(){
background(21, 18, 169);
textAlign(CENTER);
textSize(16);

  if (i<tweets.length){
    for(let j=0; j< tweets[i].word.length; j++){
      fill(138, 142, 158);
      text(tweets[j].date, random(width), height/2-130);
      text(tweets[j].time, random(width), height/2-100);
      if(tweets[i].word[j].toLowerCase() == inputWord.toLowerCase()){
        fill(255, 255, 255);
        text(tweets[i].word[j], width/2, (j+1)*28);
        // synth.triggerAttackRelease("C4", "32n");
        twitterNotification.play();
        count++;
      } else {
        let theWord = tweets[i].word[j];
        if (theWord != undefined && !theWord.includes("http") && !theWord.includes(".com")){
          noStroke();
          fill(220, 0, 0);
          text(tweets[i].word[j], windowWidth/2, (j+1)*28);
          // console.log(tweets[i].word[j].length)
          if(!tweets[i].word[j]){
            // rect(width/2, (j+1)*30, 30, 22)
          } else {
            rectMode(CENTER);
            rect(windowWidth/2, (j+1)*28-5, tweets[i].word[j].length*12, 18)
          }
        }
      }
    }
  } i++;
  allCount.innerHTML = i;
  wordCount.innerHTML = count;
}
