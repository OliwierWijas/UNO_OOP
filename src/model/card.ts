import { Color, Digit, Type } from "./types"

interface MutableCard<C extends Color> {
    color: C
}

//  Exclude<Type, "NUMBERED">
interface MutableTypedCard<T extends Type, C extends Color> extends MutableCard<C> {
    type: T
}

interface MutableNumberedCard<C extends Color> extends MutableCard<C> {
    type: "NUMBERED",
    number: Digit
}

export type Card<T extends Type, C extends Color> = T extends "NUMBERED" ? Readonly<MutableNumberedCard<C>> : Readonly<MutableTypedCard<T, C>>;