import { Type } from "./types"
import { Card } from "./card"
import { DeckFactory } from "../utils/deck_factory";
import {standardShuffler} from "../utils/random_utils"

export interface Deck {
    cards: Card<Type>[],

    drawCards(nrCards: number): Card<Type>[];
    shuffle(): void;
}

export function deck(): Deck {
    return {
        cards: DeckFactory.createFullDeck(),
        shuffle() {
        standardShuffler(this.cards);
        },

        drawCards(nrCards: number) {
            return this.cards.splice(0, nrCards); 
        },
    }
}
