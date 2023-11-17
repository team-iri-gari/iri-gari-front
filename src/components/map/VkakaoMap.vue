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
    imageSize = new kakao.maps.Size(35, 38), // 마커 이미지의 크기
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map.value); // 지도 위에 마커를 표출합니다ㅂ
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
  <div style="display: flex; width: 60%">
    <div id="category_container" style="flex: 1 1 15%">
      <ul id="category">
        <li id="BK9" data-order="0">
          <span class="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1">
          <span class="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2">
          <span class="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3">
          <span class="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4">
          <span class="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span class="category_bg store"></span>
          편의점
        </li>
      </ul>
    </div>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  flex: 1 1 75%;
  height: 700px;
}
</style>