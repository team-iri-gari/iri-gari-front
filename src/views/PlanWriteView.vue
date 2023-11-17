<script setup>
import { reactive, ref, onMounted } from "vue";
import MultiImageUpload from "../components/MultiImageUpload.vue";
import SearchBox from "@/components/SearchBox.vue";
import PKakao from "@/components/map/PKakao.vue";

const pkakaoRef = ref(null);
const newEntry = reactive({
  name: "",
  upfile: null,
  id: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  description: "",
});
const entries = ref([]);

function addEntry() {
  entries.value.push({ ...newEntry });

  // 폼 입력을 초기화
  Object.keys(newEntry).forEach((key) => {
    if (key === "upfile") {
      newEntry[key] = null;
    } else {
      newEntry[key] = "";
    }
  });

  newEntry[upfile] = null;
}

const onSubmitSearch = (keyword) => {
  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  if (pkakaoRef.value) {
    console.log("카카오 검색 가능");
    pkakaoRef.value.searchPlace(keyword);
  }
};

const handleClickPlace = (placeInfo) => {
  newEntry.name = placeInfo.pname;
  newEntry.id = placeInfo.pid;
};

const handleImages = (images) => {
  if (images > 1) {
    alert("이미지를 한 장만 첨부해주세요");
    return;
  }
  console.log(images[0]);
  newEntry.upfile = images[0];
};

const registerPost = async () => {
  try {
    const formData = new FormData();
  } catch (error) {}
};
</script>

<template>
  <div class="container">
    <div id="plan-box">
      <h3>저장된 데이터</h3>
      <div id="card-container" v-for="entry in entries" class="entry">
        <img :src="entry.upfile" alt="" />
        <p><strong>성함:</strong> {{ entry.name }}</p>
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
      <MultiImageUpload @images-uploaded="handleImages" />
      <br />
      <label for="date">날짜</label>
      <input type="date" id="date" name="date" v-model="newEntry.date" /><br />

      <label for="time_start">시작 시간</label>
      <input type="time" id="time_start" name="time_start" v-model="newEntry.timeStart" />

      <label for="time_end">종료 시간</label>
      <input type="time" id="time_end" name="time_end" v-model="newEntry.timeEnd" /><br />

      <label for="description">한줄메모</label>
      <input type="text" id="description" name="description" v-model="newEntry.description" /><br />

      <label for="tag">태그</label>
      <input type="text" id="tag" name="tag" v-model="newEntry.tag" /><br />

      <input type="submit" value="추가" />
    </form>
    <div id="map-container">
      <SearchBox :on-submit-search="onSubmitSearch" />
      <PKakao ref="pkakaoRef" @clickPlace="handleClickPlace" />
    </div>
  </div>
  <button @click="registerPost">게시물 등록</button>
</template>

<style scoped>
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
