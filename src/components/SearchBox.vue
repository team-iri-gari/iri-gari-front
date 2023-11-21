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
  <div class="search-container">
    <input
      type="text"
      v-model="keyword"
      placeholder="검색어 입력"
      class="search-input"
    />
    <button @click="handleSubmit" class="search-button">
      <i class="fa fa-search">▶</i>
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  background-color: #131d2b;
  /* padding: 10px; */
  border: 4px solid #00b4cc;
  border-radius: 5px 0 0 5px;
  width: 100%;
  height: 38px;
  outline: none;
  color: #9dbfaf;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #d1e7ff;
  color: #00b4cc;
  outline: none;
}

.search-button {
  width: 42px;
  height: 48px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #d1e7ff;
  border: none;
}
</style>
