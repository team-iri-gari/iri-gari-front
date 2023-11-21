<template>
  <article id="sandbox">
    <div
      class="circle"
      :id="tag.id"
      :name="tag.name"
      v-for="(tag, index) in tags"
      :key="tag.id"
      :style="{
        backgroundColor: tag.color,
        width: tag.size + 'px',
        height: tag.size + 'px',
        lineHeight: tag.size + 'px',
        fontSize: tag.fontSize + 'px',
      }"
      @mousedown="logEvent"
    >
      {{ tag.name }}
    </div>
  </article>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Matter from "matter-js";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;

let engine, render;
let tags = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost/api/tag/recommend");
    tags.value = response.data;
    addCircles(tags.value);
  } catch (error) {
    console.error("Error:", error);
  }
});

// 랜덤 색상 생성 함수
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const calculateFontSize = (size) => {
  // 크기에 따라 폰트 사이즈를 계산하되, 최소 폰트 사이즈를 설정할 수 있습니다.
  const minFontSize = 12; // 최소 폰트 사이즈
  return Math.max(minFontSize, size / 2); // 예시: 동그라미 크기의 절반, 단 최소 사이즈는 minFontSize
};

const circles = [];

function addCircles(tags) {
  tags.forEach((tag, index) => {
    // hit 값에 따라 크기를 계산
    const size = calculateSize(tag.hit);
    const mass = tag.hit; // 질량 계산 함수를 따로 만들거나 직접 계산
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const circle = Bodies.circle(x, y, size, { isStatic: false, mass: mass });
    circles.push(circle);
    tag.size = size * 2; // DOM 요소의 크기는 반지름의 두 배
    tag.fontSize = calculateFontSize(tag.size); // 폰트 사이즈 계산 및 할당
    tag.color = getRandomColor();
  });
  World.add(engine.world, circles);
}

engine = Engine.create();
engine.world.gravity.y = 0;

render = Render.create({
  element: document.getElementById("sandbox"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "transparent",
  },
});

Events.on(engine, "beforeUpdate", () => {
  Matter.Composite.allBodies(engine.world).forEach((body) => {
    if (!body.isStatic) {
      applyGravity(body);
    }
  });
});

requestAnimationFrame(run(engine, circles));

Engine.run(engine);
Render.run(render);

const calculateSize = (hit) => {
  // 예: hit 값의 제곱근에 10을 곱하여 크기를 계산
  return Math.sqrt(hit) * 20;
};

function run(engine, bodies) {
  return () => {
    window.requestAnimationFrame(run(engine, bodies));
    Engine.update(engine);

    bodies.forEach((body, index) => {
      let element = document.getElementById(tags.value[index].id);
      if (element) {
        let x = body.position.x - calculateSize(tags.value[index].hit);
        let y = body.position.y - calculateSize(tags.value[index].hit);
        element.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  };
}

function applyGravity(body) {
  const dx = window.innerWidth / 2 - body.position.x;
  const dy = window.innerHeight / 2 - body.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const gravityConstant = 0.0001;

  const gravity = {
    x: (dx / distance) * gravityConstant * body.mass,
    y: (dy / distance) * gravityConstant * body.mass,
  };

  Body.applyForce(body, body.position, gravity);
}

function logEvent(event) {
  console.log(event.target.getAttribute("name"));
  router.push("/search/" + event.target.getAttribute("name"));
}
</script>

<style>
#sandbox {
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.circle {
  font-family: YanoljaYacheR;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  position: absolute;
  border-radius: 50%;
}
</style>
