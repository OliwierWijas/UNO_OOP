<script setup lang="ts">
import PlayerHand from './PlayerHand.vue';
import { useRoute } from 'vue-router';
import type { Card } from './types';

const route = useRoute();
const playerName = route.query.name as string || 'Player';

// Example cards
const redFive: Card<'NUMBERED'> = { type: 'NUMBERED', color: 'RED', number: 5 };
const wildCard: Card<'WILD'> = { type: 'WILD' };

const cards = [
  redFive, redFive, redFive, redFive, wildCard
];

const playerHand: PlayerHand = {
  name: playerName,
  cards
};
</script>

<template>
  <div>
    <PlayerHand :playerHand="playerHand" />
  </div>
</template>
