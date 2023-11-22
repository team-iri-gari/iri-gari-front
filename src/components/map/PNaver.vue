<script setup>
import { ref, onMounted } from "vue";

var map;

onMounted(() => {
  if (window.naver && window.naver.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NAVER_MAP_SERVICE_KEY
    }`;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new naver.maps.LatLng(37.56658580121631, 126.9777104192369),
    zoom: 10,
  };
  map = new naver.maps.Map(container, options);
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
