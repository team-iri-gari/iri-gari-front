<script setup>
import SearchBox from "@/components/SearchBox.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};
</script>

<template>
    <div class="content">
        <div class="logo">이리 가리</div>
        <SearchBox :on-submit-search="onSubmitSearch" />
    </div>
</template>

<style scoped>
.content {
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.logo {
  text-align: center;
  font-size: 70px;
  font-family: YanoljaYacheR;
  margin-bottom: 20px;
}
</style>
