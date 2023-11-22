<script setup></script>

<template>
  <div class="container">
    <div class="star star-1"></div>
    <div class="star star-2"></div>
    <div class="star star-3"></div>
    <div class="star star-4"></div>
    <div class="star star-5"></div>
    <div class="orbit orbit-1"></div>
    <div class="orbit orbit-2"></div>
    <div class="orbit orbit-3"></div>
    <div class="planet"></div>
    <div class="waves">
      <svg class="wave wave-1" viewbox="7.5 0 60 10">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stop-color="#174A69" />
            <stop offset="65%" stop-color="#3D9C94" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0 20 V40 Q5 0 10 5 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V30"
        />
      </svg>
      <svg class="wave wave-2" viewbox="7.5 0 60 10">
        <path
          fill="url(#gradient)"
          d="M0 20 V40 Q5 0 10 5 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V30"
        />
      </svg>
      <svg class="wave wave-3" viewbox="7.5 0 60 10">
        <path
          fill="url(#gradient)"
          d="M0 20 V40 Q5 0 10 5 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V30"
        />
      </svg>
      <svg class="wave wave-4" viewbox="7.5 0 60 10">
        <path
          fill="url(#gradient)"
          d="M0 20 V30 Q5 0 10 5 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V40"
        />
      </svg>
      <svg class="wave wave-5" viewbox="7.5 0 60 10">
        <path
          fill="url(#gradient)"
          stroke-width="5"
          d="M0 20 V40 Q5 0 10 5 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V30"
        />
      </svg>
    </div>
    <div class="sub-planet"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 50%;
  background: #173c57;
  border: 10px solid white;
  margin: auto 0 auto 0;
  z-index: 2;
  box-shadow: 0 0 20px rgba(black, 0.3);
}

.planet {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #70dec1 0%, #70dec1 30%, #7db9e8 100%);
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: planet-pulse 5s infinite linear;
}

.sub-planet {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #aee69b 1%, #498da4 50%, #0a404a 100%);
  position: absolute;
  top: 25%;
  left: 70%;
}

.wave {
  position: absolute;
  bottom: 0;
  transform: scale(4);
  z-index: 10;

  &.wave-1 {
    left: 49px;
    bottom: -95px;
    z-index: 11;
  }

  &.wave-2 {
    left: 75px;
    bottom: -113px;
    z-index: 12;
  }

  &.wave-3 {
    left: 110px;
    bottom: -138px;
    z-index: 13;
  }

  &.wave-4 {
    left: 73px;
    bottom: -155px;
    z-index: 14;
  }

  &.wave-5 {
    left: 180px;
    bottom: -180px;
    z-index: 15;
  }
}

.orbit {
  width: 1px;
  height: 1px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 0 0 0 5px rgba(white, 0.02), 0 0 0 10px rgba(white, 0.05);
}

@for $i from 1 through 5 {
  .wave-#{$i} {
    animation: wave 2s #{$i}s ease-out infinite;
  }
}

@for $i from 1 through 3 {
  .orbit-#{$i} {
    animation: orbit-#{$i} 10s * $i linear infinite;
  }

  @keyframes orbit-#{$i} {
    from {
      transform: rotate(0deg) translateX(100px + 15px * $i) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(100px + 15px * $i) rotate(-360deg);
    }
  }
}

@keyframes wave {
  0% {
    transform: translate(0, 0) scale(2);
  }
  50% {
    transform: translate(10px, 10px) scale(2);
  }
  100% {
    transform: translate(0, 0) scale(2);
  }
}

@keyframes anim {
  from {
    transform: rotate(0deg) translateX(50px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(50px) rotate(-360deg);
  }
}

.star {
  z-index: 50;
  position: absolute;
  left: 0;
  top: 50px;
  width: 1px;
  height: 1px;
  box-shadow: 0 0 0 5px rgba(white, 0.02), 0 0 0 10px rgba(white, 0.05);
  border-radius: 50%;
  background-color: white;
  animation: shooting 5s linear infinite;

  &:before {
    content: "";
    position: absolute;
    width: 100px;
    height: 1px;
    right: 1px;
    top: 0;
    background: linear-gradient(to right, rgba(black, 0) 0%, rgba(white, 0.4) 100%);
  }
}

.star-2 {
  top: 100px;
  left: -100px;
  animation: shooting 8s 1s linear infinite;
}
.star-3 {
  top: 250px;
  left: -250px;
  animation: shooting 3s 2s linear infinite;
}
.star-4 {
  top: 50px;
  left: -50px;
  animation: shooting 3s 2s linear infinite;
}
.star-5 {
  top: 150px;
  left: -150px;
  animation: shooting 3s 2s linear infinite;
}

@keyframes shooting {
  0% {
    transform: translate(-100px, -100px) rotate(45deg) scale(1);
  }
  100% {
    transform: translate(calc(100% + 300px), calc(100% + 300px)) rotate(45deg) scale(1.5);
  }
}

@keyframes planet-pulse {
  0% {
    box-shadow: 0 0 0 15px rgba(#70bfbc, 0.1), 0 0 0 30px rgba(#70bfbc, 0.1),
      0 0 0 45px rgba(#70bfbc, 0.1);
  }

  50% {
    box-shadow: 0 0 0 30px rgba(#70bfbc, 0.1), 0 0 0 45px rgba(#70bfbc, 0.1),
      0 0 0 60px rgba(#70bfbc, 0.1);
  }

  100% {
    box-shadow: 0 0 0 15px rgba(#70bfbc, 0.1), 0 0 0 30px rgba(#70bfbc, 0.1),
      0 0 0 45px rgba(#70bfbc, 0.1);
  }
}
</style>
