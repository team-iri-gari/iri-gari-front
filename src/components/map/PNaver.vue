<script setup>
import { ref, onMounted, watch } from "vue";

var map = ref(null);
const lat = ref(37.3646656);
const lng = ref(127.108828);
var markerList = [];
const way = ref([]);

const props = defineProps({
  way: {
    type: Array,
    required: true,
  },
  paths: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  if (window.naver && window.naver.maps) {
    initMap(lat.value, lng.value);
  } else {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NAVER_MAP_SERVICE_KEY
    }`;
    script.onload = () => {
      initMap(lat.value, lng.value);
    };
    document.head.appendChild(script);
  }
});

watch(
  [() => props.paths, () => props.way],
  ([newValue, newWay], [oldValue, oldWay]) => {
    if (newValue && newValue.length > 0 && newWay) {
      lat.value = newValue[0][1];
      lng.value = newValue[0][0];
      way.value = newWay;

      if (map.value) {
        updateCenter(lat.value, lng.value);
        makeMarker();
        makePolyline(newValue);
      } else {
        initMap(lat.value, lng.value);
        makeMarker();
        makePolyline(newValue);
      }
    }
  },
  { immediate: true }
);

const updateCenter = (lat, lng) => {
  const newCenter = new naver.maps.LatLng(lat, lng);
  map.value.setCenter(newCenter);
};

const makeMarker = () => {
  for (let i = 0; i < way.value.length; i++) {
    console.log(way.value[i]);
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(way.value[i].placeY, way.value[i].placeX),
      map: map.value,
    });

    markerList.push(marker);
  }
};

const makePolyline = (paths) => {
  var polyline = new naver.maps.Polyline({
    map: map.value,
    path: paths.map((coords) => new naver.maps.LatLng(coords[1], coords[0])),
    clickable: true,
    strokeColor: "#ff0000",
    strokeWeight: 5,
  });
};

const initMap = (lat, lng) => {
  const container = document.getElementById("map");
  const options = {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 16,
  };
  map.value = new naver.maps.Map(container, options);

  // makePolyline();
};
</script>

<template>
  <div id="map" style="overflow: inherit"></div>
</template>

<style scoped>
#map {
  flex-grow: 1;
  position: relative;

  height: 100dvh;
  text-align: center;
}
</style>
