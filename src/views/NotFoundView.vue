<template>
    <div class="not-found">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <router-link to="/">홈으로 돌아가기</router-link>
    </div>
</template>
  
<script setup>
</script>
  
<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 4rem;
    margin-bottom: 20px;
}

.not-found p {
    font-size: 1.5rem;
    margin-bottom: 20px;
}
</style>
  