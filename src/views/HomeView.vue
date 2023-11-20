<script setup>
import Home from "@/components/Home.vue"
import Recommend from "@/components/Recommend.vue"
import { useScrollStore } from "@/stores/store";
const scrollStore = useScrollStore();

function checkScroll(event) {
  const { scrollTop} = event.target;
  scrollStore.setScrollPosition(scrollTop);
}
</script>

<template>
  <div id="container-scroll" @scroll="checkScroll">
    <Home/>
    <Recommend/>
    <div id="container-card">
  
    </div>

  </div>
</template>

<style scoped>

</style>
