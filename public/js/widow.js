const createCardDiv = att => {
    const cardDiv =  document.createElement("div")
    cardDiv.classList.add("card")
    Object.entries(att).map(([key, value]) => {
        return cardDiv.classList.add(value)
    })
    return cardDiv
}

const createCard = (card, flipped) => {
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
    if(flipped){
        cardDiv.classList.add("flipped")
    }
    cardDiv.addEventListener("click", () => {
        cardDiv.classList.contains("flipped") ?
        cardDiv.classList.remove("flipped") :
        cardDiv.classList.add("flipped")
    })
      return cardDiv
}
const createDeck = async({selector, path, flipped}) => {
    const container =document.querySelector(selector)
    const cards = await (await fetch(path)).json()
    console.log(cards);
    cards.map((card, index) => container.append(createCard(card, (index < flipped))))
}

const buttonEvents = {
    flip : async () => document.querySelectorAll(".deck.hand .card.flipped").forEach((el, i) =>{
        setTimeout(() => {el.classList.remove("flipped")}, (500 * (i)))})
}

window.addEventListener("DOMContentLoaded", () => {
    (async () => {
        await createDeck({
            selector: ".deck.table",
            path: "/table",
            flipped:2
        })
        const deckSize = 2
        await createDeck({
            selector: ".deck.hand",
            path: `/deck/${deckSize}`,
            flipped:2
        })  
        
        const {flip} = buttonEvents

        document.getElementById("flip").addEventListener("click", () => {
            flip()
        })
        
    })()
})