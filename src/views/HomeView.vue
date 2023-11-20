<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import Logo from "../components/common/Logo.vue";
import { useScrollStore } from "@/stores/store";
import { useRouter } from "vue-router";

const scrollStore = useScrollStore();
const boxes = ref([]);
const router = useRouter();

const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};

async function addBoxes() {
  const currentLength = boxes.value.length;
  for (let i = currentLength; i < currentLength + 15; i++) {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search"
    );
    const catImageUrl = response.data[0].url;
    boxes.value.push({ id: i, content: `Box ${i}`, imageUrl: catImageUrl });
  }
}

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
  <div id="container-search" class="layer" @scroll="checkScroll">
    <div class="content">
      <div class="logo">
        <Logo />
        <!-- <img src="/images/logo.png" style="height: 300px" /> -->
      </div>
      <div class="search-container">
        <SearchBox :on-submit-search="onSubmitSearch" style="margin: auto" />
      </div>
    </div>
  </div>
  <div id="container-tag"></div>
  <div id="container-card"></div>
</template>

<style lang="scss">
#container-search {
  background-color: #131d2b;
  height: 100%;
}
.layer {
  position: absolute;
  top: 0;
  left: 0;
}
.content {
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
</style>
