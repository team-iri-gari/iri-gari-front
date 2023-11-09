<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const containerWidth = ref(0); // We will set this onMounted to the container's width
const boxes = ref([]);
const boxHeight = 300; // Assuming a fixed height for simplicity, you can also make it random
const gap = 10; // Gap between boxes

// Helper function to generate a random integer within a range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 상자를 추가하는 함수
async function addBoxes() {
  const currentLength = boxes.value.length;
  let yOffset = currentLength === 0 ? 0 : boxes.value[boxes.value.length - 1].yOffset + boxHeight + gap; // Start from the bottom of the last box

  for (let i = currentLength; i < currentLength + 15; i++) {
    // Check if we need to wrap to a new row
    if (yOffset + boxHeight > document.documentElement.clientHeight) {
      yOffset = 0; // Reset yOffset for the new row
    }

    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const catImageUrl = response.data[0].url;
    boxes.value.push({
      id: i,
      content: `Box ${i}`,
      imageUrl: catImageUrl,
      yOffset: yOffset, // This is the y-coordinate for the top of the box
      style: {
        width: `${randomInt(100, containerWidth.value - gap)}px`, // Random width but not wider than the container
        height: `${boxHeight}px`, // Fixed or random height
      }
    });

    yOffset += boxHeight + gap; // Increase yOffset for the next box
  }
}

// 스크롤을 감지하는 함수
function checkScroll(event) {
  // Set containerWidth on first scroll if not set
  if (containerWidth.value === 0) {
    containerWidth.value = event.target.clientWidth - gap; // Subtract gap to ensure boxes fit within the container
  }

  const { scrollTop, offsetHeight, scrollHeight } = event.target;
  if (scrollTop + offsetHeight >= scrollHeight) {
    addBoxes();
  }
}

// 컴포넌트가 마운트되었을 때 초기 상자를 추가
onMounted(() => {
  const containerElement = document.querySelector('.container');
  containerWidth.value = containerElement.clientWidth - gap;
  addBoxes();
});
</script>

<template>
  <div class="container" @scroll="checkScroll">
    <div class="content">
      <div class="logo">TMP LOGO</div>
    </div>
    <div v-for="box in boxes" :key="box.id" :style="{...box.style, transform: `translateY(${box.yOffset}px)`}" class="box">
      <img :src="box.imageUrl" alt="Random Cat" class="cat-image">
      <!-- {{ box.content }} -->
    </div>
  </div>
</template>

<style scoped>
/* ... your existing styles ... */
.box {
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* To handle overflowing images */
}
</style>
