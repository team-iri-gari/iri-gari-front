<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const name = ref('');
const id = ref('');
const password = ref('');

const register = async () => {
    await axios.post('http://localhost/api/member', {
        email: email.value,
        name: name.value,
        id: id.value,
        password: password.value
    }).then(response => {
        if (response.status === 201) {
            console.log(response);
            console.log("회원가입 성공", response.data);
            alert("회원가입 성공");
            router.push('/user/login');
        }
        else
            alert("회원가입 실패");
    }).catch(error => {
        console.error('Error:', error);
    });
};
</script>

<template>
    <div id="container">
        <div class="join-container">
            <div class="logo">JOIN</div>
            <form class="join-form" @submit.prevent="register">
                <div class="form-group">
                    <label for="id">아이디</label>
                    <input type="text" id="id" v-model="id" required>
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="join-button">가입하기</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<style scoped>
#container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.join-container {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.logo {
    font-size: 36px;
    color: #4a90e2;
    margin-bottom: 30px;
    text-align: center;
}

.join-form {
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

.form-group input:focus {
    outline: none;
    border-color: #4a90e2;
}

.join-button {
    width: 100%;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    background-color: #4a90e2;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.join-button:hover {
    background-color: #357ABD;
}
</style>

  