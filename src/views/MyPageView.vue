<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from "axios";
//import Profile from '@/components/Profile.vue'

const store = useAuthStore();

const userInfo = ref({name : ""});

onMounted(() => {
  getUserInfo()
});

function getUserInfo() {
  var id = store.getName();

  axios.get('http://localhost/api/member/' + id
  ).then(response => {
    userInfo.value = response.data
    console.log(response.data)
  }).catch(error => {
    console.error('Error:', error);
  });
}

</script>

<template>
  <div>
    <h1>{{ userInfo }}님의 마이 페이지</h1>

    <div v-if="userInfo">
      <p>{{ userInfo }}</p>
      <!-- 여기에 필요한 사용자 정보를 더 표시 -->
    </div>
  </div>
</template>
  