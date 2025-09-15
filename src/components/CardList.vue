<script setup lang="ts">
import UnoCard from "./Card.vue";
import type { Card, Type } from "./types";

interface Props {
  cards: Card<Type>[];
}

defineProps<Props>();
</script>

<template>
  <div class="carousel-container">
    <div class="carousel">
      <UnoCard
        v-for="(card, index) in cards"
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
  
/* Hide scrollbar for clean look */
.carousel-container::-webkit-scrollbar {
  display: none;
}
.carousel-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
