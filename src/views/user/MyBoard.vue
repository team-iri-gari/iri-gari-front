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
    neighborsPosts.value = postsResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div id="background">
    <h1>{{ store.userData?.userInfo?.name }}나의 이웃</h1>

    <div id="container">

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
</style>