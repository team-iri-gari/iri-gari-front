<template>
  <div class="card-board">
    <div
      v-for="card in cards"
      :key="card.articleId"
      class="card"
      :style="{ width: cardSize, height: '300px' }"
      @click="navigateTo(card.boardTypeId, card.articleId)"
    >
      <div class="card-img">
        <img
          :src="getImg(card.img)"
          alt="Card Thumbnail"
          class="card-thumbnail"
        />
      </div>
      <div class="card-title">
        <p>
          <strong>{{ card.title }}</strong>
        </p>
        <p style="font-size: 13px">
          {{ card.name }} <br />
          {{ card.regDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  cardSize: {
    type: String,
    default: "200px",
  },
});

const router = useRouter();
const navigateTo = (type, id) => {
  console.log(type);
  router.push("/post/" + (type === 1 ? "free" : "plan") + "/" + id);
};

const getImg = (url) => {
  // if(url == "null.png")
  //     return `https://cataas.com/cat`
  // else
  //     return `https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${url}`
  return `https://iri-gari-image-server.s3.ap-northeast-2.amazonaws.com/${url}`;
};
</script>

<style scoped>
.card-board {
  width: 80%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 50px;
  row-gap: 20px;
  padding: 25px;
  /* flex-wrap: wrap;
    justify-content: space-around; */
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  overflow: hidden;
}

.card-thumbnail {
  position: absolute; /* 절대 위치 설정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 15px;
}

.card-title {
  position: absolute;
  bottom: 0;
  width: 100%; /* 부모 너비에 맞게 설정 */
  margin: 0; /* 기본 마진 제거 */
  padding: 5px; /* 패딩 추가 */
  text-align: left;
  font-size: 15px;
}
</style>
