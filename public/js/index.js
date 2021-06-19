// Logic and fetch()
const showDeck = deck => deck.map((card) => {
    const number = card.slice(0, -1);
    const symbol = card.slice(-1);
    const isNumber = !isNaN(number);
    return `<div class="card ${symbol} ${number}">
    <div class="card-corner top-left">
    <div class="number">${number}</div>
    <div class="symbol">${symbol}</div>
    </div>
    <div class="symbols">
    ${(isNumber) ? `${new Array(parseInt(number))
        .fill(symbol)
        .map((cardSymbol) => `
          <div>${cardSymbol}</div>
        `)
        .join('')
      }` : ""}
    </div>
    <div class="card-corner bottom-right">
    <div>${number}</div>
    <div>${symbol}</div>
    </div>
    </div>`
}).join("")

const card = document.querySelectorAll("card")
console.log(card);
// card.addEventListener("click" , () => {
//   console.log("clicked");
// })

const showHand = hand => hand.users.map(h => {
    return `<div class="hand-section"><div class="username">${h.username}</div>
    <div class="user-deck">${showDeck(h.cards)}</div></div>`
}).join("")

window.addEventListener('load', () => {
(async () => {
 const fetchDeck= await fetch("/game")
 .then(data => data.json());
 console.log(fetchDeck);
 const deckValues = await Object.values(fetchDeck["cards"])
 const unassignedCards = await showDeck(deckValues)
const players = await showHand(fetchDeck)
document.getElementById("deck").innerHTML= unassignedCards
document.getElementById("players-section").innerHTML = players
})()
})  



// window.onload = document.addEventListener('DOMContentLoaded', async() => {
//   const fetchDeck= await fetch("http://localhost:8000/game")
//                           .then(data => data.json());
//  console.log(fetchDeck);
//  const deckValues = await Object.values(fetchDeck["cards"])
//  const unassignedCards = await showDeck(deckValues)
// const players = await showHand(fetchDeck)
// document.getElementById("deck").innerHTML= unassignedCards
// document.getElementById("players-section").innerHTML = players
// }, false);
