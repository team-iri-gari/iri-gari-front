<script setup>
import { ref } from "vue";
import axios from "axios";
import { useSearchStore } from "@/stores/search.js";

const searchStore = useSearchStore();
const fbList = ref({});
async function getList() {
  console.log(searchStore.keyword);
  fbList.value = (
    await axios.get(`http://localhost/api/board/search/free?keyword=${searchStore.keyword}`)
  ).data;
}

getList();
</script>

<template>
  <div id="freeboard-container">
    <h2>자유게시판</h2>
    <hr />
    <table>
      <tr v-for="farticle in fbList" :key="farticle.article_id">
        <td>{{ farticle.title }}</td>
        <td>{{ farticle.name }}</td>
        <td>{{ farticle.regDate }}</td>
      </tr>
      <tr v-if="fbList.length === 0">
        <td colspan="3">관련 게시물이 없습니다.</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
