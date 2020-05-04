window.onload = function(){

var cards = document.querySelectorAll('.card');
//set cards to undefined originally
var cardOne;
var cardTwo;
var lockDeck = false;
var flipped = false;
var matches = 0;

var clicks = document.getElementById('score');
clicks.innerText = 0;
var restart = document.getElementById('restart');

function flip(){

    if (lockDeck){
        return;
    }

event.currentTarget.classList.add('is-flipped');
//set the first card clicked to cardOne. Since flipped is set to false, the code below will run, setting the click event to cardOne & counting the click
    if (!flipped){
        flipped = true;
        cardOne = event.currentTarget;
        clicks.innerText++;
//by returning the function here, function will start over after next click event, but this block will be skipped since flipped is now true
        return;
    }
//set cardTwo to the next click event
    cardTwo = event.currentTarget;

//make it so that clicking the same card doesn't count a click, or count as a match
    if (cardOne === cardTwo){
        return;
    }

//if cardTwo is different, count the click and continue with rest of code
    clicks.innerText++;
//we'll set flipped back to false so that the next card clicked after checking for a match will be cardOne
    flipped = false;

    isAMatch();
}

function isAMatch(){
//if the cards match, remove the eventListener so that they can't be clicked again & return the function so that they don't unflip
    if (cardOne.dataset.image === cardTwo.dataset.image){
        cardOne.removeEventListener('click', flip);
        cardTwo.removeEventListener('click', flip)
        matches++;

        if (matches === 6){
            youWin();
        }
        return;
    }
//if the cards don't match, run unFlip()
    unFlip();
}

function unFlip(){
//if we try to click another card now, click event will be triggered & code in flip() will run, but lockDeck now = true, returning flip() & the rest of its code won't run
    lockDeck = true;

    setTimeout(function(){
//remove is-flipped (rotateY 180deg) from the class list after 2 seconds. these cards can be flipped again b/c we removed the class, not the eventListener
        cardOne.classList.remove('is-flipped');
        cardTwo.classList.remove('is-flipped');
//now that cards have unflipped, we can set the lockDeck to false again so that the rest of code in flip() will run after we click a new card
        lockDeck = false;

    }, 1000);
}


//add alert pop-up when all of the matches have been found displaying the number of clicks
function youWin(){
    setTimeout(function(){
        alert('Meow! You helped all of the kitties find their twins in ' +clicks.innerText+ ' clicks!');
    }, 950)
}


//iterate through the cards so that a click event is placed on each
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', flip);
}

function newGame(){
    window.location.reload();
}

restart.addEventListener('click', newGame);



}
