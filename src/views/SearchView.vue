<script setup>
import { watch, onMounted } from "vue";
import { useSearchStore } from "@/stores/search.js";
import { useRoute } from "vue-router";
import VkakaoMap from "../components/VkakaoMap.vue";
import SBoardList from "../components/SBoardList.vue";

const searchStore = useSearchStore();
const route = useRoute();

onMounted(() => {
  const keyword = route.params.keyword;
  if (keyword) {
    searchStore.setKeyword(keyword);
  }
});

watch(route, (newRoute) => {
  keyword.value = newRoute.params.keyword;
});
</script>

<template>
  <div id="search-main" style="display: flex; width: 100%">
    <VkakaoMap />
    <SBoardList class="board-list" style="margin: 0 auto 0 auto" />
  </div>
</template>

<style scoped></style>
