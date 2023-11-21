<script setup>
import { reactive, ref, onMounted } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import PKakao from "@/components/map/PKakao.vue";
import TagBox from "@/components/TagBox.vue";
import { useAuthStore } from "@/stores/auth";
import { useTagStore } from "@/stores/tags";
import Tagify from "@yaireo/tagify";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const store = useAuthStore();
const tagStore = useTagStore();

const pkakaoRef = ref(null);
const bTitle = ref("");
const newEntry = reactive({
  name: "",
  id: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  description: "",
  img: "",
  upfile: "",
});
const entries = ref([]);
const tagInput = ref(null);

function addEntry() {
  entries.value.push({ ...newEntry });

  // 폼 입력을 초기화
  Object.keys(newEntry).forEach((key) => {
    newEntry[key] = "";
  });

  const fileDesc = document.getElementById("upfile");
  fileDesc.value = "";
}

const onSubmitSearch = (keyword) => {
  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  if (pkakaoRef.value) {
    pkakaoRef.value.searchPlace(keyword);
  }
};

const handleClickPlace = (placeInfo) => {
  newEntry.name = placeInfo.pname;
  newEntry.id = placeInfo.pid;
};

const registerPost = async () => {
  try {
    console.log(entries.value);
    console.log(store.userData.userInfo.name);
    const formData = new FormData();
    formData.append("name", store.userData.userInfo.name);
    formData.append("title", bTitle.value);

    let tagValues = tagStore.tags.map((tag) => tag.value);
    formData.append("tagList", JSON.stringify(tagValues));

    entries.value.forEach((entry, index) => {
      if (entry.upfile) {
        formData.append(`upfile`, entry.upfile);
      }

      formData.append(`placeIdx[${index}]`, index);
      formData.append(`placeName[${index}]`, entry.name);
      formData.append(`placeId[${index}]`, entry.id);
      formData.append(`date[${index}]`, entry.date);
      formData.append(`timeStart[${index}]`, entry.timeStart);
      formData.append(`timeEnd[${index}]`, entry.timeEnd);
      formData.append(`description[${index}]`, entry.description);
    });

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    // console.dir(formData);
    const response = await axios.post("http://localhost/api/board/write/plan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    router.push('/board/free');
  } catch (error) {
    console.log("Error : ", error);
  }
};

function handleFileChange(event) {
  console.log(event.target.files);
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newEntry.img = e.target.result;
    };
    reader.readAsDataURL(file);
    newEntry.upfile = file;
  }
}
</script>

<template>
  <label for="title">제목</label>
  <input type="text" id="title" name="title" v-model="bTitle" />
  <div class="container">
    <div id="plan-box">
      <h3>저장된 데이터</h3>
      <div id="card-container" v-for="entry in entries" class="entry">
        <img :src="entry.img" style="height: 100px" />
        <p><strong>장소:</strong> {{ entry.name }}</p>
        <p><strong>날짜:</strong> {{ entry.date }}</p>
        <p><strong>시작 시간:</strong> {{ entry.timeStart }}</p>
        <p><strong>종료 시간:</strong> {{ entry.timeEnd }}</p>
        <p><strong>한줄메모:</strong> {{ entry.description }}</p>
        <p><strong>태그:</strong> {{ entry.tag }}</p>
        <p>==================================</p>
      </div>
    </div>
    <form @submit.prevent="addEntry">
      <label for="name">장소</label>
      <input type="text" id="name" name="name" v-model="newEntry.name" readonly="true" /><br />
      <input type="hidden" id="place_id" name="place_id" v-model="newEntry.id" />
      <!-- <MultiImageUpload @images-uploaded="handleImages" /> -->
      <input type="file" id="upfile" name="upfile" ref="fileInput" @change="handleFileChange" />
      <br />
      <br />
      <label for="date">날짜</label>
      <input type="date" id="date" name="date" v-model="newEntry.date" /><br />

      <label for="time_start">시작 시간</label>
      <input type="time" id="time_start" name="time_start" v-model="newEntry.timeStart" />

      <label for="time_end">종료 시간</label>
      <input type="time" id="time_end" name="time_end" v-model="newEntry.timeEnd" /><br />

      <label for="description">한줄메모</label>
      <input type="text" id="description" name="description" v-model="newEntry.description" /><br />

      <input type="submit" value="추가" />
    </form>
    <div id="map-container">
      <SearchBox :on-submit-search="onSubmitSearch" />
      <PKakao ref="pkakaoRef" @clickPlace="handleClickPlace" />
    </div>
  </div>
  <div>
    <label for="tag">태그</label>
    <TagBox />
  </div>
  <button @click="registerPost">게시물 등록</button>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between; /* 요소들 사이에 공간을 둡니다 */
  align-items: flex-start; /* 요소들을 상단 정렬합니다 */
  padding: 20px;
}

form,
#map-container,
#plan-box {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과를 추가합니다 */
  border-radius: 5px; /* 모서리를 둥글게 합니다 */
  background: #fff; /* 배경색을 흰색으로 설정합니다 */
}

#plan-box {
  overflow-y: auto;
  flex-basis: 30%;
  height: 580px;
}

#map-container {
  position: relative;
  align-items: start;
  flex-basis: 45%;
}

form {
  flex-basis: 10%;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="time"],
input[type="submit"] {
  width: 90%; /* 입력칸의 너비를 최대로 설정합니다 */
  padding: 10px;
  margin-bottom: 15px; /* 입력칸 사이의 간격을 설정합니다 */
  border: 1px solid #ccc;
  border-radius: 5px; /* 입력칸의 모서리를 둥글게 합니다 */
}

input[type="submit"] {
  background-color: #5c6bc0; /* 제출 버튼의 배경색을 설정합니다 */
  color: white; /* 제출 버튼의 글자색을 흰색으로 설정합니다 */
  border: none;
  cursor: pointer; /* 마우스를 올렸을 때 포인터 모양을 변경합니다 */
}

input[type="submit"]:hover {
  background-color: #3949ab; /* 마우스를 올렸을 때 배경색을 변경합니다 */
}
</style>
