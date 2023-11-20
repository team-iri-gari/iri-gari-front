<script setup>
import { ref } from "vue";

const keyword = ref("");
const props = defineProps({
  onSubmitSearch: Function,
});

const handleSubmit = () => {
  if (keyword.value && props.onSubmitSearch) {
    props.onSubmitSearch(keyword.value);
  }
};
</script>

<template>
  <div class="main-container">
    <input type="text" v-model="keyword" placeholder="검색어 입력" class="search-input" />
    <button @click="handleSubmit" class="search-button">검색</button>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
