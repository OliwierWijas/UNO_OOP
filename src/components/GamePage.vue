<script setup lang="ts">
import type { Card } from '@/model/card';
import { playerHand as createPlayerHand } from '@/model/playerHand';
import { useRoute } from 'vue-router';

const route = useRoute();
const playerName = route.query.name as string || 'Player';

const redFive: Card<'NUMBERED'> = { type: 'NUMBERED', color: 'RED', number: 5 };
const wildCard: Card<'WILD'> = { type: 'WILD' };

const cards = [
  redFive, redFive, redFive, redFive, wildCard
];

const playerHand = createPlayerHand(playerName, cards)

</script>

<template>
  <div>
    <PlayerHand :playerHand="playerHand" />
  </div>
</template>
