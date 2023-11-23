<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Header from "@/components/Header.vue";
import { useScrollStore } from "@/stores/store";

const scrollStore = useScrollStore();
const showHeader = ref(false);

// 스크롤 이벤트 핸들러
function handleScroll() {
  const scrollTop = window.scrollY;
  scrollStore.setScrollPosition(scrollTop);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="headerZone"
    @mouseover="showHeader = true"
    @mouseleave="showHeader = false"
  >
    <Header v-if="showHeader" />
  </div>
  <RouterView />
</template>

<style scoped>
.headerZone {
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 1000;
}
</style>
