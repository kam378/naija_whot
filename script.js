const cards = [
  {
    number : "1",
    shape : "rectangle"
  },
  {
    number : "2",
    shape : "rectangle"
  },
  {
    number : "3",
    shape : "rectangle"
  },
  {
    number : "4",
    shape : "rectangle"
  },
  {
    number : "5",
    shape : "rectangle"
  },
  {
    number : "7",
    shape : "rectangle"
  },
  {
    number : "8",
    shape : "rectangle"
  },
  {
    number : "10",
    shape : "rectangle"
  },
  {
    number : "11",
    shape : "rectangle"
  },
  {
    number : "13",
    shape : "rectangle"
  },
  {
    number : "14",
    shape : "rectangle"
  },
  {
    number : "1",
    shape : "circle"
  },
  {
    number : "2",
    shape : "circle"
  },
  {
    number : "3",
    shape : "circle"
  },
  {
    number : "4",
    shape : "circle"
  },
  {
    number : "5",
    shape : "circle"
  },
  {
    number : "7",
    shape : "circle"
  },
  {
    number : "8",
    shape : "circle"
  },
  {
    number : "10",
    shape : "circle"
  },
  {
    number : "11",
    shape : "circle"
  },
  {
    number : "13",
    shape : "circle"
  },
  {
    number : "14",
    shape : "circle"
  },
  {
    number : "1",
    shape : "diamond"
  },
  {
    number : "2",
    shape : "diamond"
  },
  {
    number : "3",
    shape : "diamond"
  },
  {
    number : "4",
    shape : "diamond"
  },
  {
    number : "5",
    shape : "diamond"
  },
  {
    number : "7",
    shape : "diamond"
  },
  {
    number : "8",
    shape : "diamond"
  },
  {
    number : "10",
    shape : "diamond"
  },
  {
    number : "11",
    shape : "diamond"
  },
  {
    number : "13",
    shape : "diamond"
  },
  {
    number : "14",
    shape : "diamond"
  },
  {
    number : "1",
    shape : "plus"
  },
  {
    number : "2",
    shape : "plus"
  },
  {
    number : "3",
    shape : "plus"
  },
  {
    number : "4",
    shape : "plus"
  },
  {
    number : "5",
    shape : "plus"
  },
  {
    number : "7",
    shape : "plus"
  },
  {
    number : "8",
    shape : "plus"
  },
  {
    number : "10",
    shape : "plus"
  },
  {
    number : "11",
    shape : "plus"
  },
  {
    number : "13",
    shape : "plus"
  },
  {
    number : "14",
    shape : "plus"
  },
  {
    number : "1",
    shape : "hollow"
  },
  {
    number : "2",
    shape : "hollow"
  },
  {
    number : "3",
    shape : "hollow"
  },
  {
    number : "4",
    shape : "hollow"
  },
  {
    number : "7",
    shape : "hollow"
  },
  {
    number : "8",
    shape : "hollow"
  },
  {
    number : "10",
    shape : "hollow"
  },
  {
    number : "11",
    shape : "hollow"
  },
  {
    number : "13",
    shape : "hollow"
  },
  {
    number : "14",
    shape : "hollow"
  },
]

let canPlay = true;

let player = document.getElementById("player");
let playedDeck = document.getElementById("played");

let playerCards;

let shuffled = [];

let playerDeck = [];

let opponentDeck = [];

let opponentMore = document.getElementById("more");

let played = [];

let market = [];

const marketElement = document.getElementById("market");

const start = () => {

  shuffled = [];

  playerDeck = [];

  opponentDeck = [];

  played = [];

  market = [];

  shuffle();

  share();

  updatePlayerCards();

  updateCompCards();  

  updatePlayed();
}

// to get the players current cards and add eventlisteners for click when called
const updateEventListeners = () => {
  playerCards.forEach(card => {
    card.addEventListener("click", () => {
      // call the play function when any of the cards are clicked
      if (canPlay) {
        play(card.id);
      }
    })
  })
}

const goMarket = (userDeck) => {
  let marketCard = market[0];
  console.log(marketCard);
  
  userDeck.push(marketCard);
  market.shift();
}

const scheduleCompPlay = () => {
  canPlay = false;
  setTimeout(() => {
    compPlay();
  }, 2000);
}

marketElement.addEventListener("click", () => {  
  if (canPlay) {
    if (market.length < 5){
      updateMarket()
    }
    goMarket(playerDeck);
    updatePlayerCards();  
    scheduleCompPlay();
  }
})

const getRandomCard = (num = 54) => {
  let number = Math.floor(Math.random() * num);
  return number;
}

const shuffle = (deck = cards, length = 54, into = shuffled) => {

  for (let index = 0; index < deck.length; index++){
    let cardNumber = 0;

    do {
      cardNumber = getRandomCard(length);
    } while (into.includes(deck[cardNumber]));

    into.push(deck[cardNumber]);
  }

}

const updateMarket = () => {
  console.log("updating market");
  
  let nextCards = played.slice(2);
  played.splice(2)


  shuffle(nextCards, nextCards.length, market);
  

}

const share = () => {

  for (let index = 0; index < 10; index++) {
    
    if (index % 2 == 0){
      playerDeck.push(shuffled[0]);      
      shuffled.shift();
    }
    else{
      opponentDeck.push(shuffled[0]);
      shuffled.shift();
    }
    
  }



  played.push(shuffled[0]);
  shuffled.splice(0, 1);
  for (let index = 0; index < shuffled.length; index++) {
    market.push(shuffled[index]);
  }
  shuffled.splice(0, 43);
  

}

