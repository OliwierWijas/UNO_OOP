<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import UnoCard from './Card.vue';
import CardList from './CardList.vue'

const redFive: Card<"NUMBERED"> = {
  type: "NUMBERED",
  color: "RED",
  number: 5,
};

const wildCard: Card<"WILD"> = {
  type: "WILD",
};

const cards = [redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, redFive, wildCard]

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <CardList :cards="cards" />
</template>
