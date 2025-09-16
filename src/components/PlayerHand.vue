<script setup lang="ts">
import type { PlayerHand } from "@/model/playerHand";
import UnoCard from "./Card.vue";
import type { Card } from "@/model/card";
import type { Type } from "@/model/types";

interface Props {
  playerHand: PlayerHand;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'card-played', payload: { cardIndex: number; card: Card<Type> }): void;
}>();

function handleCardClick(index: number) {
  const card = props.playerHand.playCard(index);
  emit('card-played', { cardIndex: index, card });
}

</script>

<template>
  <div class="text-center text-lg font-semibold mb-4">
    {{ playerHand.playerName }}
  </div>

  <div class="overflow-x-auto snap-x snap-mandatory px-4 w-3/4 mx-auto scrollbar-hide">
    <div class="flex gap-4">
      <UnoCard
        v-for="(card, index) in playerHand.playerCards"
        :key="index"
        :card="card"
        class="flex-none snap-center transition-transform duration-300 hover:scale-110 cursor-pointer"
        @click="handleCardClick(index)"
      />
    </div>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>