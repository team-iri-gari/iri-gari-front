<template>
    <div id="sandbox">
        <div class="circle" id="circle1" @mousedown="logEvent">서울</div>
        <div class="circle" id="circle2">대전</div>
        <div class="circle" id="circle3">구미</div>
        <div class="circle" id="circle4">광주</div>
    </div>
</template>
  
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import Matter from 'matter-js';

let engine, render;

onBeforeUnmount(() => {
    // 필요한 경우 Matter.js 엔진을 정리합니다.
});

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Events = Matter.Events;

engine = Engine.create();
engine.world.gravity.y = 0;

render = Render.create({
    element: document.getElementById('sandbox'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

const circles = [
    Bodies.circle(80, 100, 40, { isStatic: false }),
    Bodies.circle(230, 100, 40, { isStatic: false }),
    Bodies.circle(380, 100, 40, { isStatic: false }),
    Bodies.circle(400, 100, 40, { isStatic: false })
];

World.add(engine.world, circles);

Events.on(engine, 'beforeUpdate', () => {
    Matter.Composite.allBodies(engine.world).forEach((body) => {
        if (!body.isStatic) {
            applyGravity(body);
        }
    });
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(engine.world, mouseConstraint);

requestAnimationFrame(run(engine, circles));

Engine.run(engine);
Render.run(render);

function run(engine, bodies) {
    return () => {
        window.requestAnimationFrame(run(engine, bodies));
        Engine.update(engine);

        bodies.forEach((body, index) => {
            let element = document.getElementById('circle' + (index + 1));
            if (element) {
                let x = body.position.x - 40;
                let y = body.position.y - 40;
                element.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
}

function applyGravity(body) {
    const dx = (window.innerWidth / 2) - body.position.x;
    const dy = (window.innerHeight / 2) - body.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const gravityConstant = 0.0001;

    const gravity = {
        x: (dx / distance) * gravityConstant * body.mass,
        y: (dy / distance) * gravityConstant * body.mass
    };

    Body.applyForce(body, body.position, gravity);
}

function logEvent() {
    console.log("!!!");
}
</script>
  
<style>
#sandbox {
    height: 90vh;
    width: 100%;
}

.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
    position: absolute;
    border-radius: 50%;
    line-height: 40px;
    width: 80px;
    height: 80px;
}

#circle1 {
    background-color: #4CAF50;
}

#circle2 {
    background-color: aqua;
}

#circle3 {
    background-color: crimson;
}

#circle4 {
    background-color: bisque;
}
</style>
  