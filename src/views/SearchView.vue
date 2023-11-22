<script setup>
import VkakaoMap from "@/components/map/VkakaoMap.vue";
import SBoardList from "@/components/SBoardList.vue";
import { onMounted } from "vue";
import { useScrollStore } from "@/stores/store";

const scrollStore = useScrollStore();

onMounted(() => {
  scrollStore.setScrollPosition(700);
});
</script>

<template>
  <div id="search-container" style="background-color: #eef6fc">
    <div id="search-main" style="display: flex; width: 100%">
      <VkakaoMap />
      <SBoardList class="board-list" style="margin: 90px auto 0 auto" />
    </div>
  </div>
</template>

<style scoped>
#search-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
