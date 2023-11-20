<script setup>
import VkakaoMap from "@/components/map/VkakaoMap.vue";
import SBoardList from "@/components/SBoardList.vue";
</script>

<template>
  <div id="search-main" style="display: flex; width: 100%">
    <VkakaoMap />
    <SBoardList class="board-list" style="margin: 0 auto 0 auto" />
  </div>
</template>

<style scoped></style>
