<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import { useScrollStore } from "@/stores/store";
import { useRouter } from "vue-router";

const scrollStore = useScrollStore();
const boxes = ref([]);
const router = useRouter();

const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};

// async function addBoxes() {
//   const currentLength = boxes.value.length;
//   for (let i = currentLength; i < currentLength + 15; i++) {
//     const response = await axios.get("https://api.thecatapi.com/v1/images/search");
//     const catImageUrl = response.data[0].url;
//     boxes.value.push({ id: i, content: `Box ${i}`, imageUrl: catImageUrl });
//   }
// }

function checkScroll(event) {
  const { scrollTop, offsetHeight, scrollHeight } = event.target;

  scrollStore.setScrollPosition(scrollTop);

  if (scrollTop + offsetHeight >= scrollHeight) {
    addBoxes();
  }
}

onMounted(addBoxes);
</script>

<template>
  <div id="container-search" @scroll="checkScroll">
    <div class="content">
      <div class="logo">이리 가리</div>
      <div class="search-container">
        <SearchBox :on-submit-search="onSubmitSearch" />
      </div>
    </div>
  </div>
  <div id="container-tag">

  </div>
  <div id="container-card">
    
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
  font-size: 70px;
  font-family: YanoljaYacheR;
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
