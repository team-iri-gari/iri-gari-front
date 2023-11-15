<template>
    <div class="profile-container">
        <img :src="catImageUrl" alt="Cat Profile Image" class="profile-image" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const catImageUrl = ref('');

onMounted(() => {
    fetchCatImage();
});

const fetchCatImage = async () => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        catImageUrl.value = response.data[0].url;
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
};
</script>
  
<style>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.profile-image {
    border-radius: 50%;
    /* 이미지를 동그랗게 만듭니다 */
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>
  