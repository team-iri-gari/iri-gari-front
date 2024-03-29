<template>
    <div class="comp_hashtag" @click="setHashtags" ref="group">
        <p class="help" v-if="helpVisible">{{ defaultPlaceholder }}</p>

        <!-- Hashtags -->
        <div class="tags" v-if="!helpVisible">
            <input type="text" class="fake" ref="fake" @keydown.backspace.prevent="deleteTag(focusIndex)"
                @keydown.delete.prevent="deleteTag(focusIndex)" />
            <span class="tag" v-for="(row, index) in tags" :key="index" :class="{ active: row.select }"
                @click="selectTag(index)">{{ row.value }}</span>
        </div>
        <!--// Hashtags -->

        <div class="inp" v-show="!helpVisible">
            <input type="text" ref="input" v-model.trim="value" @focus="initSelect" @keydown.space.prevent="addHashTags"
                @keydown.enter.prevent="addHashTags" @keydown.backspace="initErrorMsg" @keydown.delete="initErrorMsg"
                placeholder="태그입력" />
        </div>

        <transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
            leave-active-class="animate__animated animate__fadeOut">
            <p class="noti" v-if="errorMsg">{{ errorMsg }}</p>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTagStore } from '@/stores/tags';

const tagStore = useTagStore();
const group = ref(null);
const fake = ref(null);
const input = ref(null);

const defaultPlaceholder = computed(() => tagStore.placeholder ? tagStore.placeholder : "#추천태그 #특수문자제외");
const helpVisible = computed(() => tagStore.helpVisible);
const tags = computed(() => tagStore.tags);
const focusIndex = computed(() => tagStore.focusIndex);
const errorMsg = computed(() => tagStore.errorMsg);
const value = ref("");

const setHashtags = () => {
  if (tagStore.tags.length > 0) {
    return;
  }
  tagStore.setVisible();
  input.value.focus();
};

const addHashTags = () => {
  if (!value.value) {
    tagStore.clearErrorMsg();
    return;
  }
  tagStore.addTag(value.value);
  value.value = '';
};

const deleteTag = (index) => {
  tagStore.deleteTag(index);
};

const selectTag = (index) => {
  tagStore.selectTag(index);
};

const initSelect = () => {
  if (tagStore.tags.some(tag => tag.select)) {
    tagStore.selectTag(null);
  }
};

const initErrorMsg = () => {
  tagStore.clearErrorMsg();
};
</script>
  
<style lang="scss" scoped>
.comp_hashtag {
    position: relative;
    width: 100%;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 40px;
    margin: 10px auto;
    text-align: left;
    box-sizing: border-box;

    .noti {
        position: absolute;
        left: 0;
        top: 100%;
        font-size: 12px;
        margin-top: 5px;
        padding: 0 5px;
        border-radius: 4px;
        border: 1px solid #ea2136;
        color: #ea2136;
        text-align: left;
        line-height: 2;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .help {
        padding: 0;
        margin: 0;
        line-height: 30px;
        font-weight: 300;
        font-size: 14px;
        color: #ccc;
        vertical-align: top;
    }

    .tags {
        position: relative;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        margin-bottom: -6px;

        .fake {
            position: absolute;
            width: 1px;
            height: 1px;
            left: -1px;
            right: -1px;
            padding: 0;
            border: 0;
            outline: none;
            -webkit-appearance: none;
            -webkit-text-size-adjust: none;
        }

        .tag {
            display: inline-block;
            position: relative;
            margin: 0 5px 6px 0;
            padding: 0 5px;
            line-height: 30px;
            border-radius: 5px;
            background-color: #eee;
            vertical-align: top;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 13px;
            text-align: left;

            &:hover:after {
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid #aaa;
                content: "";
                border-radius: 5px;
            }

            &:before {
                display: inline;
                content: "#";
            }

            &.active {
                background-color: #656565;
                color: #fff;

                &:hover:after {
                    display: none;
                }
            }
        }
    }

    .inp {
        display: inline-block;
        overflow: hidden;
        height: 30px;
        width: 150px;
        vertical-align: top;
        font-family: "Noto Sans KR", "Malgun Gothic", "굴림", Gulim, "돋움", Dotum,
            Sans-serif;

        &:before {
            display: inline;
            position: relative;
            top: -1px;
            content: "#";
            color: #3e3e3e;
            margin-right: 2px;
            vertical-align: top;
            line-height: 30px;
        }

        input {
            width: 135px;
            height: 28px;
            vertical-align: top;
            color: #3e3e3e;
            -webkit-appearance: none;
            -webkit-text-size-adjust: none;
            padding: 0;
            border: 0;
            outline: none;
            vertical-align: top;
            font-family: "Noto Sans KR", "Malgun Gothic", "굴림", Gulim, "돋움", Dotum,
                Sans-serif;
        }
    }
}
</style>
  