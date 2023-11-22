<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});
</script>

<template>
    <div id="background">
        <h1>{{ userData.name }}님의 페이지</h1>
        <div id="container">
            <slot>

            </slot>
        </div>
        <div id="bookmark-buttons">
            <RouterLink :to="`/user/page/${userData.id}`"><button class="bookmark-button">마이페이지</button></RouterLink>
            <RouterLink :to="`/user/board/${userData.id}`"><button class="bookmark-button">내글 보기</button></RouterLink>
            <RouterLink :to="`/user/neighbor/${userData.id}`"><button class="bookmark-button">내 이웃</button></RouterLink>
            <RouterLink to="/"><button class="bookmark-button">기타</button></RouterLink>
        </div>
    </div>
</template>

<style scoped>
#background {
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
}

#container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    background-color: white;
    border: 2px dashed;
    border-radius: 10px;
    padding: 20px;

    width: 80vw;
    min-height: 80vh;
}

h1 {
    color: white;
    width: 80vw;
}

#bookmark-buttons {
    position: absolute;
    top: calc(50% - 35vh);
    right: calc(10vw - 70px);
    display: flex;
    flex-direction: column;
    padding: 20px;
}

#bookmark-buttons a {
    display: block;
    text-align: center;
    margin-bottom: 10px;
}

.bookmark-button {
    width: 100%;
    background-color: cornflowerblue;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0;
    cursor: pointer;
}

.bookmark-button:hover {
    background-color: #e0e0e0;
}

@media screen and (max-width: 860px) {
    #bookmark-buttons {
        position: fixed;
    }
}
</style>
  