<template>
    <div id="content">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="author">작성자: <span>{{ post.name }}</span></p>
        <p class="date">작성일: <span>{{ post.regDate }}</span></p>
        <div class="image-container" v-for="p in photo" :key="p.saveFile">
            <img :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${p.saveFolder}/${p.saveFile}`"
                alt="게시글 이미지" />
        </div>
        <p class="tags">{{ post.tagList }}</p>
        <div class="post-content">{{ post.content }}</div>
        <button class="back-button" @click="goBack">목록으로 돌아가기</button>
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
#content {
    color: #333;
    max-width: 800px;
    
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-title {
    color: #2a7f8e;
    font-size: 28px;
    margin-bottom: 10px;
}

.author, .date {
    font-size: 14px;
    color: #666;
}

.image-container img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}

.tags {
    background: #e1f4f3;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.post-content {
    text-align: justify;
    line-height: 1.6;
}

.back-button {
    background-color: #2a7f8e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.back-button:hover {
    background-color: #238b80;
}
</style>
