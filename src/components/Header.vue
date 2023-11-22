<script setup>
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import SearchBox1 from "./SearchBox1.vue";

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
        ><img src="/images/logo/irigari-ko.png" style="height: 40px; margin-top: 10px" />
        <!-- <img
          v-if="scrollStore.scrollPosition > 600"
          src="/images/logo/irigari-blue.png"
          style="height: 40px; margin-top: 10px"
      /> -->
      </RouterLink>
    </div>
    <div class="content">
      <SearchBox1 />
      <!-- <SearchBox
        v-show="scrollStore.scrollPosition > 600"
        style="margin-top: 10px"
      /> -->
    </div>
    <div v-if="isAuthenticated" class="right-space">
      <RouterLink to="/board/free">BOARD</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink :to="`/user/page/${store.userData.userInfo.id}`">MY PAGE</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a @click="logout()">LOGOUT</a>
    </div>
    <div v-else class="right-space">
      <RouterLink to="/user/login">LOGIN</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/user/join">JOIN</RouterLink>
    </div>
  </div>

  <!-- <div id="bomper"></div> -->
</template>

<style scoped>
* {
  font-family: "Moirai One";
  font-size: 25px;
  font-weight: bold;
}

#header {
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

#header {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.075);
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
  margin: 0 auto 0 auto;
  flex-grow: 1;
  text-align: center;
}

#header a {
  color: white;
  text-decoration: none;
}
</style>
