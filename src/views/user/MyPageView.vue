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
  <div id="background">
    <h1>{{ store.userData?.userInfo?.name }}님의 스페이스</h1>

    <div id="container">
      <div id="profile">
        <Profile />
        <h3>{{ store.userData?.userInfo?.id }}</h3>
        <h3>{{ store.userData?.userInfo?.email }}</h3>
      </div>

      <div id="neighbor">
        <h2>내 이웃</h2>
        <ul class="neighbor-list">
          <li class="neighbor-profile"  v-for="neighbor in neighbors" :key="neighbor.id" >
            <Profile :user="neighbor" size="50"/>
            {{ neighbor.memberB }}
          </li>
        </ul>
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
  </div>
</template>

<style scoped>
#background {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
}

#container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 2px dashed;
  border-radius: 10px;
  padding: 20px;


  width: 80vw;
  height: 80vh;
}

#profile {
  border-right: 2px solid #000000;
  padding: 20px;
}

@media screen and (max-width: 860px) {
  #profile {
    border-right: none;
    border-bottom: 2px solid #000000; /* 화면이 좁아졌을 때 가로선으로 변경 */
  }
}

#neighbor {
  width: 50vw;
  padding: 10px;
}

h1 {
  color: white;
  width: 80vw;
}
.neighbor-profile {
  width: 50px;
  height: 70px;
  margin-right: 10px;
  flex: 0 0 auto;
}



.neighbor-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
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