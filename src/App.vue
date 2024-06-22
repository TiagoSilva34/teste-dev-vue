<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <main class="main">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
}
</style>
