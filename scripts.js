const CARD_COUNT = 12;
const BOARD = document.querySelector(".board");
const COUNTER = document.querySelector(".moves");
let firstCard;
let secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let pairs = 0,
    moves = 0,
    seconds = 0,
    minutes = 0;

function createBoard() {
    for(let i = 0; i < CARD_COUNT; i++) {
        createCard(i);
    }
}

function getRandomPosition() {
    return Math.floor(Math.random() * 12)
}

function createCard(card_index = 0) {
    card_index = Math.floor(card_index / 2);
    BOARD.innerHTML += (
        '<div class="card" data-card="dw'+card_index+'" style="order: '+getRandomPosition()+'">' +
        '<img src="img/dw'+card_index+'.jpg" alt="dw'+card_index+'" class="front" />' +
        '<img src="img/back.png" alt="Card Back" class="back" />' +
        '</div>'
    );
}

function addClickEvents() {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", flipCard)
    });
}

function flipCard() {
    if (lockBoard) {
        return;
    }

    // acilmis olan karta tiklamayi engelle
    if (this == firstCard) {
        console.log(this)
        return;
    }

    this.classList.add("flip");

    if (!hasFlippedCard) {
        firstCard = this;
        hasFlippedCard = true;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    addCount();

    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    pairs++;

    if (pairs == CARD_COUNT / 2) {
        endGame();
    }

    resetRound();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetRound();
    }, 1000);
}

function resetRound() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    hasFlippedCard = false;
}

function endGame() {
    setTimeout(() => {
        alert(`${moves} hamlede kimsenin aklina gelmeyen ve daha onceden yapilmamis bu oyunu tamamladin. Yeyy.`);
    }, 300);
}

function addCount() {
    moves++;
    COUNTER.innerHTML = moves;
}

function startGame() {
    createBoard();
    addClickEvents();
}

startGame();