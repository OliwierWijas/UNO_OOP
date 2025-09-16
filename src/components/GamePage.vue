<script setup lang="ts">
import type { Card } from '@/model/card';
import { playerHand as createPlayerHand } from '@/model/playerHand';
import { useRoute } from 'vue-router';
import PlayerHand from './PlayerHand.vue';
import Deck from './Deck.vue';
import DiscardPile from './DiscardPile.vue';
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
  <div class="flex flex-col items-center gap-4">
    <Deck @card-drawn="handleCardDrawn" :deck="gameDeck" />
    <DiscardPile :discardPile="discardPile" />

    <PlayerHand :playerHand="playerHand" @card-played="handleCardPlayed"
    />  </div>
</template>
