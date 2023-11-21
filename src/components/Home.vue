<script setup>
import SearchBox from "@/components/SearchBox.vue";
import Logo from "../components/common/Logo.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};

</script>

<template>
  <div class="content">
    <div class="logo">
      <Logo />
    </div>
    <div>
      <p style="color: white">어디든 떠나보아요</p>
    </div>
    <SearchBox :on-submit-search="onSubmitSearch" style="margin: auto" />
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

</style>
