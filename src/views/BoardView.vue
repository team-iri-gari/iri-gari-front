<template>
    <div>
        <h1>자유게시판</h1>
        <RouterLink to="/write/free">글작성</RouterLink>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.articleId }}</td>
                    <td @click="goToPost(post.articleId)">{{ post.title }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.regDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);

const getPosts = async () => {
    axios.get('http://localhost/api/board/free'
    ).then(response => {
        console.log(response);
        posts.value = response.data;
    }).catch(error => {
        console.error('Error:', error);
    });
};

const router = useRouter();

const goToPost = (postId) => {
    router.push(`/post/${postId}`);
};

onMounted(() => {
    getPosts();
});
</script>
  
  
<style scoped>
/* 여기에 CSS 스타일을 추가합니다 */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}
</style>
  