<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardBoard from '@/components/CardBoard.vue';

const posts = ref([]);

const getPosts = async () => {
  axios
    .get("http://localhost/api/board/plan")
    .then((response) => {
      console.log(response);
      posts.value = response.data;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div id="container">
    <div>
      <h1>여행 기록</h1>
      <p><RouterLink to="/board/free">자유 게시판</RouterLink></p>
      <p><router-link to="/write/plan">글작성</router-link></p>
    </div>
    <div id="list">
      <CardBoard :cards="posts" :cardSize="'200px'" />
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
}

#list {
  max-width: 1000px;
}
</style>
