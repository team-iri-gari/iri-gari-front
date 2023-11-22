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
  router.push(`/post/plan/${postId}`);
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
      <div class="card-post" @click="goToPost(item.articleId)">
        <div class="card-image"></div>
        <div class="card-content">
          <p class="card-title">{{ item.title }}</p>
          <p class="card-name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
}

.card-post {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-image {
  height: 60px;
  width: 80px;
  background: #666666;
  border-radius: 5px;
  margin-right: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.card-name {
  font-size: 14px;
  color: #666;
  margin: 2px 0 0;
}
</style>
