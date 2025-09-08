import { Card } from "./card";
import { Type } from "./types";

export type PlayerHand = {
    name: string,
    cards: Card<Type>[],
    score: 0
}