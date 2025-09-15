<script setup lang="ts">
import { computed } from "vue";
import type { Card, Type } from "./types";

interface Props {
  card: Card<Type>;
}

const props = defineProps<Props>();

const imageMap: Record<Type, (card: Card<Type>) => string> = {
  NUMBERED: (card) =>
    `src/components/images/${card.color}_${card.number}.png`,
  SKIP: (card) =>
    `src/components/images/${card.color}_Skip.png`,
  REVERSE: (card) =>
    `src/components/images/${card.color}_Reverse.png`,
  DRAW2: (card) =>
    `src/components/images/${card.color}_Draw_2`,
  WILD: () => `src/components/images/Wild_Card_Change_Colour.png`,
  DRAW4: () => `src/components/images/Wild_Card_Draw_4.png`,
};

const cardImage = computed(() => imageMap[props.card.type](props.card));
</script>

<template>
  <img :src="cardImage" alt="UNO Card" class="w-full h-full object-cover" />
</template>

<style scoped>
.uno-card {
  border: 2px solid #333;
  background: white;
}
</style>
