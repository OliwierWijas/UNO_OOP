import { RulesHelper } from "../utils/rules_helper";
import { deck } from "./deck";
import { PlayerHand } from "./playerHand";
import { round, Round } from "./round";

export interface Game {
    rounds : Round[],
    currentRound: Round | undefined,
    isGameFinished: boolean,

    startGame(): void,
    nextRound(): PlayerHand | undefined,
}

export function game(playerHands: PlayerHand[]): Game {
    return {
        rounds: [],
        currentRound: undefined,
        isGameFinished: false,

        startGame() {
            if (!this.isGameFinished)
            {
                const roundDeck = deck();
                const firstRound = round(playerHands, roundDeck)
                this.rounds.push(firstRound);
                this.currentRound = firstRound;
            }
            else {
                throw new Error("The game has finished.")
            }
        },

        nextRound() {
            if (!this.isGameFinished) {
                if (!this.currentRound) return; 

                const winner = RulesHelper.checkIfAnyoneHasScore500(this.currentRound)
                if (winner)
                {
                    this.currentRound.isFinished = true;
                    return winner;
                }

                if(this.currentRound?.isFinished) {
                    const roundDeck = deck();

                    playerHands.forEach(p => {
                        p.resetCards()
                    });
                    
                    const nextRound = round(playerHands, roundDeck);
                    this.rounds.push(nextRound);
                    this.currentRound = nextRound;
                }
                
                return undefined;
            }
            else {
                throw new Error("The game has finished.")
            }
        }
    }
}