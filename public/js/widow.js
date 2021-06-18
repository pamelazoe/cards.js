const createCardDiv = att => {
    const cardDiv =  document.createElement("div")
    cardDiv.classList.add("card")
    Object.entries(att).map(([key, value]) => {
        return cardDiv.classList.add(value)
    })
    return cardDiv
}

const createCard = (card) => {
    const number = card.slice(0, -1);
    const symbol = card.slice(-1);
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card")
    const isNumber = !isNaN(number);
    const isAce = (num, sym) => num === "A"  ? `<div id="ace">${sym}</div>` : ""
    cardDiv.innerHTML =`
    <div class="container">
    <div class="front ${symbol} ${number}">
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
    </div>
    <div class="back">
    </div>
    </div>
    `
    cardDiv.addEventListener("click", () => {
        cardDiv.classList.contains("flipped") ?
        cardDiv.classList.remove("flipped") :
        cardDiv.classList.add("flipped")
        console.log(cardDiv.classList);
    })
      return cardDiv
}
const createDeck = async({selector, path}) => {
    const container =document.querySelector(selector)
    const cards = await (await fetch(path)).json()
    console.log(cards);
    cards.map(card => container.append(createCard(card)))
}


// cardClick.addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log("clicked");
// }, false)
window.addEventListener("DOMContentLoaded", () => {
    (async () => {
        await createDeck({
            selector: ".deck.table",
            path: "/table"
        })
        const deckSize = 2
        await createDeck({
            selector: ".deck.hand",
            path: `/deck/${deckSize}`
        })
    //     const cardClick  = document.querySelectorAll(".card")
    //     console.log(cardClick);
    // cardClick.forEach((el,i) => {
    // el.addEventListener("click", (e) => {
    //         e.preventDefault()
    //         console.log(`clicked ${i}`);
    //     }, false)
    // })
    
    })()
})