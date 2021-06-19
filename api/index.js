const express = require("express")
const app = express()
const cors = require('cors')
const path = require("path")
const { Deck, Hand } = require('../app/deck/deck');

const fullDeck = new Deck()

const deck = new Deck();

// const deck = new Deck();
// const hand1 = new Hand(deck, 5, "Zoé")
// const hand2 = new Hand(deck, 3)
// const hand3 = new Hand(deck, 4, "Manuel")
// const hand5 = new Hand(deck, 10)
// let hands = [hand1,hand2, hand3]


const users = {}

let table = deck.dispatchCards(5)

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))

// STATIC
app.get(["/", "/widow"], (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "public","html", "widow.html"))
})

app.get("/cards", (req, res) => {
  res.status(200).sendFile(path.join(__dirname,  "..", "public", "html", "cards.html"))
})

// API

app.get("/fulldeck", (req, res) => {
  res.json(fullDeck.cards)
})

app.get("/table", (req, res) => {
  console.log(table);
res.json(table)
})

app.get("/deck/:size", (req, res) => {
  const {size} = req.params
  res.json(deck.dispatchCards(parseInt(size, 10)))
  console.log(deck.cards.length);
})

app.get("/hold", (req, res) => {
  console.log("Someone is trying to hold");
  res.json({
    status: "hold"
  })
})

app.get("/withdraw", (req, res) => {
  console.log("Someone is trying to withdraw");
  res.json({
    status: "withdraw"
  })
})

app.post("/set-username", (req, res) => {
  console.log(req.body);
  const { user } = req.body;
  users[user] = {
    name: user,
    lastLoginAt : parseInt(new Date(), 10)
  }
  res.json({ok: true})
})

app.get("/admin", (req, res) => {
  res.json(users)
})


app.listen(8000, () => {
    console.log("Server running on port 8000");
})

module.exports = app
// app.get('/game', (req, res) => {
//     res.status(200).json({
//       cards: deck.cards,
//       users: [...hands],
//     });
//   });