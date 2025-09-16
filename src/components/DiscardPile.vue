<script setup lang="ts">
import { computed } from 'vue';
import UnoCard from './Card.vue';
import type { DiscardPile } from '@/model/discardPile';

interface Props {
  discardPile: DiscardPile;
}

const props = defineProps<Props>();

const latestCard = computed(() => {
  const pile = props.discardPile;
  return pile.getTopCard();
});

</script>

<template>
  <div class="discard-pile w-24 h-36 relative">
    <div v-if="latestCard">
      <UnoCard :card="latestCard" />
    </div>
    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
      <span class="text-gray-500">Empty</span>
    </div>
  </div>
</template>
