<script setup lang="ts">
import type { PlayerHand } from "@/model/playerHand";
import UnoCard from "./Card.vue";

interface Props {
  playerHand: PlayerHand;
}

defineProps<Props>();
</script>

<template>
  <div>{{ playerHand.playerName }}</div>
  <div class="carousel-container">
    <div class="carousel">
      <UnoCard
        v-for="(card, index) in playerHand.playerCards"
        :key="index"
        :card="card"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
  width: 75%;
  margin: auto;
}

.carousel {
  display: flex;
  gap: 1rem;
}

.carousel > * {
  flex: 0 0 auto;
  scroll-snap-align: center;
  transition: transform 0.3s;
}

.carousel > *:hover {
  transform: scale(1.1);
}
  
.carousel-container::-webkit-scrollbar {
  display: none;
}
.carousel-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
