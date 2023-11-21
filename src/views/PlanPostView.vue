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
</template>

<style scoped>
.plans-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
  color: #333;
  margin: 0;
}

.plan-date {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}
</style>