import { Card } from "./card";
import { Type } from "./types";

export interface PlayerHand {
    playerName: string,
    playerCards: Card<Type>[],
    score: number,

    takeCards(cards: Card<Type>[]): void,
    playCard(index: number): Card<Type>,
    addToScore(points: number): void
}

export function playerHand(name: string, cards: Card<Type>[]): PlayerHand {
    return {
        playerName: name,
        playerCards: cards,
        score: 0,

        takeCards(cards: Card<Type>[]) {
            this.playerCards.push(...cards)
        },
        playCard(index: number): Card<Type> {
            return cards.splice(index, 1)[0]
        },
        addToScore(points: number) {
            this.score += points
        }
    }
}