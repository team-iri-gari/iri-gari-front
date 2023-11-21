<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>작성자: {{ post.name }}</p>
        <p>작성일: {{ post.regDate }}</p>
        <div v-for="p in photo" :key="image">
            <img :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${p.saveFolder}/${p.saveFile}`" alt="Post Image" />
        </div>
        <p>{{ post.tagList }}</p>
        <p>{{ post.content }}</p>
        <button @click="goBack">목록으로 돌아가기</button>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const post = ref({});
const photo = ref([]);

const fetchPost = async () => {
    try {
        let response = await axios.get(`http://localhost/api/board/free/${route.params.id}`);
        post.value = response.data;

        response = await axios.get(`http://localhost/api/board/photo/${route.params.id}`);
        photo.value = response.data;

    } catch (error) {
        console.error('Error fetching post:', error);
        // 적절한 오류 처리 (예: 사용자에게 메시지 표시, 페이지 리디렉션 등)
    }
};

const goBack = () => {
    router.back();
};

onMounted(() => {
    fetchPost();
});
</script>
  
<style scoped>

img {
    max-width: 500px;
    max-height: 500px;
}

</style>
  