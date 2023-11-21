<script setup>
import { onMounted, onUnmounted } from 'vue';
import Header from './components/Header.vue';
import { useScrollStore } from "@/stores/store";

const scrollStore = useScrollStore();

// 스크롤 이벤트 핸들러
function handleScroll() {
  const scrollTop = window.scrollY;
  scrollStore.setScrollPosition(scrollTop);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>

</style>
