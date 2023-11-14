<script setup>
import { ref, watch, onMounted } from "vue";
import { useSearchStore } from "@/stores/search.js";
import { useRoute } from "vue-router";
import VkakaoMap from "../components/VkakaoMap.vue";

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
  <div id="category" style="margin: 10px">카테고리입니다.</div>
  <VkakaoMap />
</template>

<style scoped></style>
