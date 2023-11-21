<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from "axios";
import Profile from '@/components/Profile.vue';

const store = useAuthStore();
const neighbors = ref([]);
const neighborsPosts = ref([]);

onMounted(async () => {
  try {
    const neighborsResponse = await axios.get('http://localhost/api/neighbor/' + store.userData.userInfo.id);
    neighbors.value = neighborsResponse.data;

    const postsResponse = await axios.get('http://localhost/api/neighbor/posts/' + store.userData.userInfo.id);
    console.log(postsResponse)
    neighborsPosts.value = postsResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div>
    <h1>{{ store.userData?.userInfo?.name }}님의 마이 페이지</h1>

    <div>
      <Profile />
      <h3>{{ store.userData?.userInfo?.id }}</h3>
      <h3>{{ store.userData?.userInfo?.email }}</h3>
    </div>
    <div>
      <h1>내 이웃</h1>
      <ul class="neighbor-list">
        <li v-for="neighbor in neighbors" :key="neighbor.id" class="neighbor-item">
          <Profile :user="neighbor" />
          {{ neighbor.memberB }}
        </li>
      </ul>
    </div>
    <div>
      <h2>내 이웃의 최신 글</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in neighborsPosts" :key="post.id">
            <td>{{ post.articleId }}</td>
            <td @click="goToPost(post.articleId)">{{ post.title }}</td>
            <td>{{ post.name }}</td>
            <td>{{ post.regDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.neighbor-list {
  display: flex;
  list-style-type: none;
  /* 리스트 마커를 제거합니다. */
  padding: 0;
  /* 기본 패딩을 제거합니다. */
  flex-wrap: wrap;
  /* 요소들이 넘치면 다음 줄로 넘어갈 수 있도록 합니다. */
}

.neighbor-item {
  margin-right: 10px;
  /* 항목 사이의 간격을 조정합니다. */
  flex: 0 0 auto;
  /* 항목의 크기가 내용에 따라 결정되도록 합니다. */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}
</style>