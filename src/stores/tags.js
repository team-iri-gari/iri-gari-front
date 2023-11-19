import { defineStore } from 'pinia';

export const useTagStore = defineStore('tagStore', {
  state: () => ({
    tags: [],
    focusIndex: null,
    errorMsg: null,
    helpVisible: true
  }),
  actions: {
    addTag(value) {
      if (this.tags.some(tag => tag.value === value)) {
        this.errorMsg = "중복된 단어를 입력하셨습니다.";
        return;
      }

      const regex = /[~!@#$%^&*()+|<>?:{},.="':;/-]/;
      if (regex.test(value)) {
        this.errorMsg = "특수문자는 태그로 등록할 수 없습니다.";
        return;
      }

      this.tags.push({ value, select: false });
      this.errorMsg = null;
      this.helpVisible = false;
    },
    deleteTag(idx) {
      if (idx !== null && idx >= 0) {
        this.tags.splice(idx, 1);
        this.focusIndex = null;
      }
    },
    selectTag(idx) {
      this.focusIndex = idx;
      this.tags.forEach((tag, index) => {
        tag.select = index === idx;
      });
    },
    clearErrorMsg() {
      this.errorMsg = null;
    },
    setVisible() {
      this.helpVisible = false;
    }
  }
});
