<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CardBoard from '@/components/CardBoard.vue';
import MyPageTemplete from "@/templates/MyPageTemplete.vue";

const route = useRoute();
const userId = route.params.id; // URL에서 id 파라미터 가져오기
const myFreeBoard = ref([]);
const myPlanBoard = ref([]);
const user = ref([]);

onMounted(async () => {
  try {
    // 현재 URL의 사용자 id로 사용자 정보 조회
    const userResponse = await axios.get(`http://localhost/api/member/${userId}`);
    user.value = userResponse.data;

    // URL에서 받은 userId를 이용하여 사용자의 자유 게시판 글 가져오기
    let response = await axios.get(`http://localhost/api/board/free/user/${userId}`);
    myFreeBoard.value = response.data;

    // URL에서 받은 userId를 이용하여 사용자의 계획 게시판 글 가져오기
    response = await axios.get(`http://localhost/api/board/plan/user/${userId}`);
    myPlanBoard.value = response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <MyPageTemplete :userData="user">
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
