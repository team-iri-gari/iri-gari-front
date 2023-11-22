<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import Profile from '@/components/Profile.vue';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

const store = useAuthStore();
const route = useRoute();
const neighbors = ref([]);
const neighborsPosts = ref([]);
const userId = route.params.id; // URL에서 id 파라미터 가져오기
const user = ref([]);

onMounted(async () => {
  try {
    // 현재 URL의 사용자 id로 사용자 정보 조회
    const userResponse = await axios.get(`http://localhost/api/member/${userId}`);
    user.value = userResponse.data;

    // 이웃 정보 조회
    const neighborsResponse = await axios.get(`http://localhost/api/neighbor/${userId}`);
    neighbors.value = neighborsResponse.data;

    // 이웃의 글 조회
    const postsResponse = await axios.get(`http://localhost/api/neighbor/posts/${userId}`);
    neighborsPosts.value = postsResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <MyPageTemplete :userData="user">
    <div id="profile">
      <Profile :user="user" />
      <h3>{{ user?.id }}</h3>
      <h3>{{ user?.email }}</h3>
    </div>
    <div id="neighbor">
      <h2>이웃</h2>
      <hr>
      <ul class="neighbor-list">
        <li class="neighbor-profile" v-for="neighbor in neighbors" :key="neighbor.id">
          <Profile :user="neighbor" :size="50" />
          {{ neighbor.memberB }}
        </li>
      </ul>
      <h2>이웃의 새소식</h2>
      <hr>
      <CardBoard :cards="neighborsPosts" :cardSize="'150px'" />
    </div>
  </MyPageTemplete>
</template>

<style scoped>
#profile {
  border-right: 2px solid #000000;
  padding: 30px;
}

@media screen and (max-width: 860px) {
  #profile {
    border-right: none;
    border-bottom: 2px solid #000000;
    /* 화면이 좁아졌을 때 가로선으로 변경 */
  }
}

#neighbor {
  width: 50vw;
  padding: 30px;
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