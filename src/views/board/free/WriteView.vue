<template>
    <form class="board-editor" @submit.prevent="submitPost">

        <div class="form-item">
            <h2>자유 게시판</h2>
            <hr>
        </div>

        <div class="form-item">
            <label for="title">제목</label>
            <input type="text" id="title" v-model="boardTitle" placeholder="제목을 입력하세요" />
        </div>

        <div class="form-item">
            <label for="content">내용</label>
            <textarea id="content" v-model="boardContent" placeholder="내용을 입력하세요"></textarea>
        </div>

        <div class="form-item">
            <label>태그</label>
            <TagBox />
        </div>

        <input type="file" id="files" ref="fileInput" multiple>

        <button type="button" @click="submitBoard">등록</button>
        <button type="button" @click="cancelBoard">취소</button>
    </form>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
//import MultiImageUpload from '../components/MultiImageUpload.vue';
import axios from 'axios';
import TagBox from '@/components/TagBox.vue';
import { useTagStore } from '@/stores/tags';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const store = useAuthStore();
const tagStore = useTagStore();

const boardTitle = ref('');
const boardContent = ref('');

const fileInput = ref(null);

const submitBoard = async () => {
    try {
        const formData = new FormData();
        formData.append('title', boardTitle.value);
        formData.append('content', boardContent.value);
        formData.append('name', store.userData.userInfo.name);

        let tagValues = tagStore.tags.map(tag => tag.value);
        formData.append('tagList', JSON.stringify(tagValues));

        if (fileInput.value.files.length) {
            for (let file of fileInput.value.files) {
                formData.append('upfile', file);
            }
        }

        console.log(formData);

        const response = await axios.post('http://localhost/api/board/write/free', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        router.push('/board/free');
    } catch (error) {
        console.error('Error:', error);
    }
};

const cancelBoard = () => {
     router.back();
};

</script>
  
<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 4px 0;
}

.board-editor {
    max-width: 600px;
    margin: auto;
}

.form-item {
    margin-bottom: 16px;
}

.form-item label {
    display: block;
    margin-bottom: 8px;
}

.form-item input[type="text"],
.form-item textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-item textarea {
    height: 150px;
    resize: vertical;
}

.form-item input[type="file"] {
    display: block;
}

button {
    padding: 10px 15px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}
</style>
  