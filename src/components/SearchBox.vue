<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const keyword = ref("");
const router = useRouter();

const submitSearch = () => {
  if (keyword.value) {
    router.push(`/search/${encodeURIComponent(keyword.value)}`);
  }
};
</script>

<template>
  <div>
    <input type="text" v-model="keyword" placeholder="검색어 입력" />
    <button @click="submitSearch">검색</button>
  </div>
</template>

<style scoped></style>
