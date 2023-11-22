<template>
    <div class="card-board">
        <div v-for="card in cards" :key="card.articleId" class="card" :style="{ width: cardSize + 'px', height: cardSize + 'px' }">
            <img :src="`https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${card.img}`" alt="Card Thumbnail" class="card-thumbnail" />
            <h3 class="card-title">{{ card.title }}</h3>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cards: {
        type: Array,
        default: () => []
    },
    cardSize: {
        type: Number,
        default: 200
    }
});
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
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
}

.card-thumbnail {
    width: 100%;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
}

.card-title {
    margin: 10px;
}
</style>
  