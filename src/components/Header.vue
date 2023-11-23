<script setup>
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import SearchBox1 from "./SearchBox1.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuthStore();
const isAuthenticated = computed(() => store.isAuthenticated);

onMounted(() => {
  if (localStorage.getItem("token") == undefined) useAuthStore.hasToken = false;
  else useAuthStore.hasToken = true;
});

function logout() {
  store.logout();
  router.push("/");
}
</script>

<template>
  <div id="header">
    <div class="left-space">
      <RouterLink to="/">
        <img
          src="/images/logo/irigari-black.png"
          style="height: 38px; margin: auto 5"
        />
      </RouterLink>
    </div>
    <div class="content">
      <SearchBox1 />
    </div>
    <div v-if="isAuthenticated" class="right-space">
      <RouterLink to="/board/free">BOARD</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink :to="`/user/page/${store.userData.userInfo.id}`"
        >MY PAGE</RouterLink
      >
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a @click="logout()">LOGOUT</a>
    </div>
    <div v-else class="right-space">
      <RouterLink to="/board/free">BOARD</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/user/login">LOGIN</RouterLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/user/join">JOIN</RouterLink>
    </div>
  </div>

  <div id="bomper"></div>
</template>

<style scoped>
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
  background-color: #e3f2ffa9;
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
  color: rgb(53, 53, 53);
  text-align: center;
  margin-right: 20px;
}

.content {
  margin: 0 auto 0 auto;
  flex-grow: 1;
  text-align: center;
}

#header a {
  color: rgb(53, 53, 53);
  text-decoration: none;
}

#bomper {
  height: 50px;
}
</style>
