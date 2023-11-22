<template>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" :style="{ width, height }">
        <div class="carousel-inner">
            <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item" :class="{ active: index === 0 }" data-bs-interval="3000">
                <img :src="item.imgSrc" class="d-block w-100" :alt="item.altText" :style="{ width, height }">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps } from 'vue';

const carouselItems = ref([
    { imgSrc: '/images/carousel/1.webp', altText: 'First slide' },
    { imgSrc: '/images/carousel/2.webp', altText: 'Second slide' },
    { imgSrc: '/images/carousel/3.webp', altText: 'Third slide' }
]);

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: 'auto'
    }
});
</script>
