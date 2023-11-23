<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

const store = useAuthStore();

onMounted(async () => {
  try {
    // 현재 URL의 사용자 id로 사용자 정보 조회
    const userResponse = await axios.get(`http://localhost/api/member/${userId}`);
    user.value = userResponse.data;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <MyPageTemplete :userData="user">
    
  </MyPageTemplete>
</template>

<style scoped>

</style>