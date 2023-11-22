<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import PNaver from "@/components/map/PNaver.vue";

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
  <div class="post-wrapper">
    <div class="plans-container">
      <h1>여행 계획</h1>
      <hr />
      <div class="plan-card" v-for="p in plans" :key="p.planIdx">
        <img
          class="plan-image"
          :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${p.imgSrc}/${p.imgId}`"
          alt="Plan Image"
        />
        <div class="plan-details">
          <p class="place-name">{{ p.placeName }}</p>
          <p class="plan-date">{{ p.date }}</p>
        </div>
      </div>
    </div>
    <div class="map-container">
      <PNaver />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
.post-wrapper {
  display: flex;
}
.plans-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}
.map-container {
  display: flex;
  width: 60%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.plan-card {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.plan-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.plan-image {
  width: 100px; /* 이미지 크기 조정 필요 시 변경 */
  height: 100px; /* 이미지 비율에 맞게 높이 조정 필요 시 변경 */
  border-radius: 8px;
  object-fit: cover; /* 이미지가 div를 꽉 채우도록 */
  margin-right: 16px;
}

.plan-details {
  flex-grow: 1;
}

.place-name {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.plan-date {
  font-size: 14px;
  color: #bdbdbd;
  margin-top: 8px;
}
</style>
