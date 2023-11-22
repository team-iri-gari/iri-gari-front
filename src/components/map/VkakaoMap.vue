<script setup>
import { useSearchStore } from "@/stores/search.js";
import { ref, onMounted } from "vue";

const searchStore = useSearchStore();
var map = ref(null);
var currCategory = ref("");
var cateMarkers = ref([]);
var infowindow;

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () =>
      kakao.maps.load(() => {
        initMap(), setupCategoryClickEvents();
      });
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.56658580121631, 126.9777104192369),
    level: 5,
  };
  map.value = new kakao.maps.Map(container, options);
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  var ps = new kakao.maps.services.Places();
  // console.log(searchStore.keyword);
  ps.keywordSearch(searchStore.keyword, placesSearchCB);
};

function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.value.setBounds(bounds);
  }
}

// 검색 장소 표출
function displayMarker(place) {
  var marker = new kakao.maps.Marker({
    map: map.value,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    infowindow.open(map.value, marker);
  });
}

function setupCategoryClickEvents() {
  document.querySelectorAll("#category li").forEach((item) => {
    item.addEventListener("click", function () {
      var psm = new kakao.maps.services.Places(map.value);
      currCategory.value = this.id;
      removeMarker();
      psm.categorySearch(currCategory.value, searchCG, { useMapBounds: true });
    });
  });
}
// 카테고리 별 장소 검색이 완료됐을 때 호출되는 콜백 함수
function searchCG(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    console.log("none");
  } else if (status === kakao.maps.services.Status.ERROR) {
    console.log("error");
  }
}

function displayPlaces(places) {
  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시
    var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x));

    // 마커와 검색결과 항목을 클릭 했을 때 장소정보를 표출하도록 클릭 이벤트를 등록
    (function (marker, place) {
      kakao.maps.event.addListener(marker, "click", function () {
        console.log(place.place_name);
      });
    })(marker, places[i]);
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position) {
  var imageSrc = `/images/${currCategory.value}.png`, // 마커 이미지
    imageSize = new kakao.maps.Size(35, 43), // 마커 이미지의 크기
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map.value); // 지도 위에 마커를 표출합니다
  cateMarkers.value.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

function removeMarker() {
  for (var i = 0; i < cateMarkers.value.length; i++) {
    cateMarkers.value[i].setMap(null);
  }
  cateMarkers.value = [];
}
</script>

<template>
  <div style="width: 60%; display: flex">
    <div id="map"></div>
    <div class="category_container">
      <ul id="category">
        <li id="CT1" data-order="0">
          <label>
            <input type="checkbox" name="CT1" id="CT1" />
            <div class="icon-box culture">
              <img src="/images/CT1-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>문화시설</div> -->
        </li>
        <li id="AT4" data-order="1">
          <label>
            <input type="checkbox" name="AT4" id="AT4" />
            <div class="icon-box attraction">
              <img src="/images/AT4-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>관광명소</div> -->
        </li>
        <li id="MT1" data-order="2">
          <label>
            <input type="checkbox" name="MT1" id="MT1" class="check-input" />
            <div class="icon-box mart">
              <img src="/images/MT1-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>마트</div> -->
        </li>
        <li id="BK9" data-order="3">
          <label>
            <input type="checkbox" name="BK9" id="BK9" />
            <div class="icon-box bank">
              <img src="/images/BK9-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>은행</div> -->
        </li>
        <li id="PK6" data-order="4">
          <label>
            <input type="checkbox" name="PK6" id="PK6" />
            <div class="icon-box park">
              <img src="/images/PK6-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>주차장</div> -->
        </li>
        <li id="AD5" data-order="5">
          <label>
            <input type="checkbox" name="AD5" id="AD5" />
            <div class="icon-box accom">
              <img src="/images/AD5-mark.png" style="height: 30px" class="fa" />
            </div>
          </label>
          <!-- <div>숙박</div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  width: 80dvw;
  height: 100dvh;
}
.category_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
}
ul {
  display: flex;
  flex-direction: column;
  height: 60dvh;
  justify-content: space-around; /* 요소들 사이의 공간을 균등하게 분배 */
  padding-inline-start: 0;

  & li {
    display: list-item;
    position: relative;
    width: 100px;
    list-style: none;
    margin: 10px;
    padding: 5px;
    text-align: center;

    & label {
      position: relative;
      cursor: pointer;

      & input[type="checkbox"] {
        position: absolute;
        opacity: 0;
      }

      & :checked ~ .icon-box {
        box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1), inset 3px 3px 5px rgba(0, 0, 0, 0.1);

        & .fa {
          transform: scale(0.95);
        }
      }

      & .icon-box {
        width: 60px;
        height: 60px;
        background: #ebf5fc;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -2px -2px 5px rgba(255, 255, 255, 1), 3px 3px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        & .fa {
          font-size: 30px;
          color: #6a9bd8;
        }
      }
    }
  }
}
#category li:hover {
  color: aquamarine;
}
</style>
