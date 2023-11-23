<template>
    <div class="profile-container">
        <img :src="catImageUrl" alt="Cat Profile Image" class="profile-image"
             :style="{ width: props.size + 'px', height: props.size + 'px' }"
             @click="navigateToUserPage" />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
    size: {
        type: Number,
        default: 200 // 기본 크기는 200px
    },
    userid: {
        type: String,
        required: true // userid는 필수 속성입니다
    }
});

const catImageUrl = ref('');
const router = useRouter();

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

const navigateToUserPage = () => {
    router.push(`/user/page/${props.userid}`);
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
    object-fit: cover;
}
</style>
