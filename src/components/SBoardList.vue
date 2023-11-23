<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useSearchStore } from "@/stores/search.js";
import { useRouter } from "vue-router";

const searchStore = useSearchStore();
const router = useRouter();
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

const goToBoard = (type) => {
  if (type === 1) {
    router.push(`/board/free`);
  } else if (type === 2) {
    router.push("/board/plan");
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div id="freeboard-container">
      <div class="board-title">
        <h2><a @click="goToBoard(1)">자유게시판</a></h2>
      </div>
      <table class="boardList">
        <thead>
          <tr>
            <th width="70%">제목</th>
            <th width="30%">이름</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr
            v-for="(farticle, index) in fbList"
            v-if="index < 5"
            :key="farticle.article_id"
          > -->
          <tr v-for="farticle in fbList" :key="farticle.article_id">
            <td>
              <a href="">{{ farticle.title }}</a>
            </td>
            <td>{{ farticle.name }}</td>
          </tr>
        </tbody>
        <tbody v-if="pbList.length === 0">
          <tr>
            <td colspan="2">관련 게시물이 없습니다.</td>
          </tr>
        </tbody>
      </table>
      <div class="more-button">
        <a @click="goToBoard(1)"><strong>더보기</strong> (more)</a>
      </div>
    </div>
    <br />
    <div id="planboard-container">
      <div class="board-title">
        <h2><a @click="goToBoard(2)">여행 기록</a></h2>
      </div>
      <table class="boardList">
        <thead>
          <tr>
            <th width="70%">제목</th>
            <th width="30%">이름</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr
            v-for="(particle, index) in pbList"
            v-if="index < 5"
            :key="particle.article_id"
          > -->
          <tr v-for="particle in pbList" :key="particle.article_id">
            <td>
              <a href="">{{ particle.title }}</a>
            </td>
            <td>{{ particle.name }}</td>
          </tr>
        </tbody>
        <tbody v-if="pbList.length === 0">
          <tr>
            <td colspan="2">관련 게시물이 없습니다.</td>
          </tr>
        </tbody>
      </table>
      <div class="more-button">
        <a @click="goToBoard(2)"><strong>더보기</strong> (more)</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  text-align: center;
  border-collapse: collapse;
  width: 400px;
  border-spacing: 0;
  border-top: 1px solid #858585;
  border-bottom: 1px solid #858585;
}
.boardList a {
  text-decoration: none;
  color: black;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.boardList a:hover {
  text-decoration: underline;
  color: rgb(9, 152, 152);
}
.boardList th {
  text-align: center;
}
.boardList td {
  padding-top: 5px;
  padding-bottom: 5px;
}
.boardList tbody td {
  border-top: 1px solid #867d7d;
  text-align: center;
}
.board-title {
  text-align: center;
}
.more-button {
  margin-top: 5px;
  text-align: end;
}
.more-button a {
  text-decoration: none;
}
#freeboard-container {
  overflow-y: hidden;
  height: 50%;
}
#planboard-container {
  overflow-y: hidden;
  height: 50%;
}
</style>