const updatePlayerCards = () => {
  let innerhtml = ``;

  playerDeck.forEach(card => {
    let html = `<div class="card pcard" id="${card.shape}-${card.number}" >
            <div class="top-number">${card.number}</div>
            <div class="shape">
              <div class="${card.shape}"></div>
            </div>
            <div class="bottom-number">${card.number}</div>
          </div>`;
    innerhtml += html;
  })

  if (playerDeck.length > 5) {
    innerhtml += `<div class="next">+${playerDeck.length-5}</div>`
  }

  player.innerHTML = innerhtml;

  playerCards = document.querySelectorAll(".pcard");
  updateEventListeners();

}

const updateCompCards = () => {
  let innerhtml = ``;    

  if (opponentDeck.length > 3) {
    for (let i = 0; i < 3; i++) {
      let html = `<div class="card-back"></div>`;
      innerhtml += html;

      opponentMore.innerHTML = `+${opponentDeck.length - 3}`;

    }
  }
  else{
    for (let i = 0; i < opponentDeck.length; i++) {
      let html = `<div class="card-back"></div>`;

      innerhtml += html;

    }
    opponentMore.innerHTML = "";
  }

  let opponentCards = document.getElementById("opponent");

  opponentCards.innerHTML = innerhtml;

}

const updatePlayed = () => {

  let playedLast = played[0];

  playedDeck.innerHTML = `<div class="card">
            <div class="top-number">${playedLast.number}</div>
            <div class="shape">
              <div class="${playedLast.shape}"></div>
            </div>
            <div class="bottom-number">${playedLast.number}</div>
          </div>`;


  playerCards = document.querySelectorAll(".pcard");

}

const checkCardMatch = (arr) => {

  let lastPlayed = played[0];

  return arr[0] == lastPlayed.shape || arr[1] == lastPlayed.number

}

const checkCompWin = () => {
  if (opponentDeck.length == 0){
    alert("Computer Wins!!");
    start();

  }
}

const compPlay = () => {

  canPlay = false;

  let match = [];

  opponentDeck.forEach(card => {

    let lastPlayed = played[0];

    if (card.number == lastPlayed.number || card.shape == lastPlayed.shape) {
      match.push(card);
    }

  })
  
  if (match.length == 0){
    goMarket(opponentDeck);
    updateCompCards();
  }
  else{
    let index = Math.floor(Math.random() * match.length);

    for (let i = 0; i < opponentDeck.length; i++) {     
      
      if (opponentDeck[i].number == match[index].number && opponentDeck[i].shape == match[index].shape){

        if(opponentDeck[i].number == "1"){
          played.unshift(opponentDeck[i]);
          opponentDeck.splice(i, 1);
          updatePlayed();
          updateCompCards();
          setTimeout(() => {
            compPlay();
          }, 2000);
          checkCompWin();
          return;
        }

        if(opponentDeck[i].number == "2"){
          played.unshift(opponentDeck[i]);
          opponentDeck.splice(i, 1);
          for(let i = 0; i < 2; i++){
            playerDeck.push(market[0]);
            market.splice(0, 1);
          }
          updatePlayerCards()
          updatePlayed();
          updateCompCards();
          setTimeout(() => {
            compPlay();
          }, 2000);
          checkCompWin();
          return;
        }

        if(opponentDeck[i].number == "14"){
          played.unshift(opponentDeck[i]);
          opponentDeck.splice(i, 1);
          playerDeck.push(market[0]);
          market.splice(0, 1);
          updatePlayerCards()
          updatePlayed();
          updateCompCards();
          setTimeout(() => {
            compPlay();
          }, 2000);
          checkCompWin();
          return;
        }
        
        played.unshift(opponentDeck[i]);
        opponentDeck.splice(i, 1);
        updatePlayed();
        updateCompCards();
        break;  
      }      
    }

    checkCompWin()

    if (market.length < 5){
      updateMarket()
    }

  }

  canPlay = true;

}

const checkWin = () => {
  if (playerDeck.length == 0){
    alert("You Win!!");
    start();
  }
}

const play = (id) => {
  let cardInfo = id.split("-");
  
  let cardMatch = checkCardMatch(cardInfo);
  


  if (cardMatch) {

    for (let i = 0; i < playerDeck.length; i++) {     
      console.log(playerDeck[i]);
      if (playerDeck[i].number == cardInfo[1] && playerDeck[i].shape == cardInfo[0]){

        if (playerDeck[i].number == "1"){
          played.unshift(playerDeck[i]);
          playerDeck.splice(i, 1);
          updatePlayed();
          updatePlayerCards();
          checkWin()
          if (market.length < 5){
            updateMarket()
          }
          return
        }

        if (playerDeck[i].number == "2"){
          for(let i = 0; i < 2; i++){
            opponentDeck.push(market[0]);
            market.splice(0, 1);
          }
          updateCompCards();
          played.unshift(playerDeck[i]);
          playerDeck.splice(i, 1);
          updatePlayed();
          updatePlayerCards();
          checkWin()
          if (market.length < 5){
            updateMarket()
          }
          return;
        }

        if(playerDeck[i].number == "14"){
          opponentDeck.push(market[0]);
          market.splice(0, 1);  
          updateCompCards();
          played.unshift(playerDeck[i]);
          playerDeck.splice(i, 1);
          updatePlayed();
          updatePlayerCards();
          checkWin()
          if (market.length < 5){
            updateMarket()
          }
          return;        
        }

        played.unshift(playerDeck[i]);
        playerDeck.splice(i, 1);
        updatePlayed();
        updatePlayerCards();
        break;  
      }      
    }

    checkWin()

    scheduleCompPlay();

    if (market.length < 5){
      updateMarket()
    }

  }


  
  return;
  
}

//wait till html Dom is ready
document.addEventListener("DOMContentLoaded", () => {

  shuffle();

  share();

  updatePlayerCards();

  updateCompCards();  

  updatePlayed();
 
})