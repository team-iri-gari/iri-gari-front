<script setup>
import axios from "axios";
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import Profile from '@/components/Profile.vue';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

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
</script>


<template>
  <MyPageTemplete :userData="user">
    <div id="profile">
      <Profile :userid="user?.id" />
      <h3>{{ user?.id }}</h3>
      <h3>{{ user?.email }}</h3>
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