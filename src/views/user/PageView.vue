<script setup>
import axios from "axios";
import { ref, onMounted, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import Profile from '@/components/Profile.vue';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

const isDifferentUser = computed(() => {
  return userId.value != store.userData.userInfo.id;
});

const store = useAuthStore();
const route = useRoute();
const neighbors = ref([]);
const neighborsPosts = ref([]);
const userId = ref(route.params.id); // URL에서 id 파라미터를 반응형으로 참조
const user = ref([]);

const fetchData = async () => {
  try {
    const userResponse = await axios.get(`http://localhost/api/member/${userId.value}`);
    user.value = userResponse.data;

    const neighborsResponse = await axios.get(`http://localhost/api/neighbor/${userId.value}`);
    neighbors.value = neighborsResponse.data;

    const postsResponse = await axios.get(`http://localhost/api/neighbor/posts/${userId.value}`);
    neighborsPosts.value = postsResponse.data;

    console.log(userId.value)
    console.log(store.userData.userInfo.id)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

watch(() => route.params.id, (newId) => {
  userId.value = newId;
  fetchData();
});

const sendFriendRequest = async () => {
  try {
    const response = await axios.post(`http://localhost/api/neighbor/request/${store.userData.userInfo.id}/${userId.value}`)
    
    console.log('Friend request sent:', response);
  } catch (error) {
    console.error('Error sending friend request:', error);
  }
};

</script>

<template>
  <MyPageTemplete :userData="user">
    <div id="profile">
      <Profile :userid="userId" />
      <h3>{{ user?.id }}</h3>
      <h3>{{ user?.email }}</h3>
      <div v-if="isDifferentUser">
        <button @click="sendFriendRequest" class="friend-request-button">이웃 신청</button>
      </div>
    </div>
    <div id="neighbor">
      <h2>이웃</h2>
      <hr>
      <ul class="neighbor-list">
        <li class="neighbor-profile" v-for="neighbor in neighbors" :key="neighbor.id">
          <Profile :userid="neighbor.memberB" :size="50" />
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
.friend-request-button {
  background-color: #4CAF50; /* 녹색 배경 */
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.friend-request-button:hover {
  background-color: #45a049; /* 호버 시 더 어두운 녹색 */
}
</style>