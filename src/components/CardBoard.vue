<template>
    <div class="card-board">
        <div v-for="card in cards" :key="card.articleId" class="card" :style="{ width: cardSize, height: cardSize}" @click="navigateTo(card.boardTypeId, card.articleId)">
            <img :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${card.img}`" alt="Card Thumbnail" class="card-thumbnail" />
            <h4 class="card-title">{{ card.title }}</h4>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
    cards: {
        type: Array,
        default: () => []
    },
    cardSize: {
        type: String,
        default: "200px"
    }
});

const router = useRouter();
const navigateTo = (type , id) => {
    console.log(type)
    router.push("/post/" + (type === 1 ? "free" : "plan") + "/" + id);
};
</script>
  
<style scoped>
.card-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
}

.card-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-bottom: 1px solid #ddd;
}

.card-title {
    margin: 10px;
}
</style>
  