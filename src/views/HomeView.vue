<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const boxes = ref([]);

// 상자를 추가하는 함수
async function addBoxes() {
  const currentLength = boxes.value.length;
  for (let i = currentLength; i < currentLength + 15; i++) {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const catImageUrl = response.data[0].url; // 첫 번째 이미지의 URL을 가져옵니다.
    boxes.value.push({ id: i, content: `Box ${i}`, imageUrl: catImageUrl });
  }
}

// 스크롤을 감지하는 함수
function checkScroll(event) {
  const { scrollTop, offsetHeight, scrollHeight } = event.target;

  // 스크롤이 바닥에 도달했는지 확인
  if (scrollTop + offsetHeight >= scrollHeight) {
    addBoxes();
  }
}

// 컴포넌트가 마운트되었을 때 초기 상자를 추가
onMounted(addBoxes);

const router = useRouter();

const goSearch = () => {
  router.push({ name: "search" });
};
</script>

<template>
  <div class="container" @scroll="checkScroll">
    <div class="content">
      <div class="logo">TMP LOGO</div>
      <div class="search-container">
        <input type="text" class="search-box" placeholder="Search..." />
        <button @click="goSearch">SEARCH</button>
      </div>
    </div>
    <div class="box" v-for="box in boxes" :key="box.id">
      <img :src="box.imageUrl" alt="Random Cat" class="cat-image" />
      <!-- {{ box.content }} -->
    </div>
  </div>
</template>

<style scoped>
.container::-webkit-scrollbar {
  width: 12px;
}

.container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

.container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.container {
  height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.box {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  height: 90vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.logo {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.search-container {
  position: relative;
  width: 80%;
  max-width: 500px;
}

.search-box {
  width: 100%;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 30px;
  box-sizing: border-box;
  font-size: 16px;
}

.cat-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
