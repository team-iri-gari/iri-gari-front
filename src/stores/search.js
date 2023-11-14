import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    keyword: "",
  }),
  actions: {
    setKeyword(newKeyword) {
      this.keyword = newKeyword;
    },
  },
});
