import { deck } from "./deck";
import { PlayerHand } from "./playerHand";
import { round, Round } from "./round";

export interface Game {
    rounds : Round[],
    currentRound: Round | undefined,
    isGameFinished: boolean,

    startGame(): void,
    nextRound(): void,
    finishGame(): void;
}

export function game(playerHands: PlayerHand[]): Game {
    return {
        rounds: [],
        currentRound: undefined,
        isGameFinished: false,

        startGame() {
            const roundDeck = deck();
            const firstRound = round(playerHands, roundDeck)
            this.rounds.push(firstRound);
            this.currentRound = firstRound;
        },

        nextRound() {
            //check if anyone has the score 500
            if(this.currentRound?.isFinished) {
                const roundDeck = deck();
                //reset playerHands cards
                const nextRound = round(playerHands, roundDeck);
                this.rounds.push(nextRound);
                this.currentRound = nextRound;
            }
        },
        finishGame() {
            
        },
    }
}