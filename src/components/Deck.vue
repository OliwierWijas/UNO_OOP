<script setup lang="ts">
import type { Card } from '@/model/card';
import type { Type } from '@/model/types';
import deckImg from '@/components/images/Back_Card.png';
import type { Deck } from '@/model/deck';

const props = defineProps<{
  deck: Deck
}>();

const emit = defineEmits<{
  (e: 'card-drawn', card: Card<Type>): void
}>();


function drawCard() {
  const cards = props.deck.drawCards(1);
  if (cards.length > 0) {
    const drawn = cards[0];
    emit('card-drawn', drawn);
    return drawn;
  }
  return undefined;
}
</script>

<template>
  <div class="flex flex-col items-center mt-4">
    <img
      :src="deckImg"
      alt="Deck"
      class="h-[24rem] object-contain cursor-pointer rounded-md shadow-md transition-transform duration-300 hover:scale-110"
      @click="drawCard"
    />
  </div>
</template>