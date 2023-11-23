<script setup>
import { reactive, ref, onMounted } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import PKakao from "@/components/map/PKakao.vue";
import TagBox from "@/components/TagBox.vue";
import { useAuthStore } from "@/stores/auth";
import { useTagStore } from "@/stores/tags";
import axios from "axios";
import { useRouter } from "vue-router";

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
    const response = await axios.post("http://localhost/api/board/write/plan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
      <input
        type="text"
        id="title"
        name="title"
        v-model="bTitle"
        placeholder=" 제목을 입력해주세요.."
      />
    </div>
    <div class="main-wrapper">
      <div id="plan-box">
        <h4>*여행기록*</h4>
        <hr />
        <div class="card-container" v-for="entry in entries">
          <img :src="entry.img" style="height: 100px" />
          <div class="text-wrapper">
            <p>
              <strong>{{ entry.name }}</strong>
            </p>
            <span>{{ entry.date }}&nbsp;{{ entry.timeStart }} - {{ entry.timeEnd }}</span>
          </div>
        </div>
      </div>
      <div id="form-con">
        <form @submit.prevent="addEntry">
          <label for="name">장소</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="newEntry.name"
            readonly="true"
            style="margin-bottom: 5px"
          /><br />
          <input type="hidden" id="place_id" name="place_id" v-model="newEntry.id" />
          <!-- <MultiImageUpload @images-uploaded="handleImages" /> -->
          <input type="file" id="upfile" name="upfile" ref="fileInput" @change="handleFileChange" />
          <br />
          <label for="date">날짜</label>
          <input type="date" id="date" name="date" v-model="newEntry.date" /><br />

          <label for="time_start">시작 시간</label>
          <input type="time" id="time_start" name="time_start" v-model="newEntry.timeStart" />

          <label for="time_end">종료 시간</label>
          <input type="time" id="time_end" name="time_end" v-model="newEntry.timeEnd" /><br />

          <label for="description">한줄메모</label>
          <input
            type="text"
            id="description"
            name="description"
            v-model="newEntry.description"
          /><br />

          <input type="submit" value="추가" />
        </form>
        <div id="tag-wrapper">
          <label>태그</label>
          <TagBox />
        </div>
      </div>
      <div id="map-container">
        <SearchBox :on-submit-search="onSubmitSearch" />
        <PKakao ref="pkakaoRef" @clickPlace="handleClickPlace" />
      </div>
    </div>
  </div>
  <div id="submit-div">
    <button id="submit-btn" @click="registerPost">기록 등록</button>
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 90vw;
  height: 78vh;
  margin: 90px auto 0 auto;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
}
.title-box {
  display: flex;
  margin-left: 20px;
  padding-top: 20px;
  align-items: center;
}
.title-box label {
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
}
.title-box > input {
  border: none;
  height: 45px;
  width: 80dvw;
  border-radius: 5px;
  background-color: #f0f5fa;
  box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1), inset 3px 3px 5px rgba(0, 0, 0, 0.1);
}
.main-wrapper {
  display: grid;
  grid-template-columns: 3fr 2fr 5fr;
  grid-template-rows: auto;
  column-gap: 20px;
  margin: 20px 30px auto 30px;
}

form,
#plan-box {
  padding: 20px;
  border-radius: 5px; /* 모서리를 둥글게 합니다 */
}

#map-container {
  padding: 0px 20px;
  border-radius: 5px;
  position: relative;
  align-items: start;
}

#plan-box {
  max-height: 65dvh;
  overflow-y: scroll;
}

.card-container {
  /* width: 80%; */
  margin-bottom: 10px;
  display: flex;
  background-color: rgba(92, 107, 192, 0.555);
  border-radius: 6px;
  padding: 10px;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
}
.text-wrapper {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.text-wrapper p {
  margin: 0;
}

#form-con {
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
  text-align: start;
}

#form-con label {
  display: block;
  font-weight: bold;
}

#form-con > input[type="text"],
input[type="date"],
input[type="time"] {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#form-con input[type="submit"] {
  background-color: #e9f5fd;
  border-radius: 5px;
  width: 90%;
  margin-top: 20px;
  height: 30px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
  color: #5c6bc0;
}

#form-con input[type="submit"]:hover {
  box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1), inset 3px 3px 5px rgba(0, 0, 0, 0.1);
}

#submit-div {
  margin: 20px auto;
  text-align: center;
}

#submit-btn {
  padding: 10px 15px 10px 15px;
  border: none;
  color: #5c6bc0;
  font-weight: bold;
  background-color: #e9f5fd;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
}

#submit-btn:hover {
  box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1), inset 3px 3px 5px rgba(0, 0, 0, 0.1);
}

#tag-wrapper {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
