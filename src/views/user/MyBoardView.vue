<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

const store = useAuthStore();
const myFreeBoard = ref([]);
const myPlanBoard = ref([]);

onMounted(async () => {
  try {
    let response = await axios.get('http://localhost/api/board/free/user/' + store.userData.userInfo.name);
    myFreeBoard.value = response.data;

    response = await axios.get('http://localhost/api/board/plan/user/' + store.userData.userInfo.name);
    console.log(response)
    myPlanBoard.value = response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <MyPageTemplete>
    <div>
      <h2>내 작성 글</h2>
      <CardBoard :cards="myFreeBoard" :cardSize="'150px'" />
    </div>
    <div>
      <h2>내 작성 계획</h2>
      <CardBoard :cards="myPlanBoard" :cardSize="'150px'" />
    </div>
  </MyPageTemplete>
</template>

<style scoped>

</style>