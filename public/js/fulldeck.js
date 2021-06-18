const showDeck = deck => deck.map((card) => {
    const number = card.slice(0, -1);
    const symbol = card.slice(-1);
    const isNumber = !isNaN(number);
    const isAce = (num, sym) => num === "A"  ? `<div id="ace">${sym}</div>` : ""
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
      }` : isAce(number, symbol)}
    </div>
    <div class="card-corner bottom-right">
    <div>${number}</div>
    <div>${symbol}</div>
    </div>
    </div>`
}).join("")

window.addEventListener('DOMContentLoaded', () => {
(async () => {
 const fetchDeck= await fetch("http://localhost:8000/fulldeck")
 .then(data => data.json());
 console.log(fetchDeck);
 const cards = await showDeck(fetchDeck)
document.getElementById("deck").innerHTML= cards
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

const createCardDiv = attributes => {
  const cardDiv = document.createElement("div")
  cardDiv.classList.add("card");
  Object.entries(attributes).forEach(([key, value]) => {
    cardDiv.setAttribute(key, value)
  })
  return cardDiv
}