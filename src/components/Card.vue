<script setup lang="ts">
import type { Card } from "@/model/card";
import type { Type } from "@/model/types";
import { computed } from "vue";

interface Props {
  card: Card<Type>;
}

const props = defineProps<Props>();

function isColoredCard(card: Card<Type>): card is Extract<Card<Type>, { color: string }> {
  return 'color' in card;
}

function isNumberedCard(card: Card<Type>): card is Extract<Card<Type>, { type: 'NUMBERED'; number: number }> {
  return card.type === 'NUMBERED';
}

const numberedImageMap: Record<Extract<Type, 'NUMBERED'>, (card: Extract<Card<Type>, {color : string, number: number}>) => string> = {
  NUMBERED: (card) => `/src/components/images/${card.color}_${card.number}.png`,
}

const coloredImageMap: Record<Exclude<Type, 'WILD' | 'DRAW4' | 'NUMBERED'>, (card: Extract<Card<Type>, { color: string }>) => string> = {
  SKIP: (card) => `/src/components/images/${card.color}_Skip.png`,
  REVERSE: (card) => `/src/components/images/${card.color}_Reverse.png`,
  DRAW2: (card) => `/src/components/images/${card.color}_Draw_2.png`,
};

const wildImageMap: Record<'WILD' | 'DRAW4', string> = {
  WILD: `/src/components/images/Wild_Card_Change_Colour.png`,
  DRAW4: `/src/components/images/Wild_Card_Draw_4.png`,
};

const cardImage = computed(() => {
  const card = props.card;
  if (isNumberedCard(card)) {
    return numberedImageMap[card.type](card);
  }
  else if (isColoredCard(card)) {
    return coloredImageMap[card.type](card);
  } 
  else {
    return wildImageMap[card.type as 'WILD' | 'DRAW4'];
  }
});
</script>

<template>
  <div class="bg-white rounded-md w-24 h-36 overflow-hidden shadow-md mx-[4px]">
    <img :src="cardImage" alt="UNO Card" class="w-full h-full object-cover cursor-pointer" />
  </div>
</template>
