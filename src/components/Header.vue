<script setup>
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useScrollStore } from "@/stores/store";
import SearchBox from "@/components/SearchBox.vue";

const scrollStore = useScrollStore();

const store = useAuthStore();
const isAuthenticated = computed(() => store.isAuthenticated);

onMounted(() => {
  if (localStorage.getItem("token") == undefined) useAuthStore.hasToken = false;
  else useAuthStore.hasToken = true;
});

function logout() {
  store.logout();
}
</script>

<template>
  <div id="header">
    <div class="left-space">
      <RouterLink to="/"
        ><img
          src="/images/irigari-ko.png"
          style="height: 40px; margin-top: 10px"
      /></RouterLink>
    </div>
    <div class="content">
      <SearchBox
        v-show="scrollStore.scrollPosition > 600"
        style="margin-top: 10px"
      />
    </div>
    <div v-if="isAuthenticated" class="right-space">
      <RouterLink to="/board/free">BOARD</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/user/mypage">MY PAGE</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a @click="logout()">LOGOUT</a>
    </div>
    <div v-else class="right-space">
      <RouterLink to="/user/login">LOGIN</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/user/join">JOIN</RouterLink>
    </div>
  </div>

  <div id="bomper"></div>
</template>

<style scoped>
* {
  font-family: "Moirai One";
  font-size: 25px;
  font-weight: bold;
}

#header {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}

.left-space {
  margin-left: 20px;
  text-align: center;
  /* font-family: YanoljaYacheR; */
  font-size: 20px;
}

.right-space {
  display: flex;
  color: white;
  text-align: center;
  margin-right: 20px;
}

.content {
  flex-grow: 1;
  padding: 10px;
  text-align: center;
}

#bomper {
  height: 50px;
}

#header a {
  color: white;
  text-decoration: none;
}
</style>
