<script setup>
import { ref, onMounted, watch } from "vue";

var map = ref(null);
const lat = ref(37.3646656);
const lng = ref(127.108828);

const props = defineProps({
  paths: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  if (window.naver && window.naver.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NAVER_MAP_SERVICE_KEY
    }`;
    script.onload = () => {
      initMap(lat, lng);
    };
    document.head.appendChild(script);
  }
});

watch(
  () => props.paths,
  (newValue, oldValue) => {
    if (newValue && newValue.length > 0 && map.value) {
      lat.value = props.paths[0][1];
      lng.value = props.paths[0][0];
      initMap(lat.value, lng.value);
    }
  },
  { immediate: true }
);

const makePolyline = () => {
  var polyline = new naver.maps.Polyline({
    map: map,
    path: paths.map((coords) => new naver.maps.LatLng(coords[1], coords[0])),
    clickable: true,
    strokeColor: "#5347AA",
    strokeStyle: "longdash",
    strokeOpacity: 0.5,
    strokeWeight: 5,
  });
};

const initMap = (lat, lng) => {
  const container = document.getElementById("map");
  const options = {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 10,
  };
  map.value = new naver.maps.Map(container, options);

  makePolyline();
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
