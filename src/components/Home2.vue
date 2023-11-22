<template>
    <div id="container" class="carousel slide carousel-fade" data-bs-ride="carousel" :style="{ width, height }" ref="carousel">
        <div class="carousel-inner">
            <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item" :class="{ active: index === 0 }"
                data-bs-interval="3000">
                <img :src="item.imgSrc" class="d-block w-100" :alt="item.altText" :style="{ width, height }">
            </div>
            <!-- overlay-content 위치 이동 필요 없음 -->
        </div>
        <div class="overlay-content">
            <div class="logo-wrapper">
                <div id="logo">
                    <Logo />
                </div>
            </div>
            <div id="banner">
                <img src="/images/logo/irigari-en.png" style="height: 13dvh" />
                <SearchBox :on-submit-search="onSubmitSearch" style="margin: auto" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBox from "@/components/SearchBox.vue";
import Logo from "@/components/common/Logo.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};

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

<style scoped>
#container {
    width: 100%;
    height: 90vh;
    position: relative;
}

.carousel-item::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.carousel-item img {
    opacity: 0.8;
    filter: blur(2px);
}

.overlay-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.logo-wrapper {
    display: table;
}

#logo {
    display: table-cell;
    vertical-align: middle;
    margin-left: 15px;
}

#banner {
    justify-self: center;
    margin: auto 0 auto 15px;
    z-index: 16;
}
</style>
