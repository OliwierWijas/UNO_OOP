import type { Type } from './types'
import { RulesHelper } from '../utils/rules_helper'
import type { Card } from './card'
import type { Deck } from './deck'
import type { PlayerHand } from './playerHand'

export interface Round {
  playerHands: PlayerHand[]
  deck: Deck
  currentPlayer: PlayerHand | undefined
  discardPile: Card<Type>[]
  isFinished: boolean

  distributeCards(): void
  nextPlayer(): void
  putCard(card: Card<Type>): void
}

export function round(hands: PlayerHand[], roundDeck: Deck): Round {
  function findDealer(playerHands: PlayerHand[]): PlayerHand {
    return playerHands[0] ///we might change here later with the actual logic
  }

  return {
    playerHands: hands,
    deck: roundDeck,
    currentPlayer: undefined,
    discardPile: [],
    isFinished: false,

    distributeCards() {
      this.deck.shuffle()
      this.playerHands.forEach((p) => p.takeCards(this.deck.drawCards(7)))
      this.discardPile.push(this.deck.drawCards(1)[0])
    },
    nextPlayer() {
      if (!this.currentPlayer) {
        this.currentPlayer = findDealer(this.playerHands)
        return
      }

      const idx = this.playerHands.indexOf(this.currentPlayer)
      const nextIdx = (idx + 1) % this.playerHands.length
      this.currentPlayer = this.playerHands[nextIdx]
    },

    putCard(card: Card<Type>) {
      const lastCard = this.discardPile[this.discardPile.length - 1]

      if (this.currentPlayer && RulesHelper.canBePutOnTop(card, lastCard)) {
        this.discardPile.push(card)

        if (this.currentPlayer.playerCards.length === 0) {
          this.isFinished = true
          const score = RulesHelper.calculateScore(this.playerHands)
          this.currentPlayer.addToScore(score)
          return
        }

        switch (card.type) {
          case 'REVERSE':
            this.playerHands.reverse()
            this.nextPlayer()
            break

          case 'SKIP':
            this.nextPlayer()
            this.nextPlayer()
            break

          case 'DRAW2':
            this.nextPlayer()
            this.currentPlayer?.takeCards(this.deck.drawCards(2))
            break

          case 'DRAW4':
            this.nextPlayer()
            this.currentPlayer?.takeCards(this.deck.drawCards(4))
            break

          case 'WILD':
          case 'NUMBERED':
            this.nextPlayer()
            break

          default:
            throw new Error('Unknown card type.')
        }
      }
    },
  }
}
