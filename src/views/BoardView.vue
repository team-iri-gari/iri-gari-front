<template>
    <div class="board-editor">

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
            <label for="content">태그</label>
            <input type="text" id="title" placeholder="태그를 추가하세요" />
        </div>

        <div class="form-item">
            <label for="file">파일</label>
            <input type="file" id="file" multiple accept="image/*" @change="handleFileUpload" />
            <ul>
                <li v-for="(file, index) in uploadedFiles" :key="index">
                    {{ file.name }}
                    <button @click="removeUploadedFile(index)">삭제</button>
                </li>
            </ul>
        </div>

        <button @click="submitBoard">등록</button>
        <button @click="cancelBoard">취소</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const boardTitle = ref('');
const boardContent = ref('');
const uploadedFiles = ref([]);

const handleFileUpload = (event) => {
  uploadedFiles.value.push(...Array.from(event.target.files));
};

const removeUploadedFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const submitBoard = () => {
};

const cancelBoard = () => {
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
  