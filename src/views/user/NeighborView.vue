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
    
  </MyPageTemplete>
</template>

<style scoped>

</style>