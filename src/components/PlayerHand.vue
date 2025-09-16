<script setup lang="ts">
import type { PlayerHand } from "@/model/playerHand";
import UnoCard from "./Card.vue";

interface Props {
  playerHand: PlayerHand;
}

defineProps<Props>();
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
        class="flex-none snap-center transition-transform duration-300 hover:scale-110"
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