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
  <VkakaoMap />
</template>

<style scoped></style>
