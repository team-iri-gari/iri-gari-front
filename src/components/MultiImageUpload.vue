<template>
  <div>
    <input type="file" accept="image/*" ref="fileInput" multiple @change="handleImageUpload" />
    <div v-for="(img, index) in compressedImages" :key="index">
      <h3>압축된 이미지 미리보기 {{ index + 1 }}:</h3>
      <img :src="img" alt="Compressed Image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imageCompression from "browser-image-compression";

const compressedImages = ref([]);
const emit = defineEmits(["imagesUploaded"]);

async function handleImageUpload(event) {
  const files = Array.from(event.target.files);
  compressedImages.value = [];

  for (let file of files) {
    try {
      const compressedFile = await compressImage(file);
      compressedImages.value.push(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error("Error during image compression:", error);
      alert(`이미지 압축 중 오류가 발생했습니다: ${file.name}`);
    }
  }

  emit("imagesUploaded", compressedImages.value);
}

async function compressImage(imageFile) {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };
  return await imageCompression(imageFile, options);
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>
