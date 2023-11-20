<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const plans = ref([]);

const fetchPost = async () => {
  try {
    let response = await axios.get(`http://localhost/api/board/plan/${route.params.id}`);
    console.log(response.data);
    plans.value = response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div>
    <h1></h1>
    <hr />
    <span></span>
    <span></span>
    <div class="plan-card" v-for="p in plans" :key="p.planIdx">
      <img
        :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${p.imgSrc}/${p.imgId}`"
        alt=""
      />
      <p>{{ p.placeName }}</p>
      <p>{{ p.date }}</p>
    </div>
  </div>
</template>

<style scoped></style>
