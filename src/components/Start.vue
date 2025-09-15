<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const playerName = ref("");

function startGame() {
  if (!playerName.value.trim()) return;
  router.push({ name: "Game", query: { name: playerName.value } });
}
</script>

<template>
  <div class="start-page flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 via-yellow-400 to-green-400 p-6">
    <h1 class="text-6xl font-extrabold text-white mb-12 drop-shadow-lg font-['LuckiestGuy']">
      UNO
    </h1>

    <input
      v-model="playerName"
      type="text"
      placeholder="Enter your name"
      class="w-80 p-4 rounded-xl text-xl font-semibold text-center shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
    />

    <button
      @click="startGame"
      class="mt-8 px-8 py-4 bg-white text-red-500 font-bold text-2xl rounded-xl shadow-lg hover:bg-yellow-300 hover:text-red-700 transition-all"
    >
      Start Game
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

.start-page input::placeholder {
  color: #999;
}
</style>
