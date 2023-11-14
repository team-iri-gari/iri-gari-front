<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const submitSearch = () => {
    if (searchQuery.value) {
        router.push(`/search/${encodeURIComponent(searchQuery.value)}`);
    }
};
</script>
  
<template>
    <div>
        <input type="text" v-model="searchQuery" placeholder="검색어 입력" />
        <button @click="submitSearch">검색</button>
    </div>
</template>
  
<style scoped>

</style>