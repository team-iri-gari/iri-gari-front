<script setup>
import { ref } from "vue";
import axios from "axios";
import { useSearchStore } from "@/stores/search.js";

const searchStore = useSearchStore();
const fbList = ref({});
const pbList = ref({});
async function getList() {
  console.log(searchStore.keyword);
  fbList.value = (
    await axios.get(
      `http://localhost/api/board/search/free?keyword=${searchStore.keyword}`
    )
  ).data;

  pbList.value = (
    await axios.get(
      `http://localhost/api/board/search/plan?keyword=${searchStore.keyword}`
    )
  ).data;
}

getList();
</script>

<template>
  <div style="display: flex; flex-direction: column">
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
    <br />
    <div id="planboard-container">
      <h2>여행 기록</h2>
      <hr />
      <table>
        <tr v-for="particle in pbList" :key="particle.article_id">
          <td>{{ particle.title }}</td>
          <td>{{ particle.name }}</td>
          <td>{{ particle.regDate }}</td>
        </tr>
        <tr v-if="pbList.length === 0">
          <td colspan="3">관련 게시물이 없습니다.</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
#freeboard-container {
  color: white;
  overflow-y: hidden;
  height: 50%;
}
#planboard-container {
  color: white;
  overflow-y: hidden;
  height: 50%;
}
</style>
