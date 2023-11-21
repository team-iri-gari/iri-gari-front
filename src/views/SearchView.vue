<script setup>
import VkakaoMap from "@/components/map/VkakaoMap.vue";
import SBoardList from "@/components/SBoardList.vue";
import SearchBox from "../components/SearchBox.vue";
import { onMounted } from "vue";
import { useScrollStore } from "@/stores/store";

const scrollStore = useScrollStore();

onMounted(() => {
  scrollStore.setScrollPosition(700);
});
</script>

<template>
  <div id="search-container" style="background-color: #131d2b">
    <div style="margin-left: 30px; width: 100%">
      <!-- <SearchBox style="width: 90%" /> -->
    </div>
    <div id="search-main" style="display: flex; width: 100%; margin-top: 20px">
      <VkakaoMap />
      <SBoardList class="board-list" style="margin: 0 auto 0 auto" />
    </div>
  </div>
</template>

<style scoped>
#search-container {
  position: absolute;
  top: 50px;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
