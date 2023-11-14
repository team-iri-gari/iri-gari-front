<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

onMounted(() => {
    if(localStorage.getItem('token') == undefined)
        useAuthStore.hasToken = false
    else
        useAuthStore.hasToken = true
});

function logout() {
    localStorage.removeItem('token');
    useAuthStore.hasToken.value = false;
}

</script>

<template>
    <div id="header">
        <div class="left-space">left</div>
        <div class="content">middle</div>
        <div v-if="useAuthStore.hasToken" class="right-space">
            <RouterLink to="/board">BOARD</RouterLink>
            |
            <RouterLink to="/mypage">MY PAGE</RouterLink>
            |
            <a @click=logout()>LOGOUT</a>
        </div>
        <div v-else class="right-space">
            <RouterLink to="/login">LOGIN</RouterLink>
            |
            <RouterLink to="/join">JOIN</RouterLink>
        </div>
    </div>

    <div id="bomper">
        back
    </div>

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

.left-space{
    width: 100px;
    text-align: center;
}

.right-space {
    text-align: center;
    display: inline-block;
}

.content {
    flex-grow: 1; /* 남은 공간을 모두 차지 */
    padding: 10px;
    text-align: center;
}

#bomper {
    height: 30px;
}

#header a {
    text-decoration: none;
    color: black;
}

</style>