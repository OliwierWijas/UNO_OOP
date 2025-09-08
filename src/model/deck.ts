import { Type } from "./types"
import { Card } from "./card"

export type Deck = {
    cards: Card<Type>[],
}