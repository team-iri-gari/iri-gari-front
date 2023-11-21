<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const posts = ref([]);
const router = useRouter();

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

const goToPost = (postId) => {
  router.push(`/ppost/${postId}`);
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div>
    <h1>여행 기록</h1>
    <p><RouterLink to="/board/free">자유 게시판</RouterLink></p>
    <router-link to="/write/plan">글작성</router-link>
    <br />
    <br />
    <div class="card-container" v-for="item in posts" :key="item.articleId">
      <div class="card-post">
        <div
          style="height: 60px; width: 80px; background: #666666"
          @click="goToPost(item.articleId)"
        ></div>
        <p>{{ item.title }}</p>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
}
</style>
