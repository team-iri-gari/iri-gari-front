<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardBoard from "@/components/CardBoard.vue";

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
    <div class="board-title">
      <div class="title">
        <span><strong>자유게시판</strong></span
        >&nbsp;&nbsp;|&nbsp;&nbsp;
        <span
          ><router-link
            to="/board/plan"
            style="text-decoration: none; color: black"
            >여행 기록</router-link
          ></span
        >
      </div>
    </div>
    <div id="list">
      <div style="width: inherit; text-align: right">
        <button>
          <RouterLink
            to="/write/free"
            style="text-decoration: none; color: rgb(46, 10, 10)"
            >글작성</RouterLink
          >
        </button>
      </div>
      <hr />
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
.board-title {
  margin-top: 60px;
  text-align: center;
}
.title {
  font-size: 25px;
}
#list button {
  border-radius: 4px;
  border-color: beige;
  background-color: white;
}
#list {
  text-align: center;
  max-width: 1000px;
}
</style>
