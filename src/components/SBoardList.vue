<script setup>
import { ref } from "vue";
import axios from "axios";
import { useSearchStore } from "@/stores/search.js";

const searchStore = useSearchStore();
const boardList = ref({});
async function getList() {
  boardList.value = (await axios.get(`http://localhost/api/board/${searchStore.keyword}`)).data;
}

getList();
</script>

<template>
  <div id="freeboard-container">
    <h2>자유게시판</h2>
    <hr />
    <table>
      <tr v-for="article in boardList" :key="article.article_id">
        <td>{{ article.title }}</td>
        <td>{{ article.name }}</td>
        <td>{{ article.regDate }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
