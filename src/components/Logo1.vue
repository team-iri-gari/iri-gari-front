<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
    router.push('/');
};

const props = defineProps({
    size: {
        type: String,
        default: '10vh'
    }
});
</script>

<template>
    <div class="logo" @click="goHome()" :style="{ fontSize: props.size }">
        이리 가리
    </div>
</template>

<style scoped>
.logo {
    text-align: center;
    font-family: YanoljaYacheR;
}
</style>
