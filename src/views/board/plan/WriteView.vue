<script setup>
import { reactive, ref, onMounted } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import PKakao from "@/components/map/PKakao.vue";
import TagBox from "@/components/TagBox.vue";
import { useAuthStore } from "@/stores/auth";
import { useTagStore } from "@/stores/tags";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const store = useAuthStore();
const tagStore = useTagStore();

const pkakaoRef = ref(null);
const bTitle = ref("");
const newEntry = reactive({
  name: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  description: "",
  img: "",
  upfile: "",
  x: "",
  y: "",
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
  newEntry.x = placeInfo.px;
  newEntry.y = placeInfo.py;
};

const registerPost = async () => {
  try {
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
      formData.append(`date[${index}]`, entry.date);
      formData.append(`timeStart[${index}]`, entry.timeStart);
      formData.append(`timeEnd[${index}]`, entry.timeEnd);
      formData.append(`description[${index}]`, entry.description);
      formData.append(`placeX[${index}]`, entry.x);
      formData.append(`placeY[${index}]`, entry.y);
    });

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    // console.dir(formData);
    const response = await axios.post(
      "http://localhost/api/board/write/plan",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    router.push("/board/free");
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
  <div class="form-wrapper">
    <div class="title-box">
      <label for="title">여행 이름</label>
      <input type="text" id="title" name="title" v-model="bTitle" />
    </div>
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
        <input
          type="text"
          id="name"
          name="name"
          v-model="newEntry.name"
          readonly="true"
        /><br />
        <input
          type="hidden"
          id="place_id"
          name="place_id"
          v-model="newEntry.id"
        />
        <!-- <MultiImageUpload @images-uploaded="handleImages" /> -->
        <input
          type="file"
          id="upfile"
          name="upfile"
          ref="fileInput"
          @change="handleFileChange"
        />
        <br />
        <br />
        <label for="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          v-model="newEntry.date"
        /><br />

        <label for="time_start">시작 시간</label>
        <input
          type="time"
          id="time_start"
          name="time_start"
          v-model="newEntry.timeStart"
        />

        <label for="time_end">종료 시간</label>
        <input
          type="time"
          id="time_end"
          name="time_end"
          v-model="newEntry.timeEnd"
        /><br />

        <label for="description">한줄메모</label>
        <input
          type="text"
          id="description"
          name="description"
          v-model="newEntry.description"
        /><br />

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
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 90vw;
  height: 80vh;
  margin: 90px auto 0 auto;
  overflow-y: scroll;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.title-box {
  display: flex;
  margin: 20px auto auto 20px;
  align-items: center;
}
.title-box > label {
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
}
.title-box > input {
  border: none;
  height: 45px;
  width: 75dvw;
  border-radius: 5px;
  background-color: #f0f5fa;
  box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1),
    inset 3px 3px 5px rgba(0, 0, 0, 0.1);
}
.container {
  display: flex;
  justify-content: space-between; /* 요소들 사이에 공간을 둡니다 */
  align-items: flex-start; /* 요소들을 상단 정렬합니다 */
  padding: 20px;
  /* box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1); */
}

form,
#plan-box {
  padding: 20px;
  border-radius: 5px; /* 모서리를 둥글게 합니다 */
}

#map-container {
  padding: 0px 20px;
  border-radius: 5px;
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
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  text-align: start;
}

form label {
  display: block;
  font-style: bold;
}

form > input[type="text"],
input[type="date"],
input[type="time"],
input[type="submit"] {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="submit"] {
  color: #5c6bc0; /* 제출 버튼의 글자색을 흰색으로 설정합니다 */
  border: none;
  cursor: pointer; /* 마우스를 올렸을 때 포인터 모양을 변경합니다 */
}

input[type="submit"]:hover {
  background-color: #3949ab; /* 마우스를 올렸을 때 배경색을 변경합니다 */
}
</style>
