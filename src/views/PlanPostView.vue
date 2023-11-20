<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const post = ref([]);

const fetchPost = async () => {
  try {
    let response = await axios.get(`http://localhost/api/board/plan/${route.params.id}`);
    console.log(response.data);
    post.value = response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
</script>

<template>
  <div>
    <h1></h1>
    <hr />
    <span></span>
    <span></span>
    <div class="plan-card"></div>
  </div>
</template>

<style scoped></style>
