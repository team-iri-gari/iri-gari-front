<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Profile from '@/components/Profile.vue';
import CardBoard from '@/components/CardBoard.vue';

const store = useAuthStore();
const neighbors = ref([]);
const neighborsPosts = ref([]);

onMounted(async () => {
  try {
    const neighborsResponse = await axios.get('http://localhost/api/neighbor/' + store.userData.userInfo.id);
    neighbors.value = neighborsResponse.data;

    const postsResponse = await axios.get('http://localhost/api/neighbor/posts/' + store.userData.userInfo.id);
    console.log(postsResponse.data)
    neighborsPosts.value = postsResponse.data;
    console.log(neighborsPosts.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const cardData = [
  {
    articleId: 1,
    img: 'https://example.com/thumbnail1.jpg',
    title: 'Card Title 1'
  },
  {
    articleId: 2,
    img: 'https://example.com/thumbnail2.jpg',
    title: 'Card Title 2'
  },
  {
    articleId: 3,
    img: 'https://example.com/thumbnail3.jpg',
    title: 'Card Title 3'
  }
  // ... 추가 카드 데이터
];
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
            <Profile :user="neighbor" :size="50"/>
            {{ neighbor.memberB }}
          </li>
        </ul>
        <h2>내 이웃의 최신 글</h2>
        <CardBoard :cards="neighborsPosts" :cardSize="150" />
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
  padding: 30px;
}

@media screen and (max-width: 860px) {
  #profile {
    border-right: none;
    border-bottom: 2px solid #000000; /* 화면이 좁아졌을 때 가로선으로 변경 */
  }
}

#neighbor {
  width: 50vw;
  padding: 30px;
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

</style>