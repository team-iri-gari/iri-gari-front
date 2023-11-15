<script setup>
import { onMounted, computed } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useScrollStore } from '@/stores/store'
import SearchBox from "@/components/SearchBox.vue";

const scrollStore = useScrollStore()

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
            <RouterLink to="/">이리가리</RouterLink>
        </div>
        <div class="content"><SearchBox v-show="scrollStore.scrollPosition > 600" /></div>
        <div v-if="isAuthenticated" class="right-space">
            <RouterLink to="/board">BOARD</RouterLink>
            |
            <RouterLink to="/mypage">MY PAGE</RouterLink>
            |
            <a @click="logout()">LOGOUT</a>
        </div>
        <div v-else class="right-space">
            <RouterLink to="/login">LOGIN</RouterLink>
            |
            <RouterLink to="/join">JOIN</RouterLink>
        </div>
    </div>

    <div id="bomper">back</div>
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

    background: #fff;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-space {
    margin-left: 20px;
    text-align: center;
    font-family: YanoljaYacheR;
    font-size: 20px;
}

.right-space {
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
    text-decoration: none;
    color: black;
}
</style>
