<script setup></script>

<template>
  <div class="container">
    <form action="/submit" method="post">
      <!-- form의 action과 method는 서버 설정에 맞게 수정하세요. -->
      <label for="name">성함</label>
      <input type="text" id="name" name="name" /><br />

      <label for="date">날짜</label>
      <input type="date" id="date" name="date" /><br />

      <label for="time_start">시작 시간</label>
      <input type="time" id="time_start" name="time_start" />

      <label for="time_end">종료 시간</label>
      <input type="time" id="time_end" name="time_end" /><br />

      <label for="description">한줄메모</label>
      <input type="text" id="description" name="description" /><br />

      <label for="tag">태그</label>
      <input type="text" id="tag" name="tag" /><br />

      <input type="submit" value="등록" />
    </form>

    <div id="map">map</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between; /* 요소들 사이에 공간을 둡니다 */
  align-items: flex-start; /* 요소들을 상단 정렬합니다 */
  padding: 20px;
}

form,
#map {
  flex-basis: 48%; /* form과 map이 차지하는 공간의 비율을 설정합니다 */
  margin: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과를 추가합니다 */
  border-radius: 5px; /* 모서리를 둥글게 합니다 */
  background: #fff; /* 배경색을 흰색으로 설정합니다 */
}

#map {
  height: 600px; /* 높이를 설정합니다 */
  text-align: center;
  color: #888; /* 글자색을 설정합니다 */
}

label {
  display: block; /* 라벨을 블록 요소로 만들어 줄 바꿈 효과를 줍니다 */
  margin-bottom: 5px; /* 라벨과 입력칸 사이의 간격을 설정합니다 */
}

input[type="text"],
input[type="date"],
input[type="time"],
input[type="submit"] {
  width: 100%; /* 입력칸의 너비를 최대로 설정합니다 */
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
