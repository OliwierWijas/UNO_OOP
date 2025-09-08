
import { Card } from "./card";
import { Color, Digit, Type } from "./types"

export type Deck = {
    cards: Card<Type, Color>[],
}

const DIGITS: readonly Digit[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const createNumberedCards = <C extends Color>(color: C): Card<"NUMBERED", C>[] => {
  return [
    ...DIGITS.map((n) => ({ type: "NUMBERED" as const, color, number: n })),
    ...DIGITS.slice(1).map((n) => ({ type: "NUMBERED" as const, color, number: n })),
  ];
};

const blueCards = createNumberedCards("BLUE");
console.log(blueCards)