<script setup lang="ts">
import type { Card } from '@/model/card';
import { playerHand as createPlayerHand } from '@/model/playerHand';
import { useRoute } from 'vue-router';
import PlayerHand from './PlayerHand.vue';
import Deck from './Deck.vue';
import type { Type } from '@/model/types';
import { reactive } from 'vue';

const route = useRoute();
const playerName = (route.query.name as string) || 'Player';

const playerHand = reactive(createPlayerHand(playerName, []));

function handleCardDrawn(card: Card<Type>) {
  playerHand.takeCards([card]);
  console.log(card)
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Deck @card-drawn="handleCardDrawn" />

    <PlayerHand :playerHand="playerHand" />
  </div>
</template>
