<script setup lang="ts">
import type { Card } from '@/model/card';
import { playerHand as createPlayerHand } from '@/model/playerHand';
import { useRoute } from 'vue-router';
import PlayerHand from './PlayerHand.vue';
import Deck from './Deck.vue';
import DiscardPile from './DiscardPile.vue';
import TopInfoBar from './TopInfoBar.vue'
import type { Type } from '@/model/types';
import { reactive } from 'vue';
import { round as createRound } from '@/model/round';
import { deck as createDeck } from '@/model/deck';
import { discardPile as createDiscardPile } from '@/model/discardPile';

const route = useRoute();

const gameDeck = createDeck();
gameDeck.shuffle();

const discardPile = reactive(createDiscardPile())

const playerName = (route.query.name as string) || 'Player';
const playerHand = reactive(createPlayerHand(playerName, []));
const currentRound = reactive(createRound([playerHand], gameDeck, discardPile));

//this is just for initiating the first player, it should be changed later once we have the start game setup
currentRound.nextPlayer()

function handleCardDrawn(card: Card<Type>) {
  playerHand.takeCards([card]);
}

function handleCardPlayed(payload: { cardIndex: number; card: Card<Type> }) {
  if (!currentRound.putCard(payload.card)) {
    currentRound.currentPlayer?.putCardBack(payload.card, payload.cardIndex)
  }
}

</script>

<template>
  <div class="game-container">
    <TopInfoBar :players="[playerHand]" />
    <div class="center-area">
      <DiscardPile :discardPile="discardPile" />
      <Deck @card-drawn="handleCardDrawn" :deck="gameDeck" />
    </div>
    <PlayerHand :playerHand="playerHand" @card-played="handleCardPlayed"/>
  
  </div>
</template>

<style scoped>
.game-container {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; 
  width : 100vw;
  align-items: center; 
  background: radial-gradient(circle, #6e91c2ff 0%, #0956bf 100%);
  background-size: cover;
}

.center-area {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: -10vh;
}
</style>

