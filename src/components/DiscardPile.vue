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
  <div>
    <div v-if="latestCard">
      <UnoCard :card="latestCard" />
    </div>
    <div v-else >
      <div class= "empty-space"></div>
    </div>
  </div>
</template>

<style>
.empty-space {
  height: 14rem;
  width: 9.4rem
}
</style>
