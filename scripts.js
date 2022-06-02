// DOM CREATION 
// Image Array
let cardArray;
let card__wrapper = document.querySelector(".card__wrapper");
let startgame__btn = document.querySelector(".startgame__btn");


let imgArr = [
    "./images/img1.JPG",
    "./images/img2.JPG",
    "./images/img3.JPG",
    "./images/img4.JPG"
];

let backsideURL = "./images/backside.JPG";
// Card Class
function Card (id,src){
    this.id = id;
    this.src = src;
}

// Create Objects
function createCardObjects(){
    let cards= [];
    for(var i = 0;i <imgArr.length;i++){
        let newCard = new Card(i+1,imgArr[i],false);
        cards.push(newCard);
        cards.push(newCard);
    }
    return cards;
}

 // Return a Shuffled Array
 function shuffle() {
    let array = createCardObjects();
    let currentIndex = array.length,randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


function createCards (cardsArr){
    cardsArr.forEach(function(e){
       let cardDiv = document.createElement("div");
       cardDiv.dataset.id = e.id;
       cardDiv.addEventListener('click',flip);
       cardDiv.classList.add('card');
       cardDiv.style.backgroundImage = "url("+backsideURL+")";
       card__wrapper.append(cardDiv);
   })
}

startgame__btn.addEventListener('click',startGame);
function startGame (){
    card__wrapper.innerHTML = "";
    cardArray = shuffle();
    createCards(cardArray);
}


// The Game 
let score = 0;
let isThereAFlipCard = false;
let firstCard,secondCard;
let selectOtherCards = false;
let data_id,cardObjects,cardObj;
function flip (){
    if(!selectOtherCards)
    {

    // Get the object 
    data_id = Number(this.getAttribute('data-id')); // Element ID
    cardObjects = cardArray.filter(obj => { // Card Object
    return obj.id === data_id;
  })
   cardObj = cardObjects[0];



  this.style.backgroundImage = "url("+cardObj.src+")";
  if(this === firstCard) return; // to stop the same card from matching it self if clicked again
  if (!isThereAFlipCard){
    // first click
    isThereAFlipCard = true;
    firstCard = this;
  }
  else {
      //second click
      secondCard = this;

      // matching
      if(firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id')){
            // if the two cards match
            firstCard.removeEventListener('click',flip);
            secondCard.removeEventListener('click',flip);
            score++; 
            reset();  
            if(score == 4){
                alert("congratulation you have won");
                playAgain();
            }
           
      }
      else {
          selectOtherCards = true;
          setTimeout(() => {
              firstCard.style.backgroundImage = "url("+backsideURL+")";
              secondCard.style.backgroundImage = "url("+backsideURL+")";
              reset();
          }, 250);
      }
  }
}
}

function reset(){
    selectOtherCards = false;
    isThereAFlipCard = false;
    secondCard = null;
    firstCard = null;
}


function playAgain(){
    let start = confirm("Play Again?");
    score = 0;
    start ? startGame(): card__wrapper.innerHTML = "";
}