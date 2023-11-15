import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import JoinView from "@/views/JoinView.vue";
import RecommendView from "@/views/RecommendView.vue";
import MyPageView from "@/views/MyPageView.vue";
import SearchView from "@/views/SearchView.vue";
import BoardView from "@/views/BoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/join",
      name: "join",
      component: JoinView,
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
    },
    {
      path: "/recommend",
      name: "recommend",
      component: RecommendView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) {
          alert("로그인이 필요한 서비스 입니다");
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/search/:keyword",
      name: "search",
      component: SearchView,
    },
  ],
});

export default router;
