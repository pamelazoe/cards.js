class Deck {
  numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  suits = ['♣', '♦', '♥', '♠'];

  cards = [];

  constructor() {
    this.suits.map(suit => {
      this.numbers.map(face => {
        this.cards.push(face + suit);
      });
    });
  }

  dispatchCards(size) {
   if(this.cards.length >= size){
    return new Array(size)
      .fill()
      .map(() =>this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0])
   } 
    return this.fullDeck()
  }
  fullDeck() {
  this.cards = []
  this.suits.map(suit => {
    this.numbers.map(face => {
      this.cards.push(face + suit);
    });
  });
  return cards
}
}

class Hand {
  cards = [];
  constructor(deck, size, username="GuestId-" + Math.floor(Math.random() * 100) + 900) {
    this.cards = deck.dispatchCards(size);
    this.username = username
  }
}

module.exports = {
  Deck,
  Hand
};


