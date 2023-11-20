<script setup>
import SearchBox from "@/components/SearchBox.vue";
import Logo from "@/components/Logo.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};
</script>

<template>
    <div class="content">
        <Logo/>
        <SearchBox :on-submit-search="onSubmitSearch" />
    </div>
</template>

<style scoped>
.content {
  height: 90vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
