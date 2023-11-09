<script setup>

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="header">
    <a href="#mypage">My Page</a> |
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
