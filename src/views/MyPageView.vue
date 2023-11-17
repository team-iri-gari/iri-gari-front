<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from "axios";
import Profile from '@/components/Profile.vue'

const store = useAuthStore();

</script>

<template>
  <div>
    <h1>{{ store.userData?.userInfo?.name }}님의 마이 페이지</h1>

    <div>
      <Profile/>
      <h3>{{ store.userData?.userInfo?.id }}</h3>
      <h3>{{ store.userData?.userInfo?.email }}</h3>
    </div>
  </div>
</template>
