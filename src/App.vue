<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const showExtraHeaderContent = ref(false);

const handleScroll = () => {
  console.log("!!!!")
  const position = window.scrollY;
  showExtraHeaderContent.value = position > 500;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div class="header">
    <RouterLink to="/mypage">My Page</RouterLink>
    <RouterLink to="/login">LOGIN</RouterLink>
  </div>

  <div id="bomper">
    back
  </div>

  <RouterView />
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  box-sizing: border-box;
}

.bomper {
  height: 100px;
}

.header a {
  text-decoration: none;
  color: black;
  margin-left: 20px;
}
</style>
