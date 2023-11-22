<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardBoard from '@/components/CardBoard.vue';

const posts = ref([]);

const getPosts = async () => {
  axios
    .get("http://localhost/api/board/free")
    .then((response) => {
      console.log(response);
      posts.value = response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div>
    <h1>자유게시판</h1>
    <p>
      <RouterLink to="/board/plan">여행 계획</RouterLink>
    </p>
    <p>
      <RouterLink to="/write/free">글작성</RouterLink>
    </p>
    <CardBoard :cards="posts" :cardSize="'20vw'" />
  </div>
</template>

<style scoped></style>
