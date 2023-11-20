import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import JoinView from "@/views/JoinView.vue";
import RecommendView from "@/views/RecommendView.vue";
import MyPageView from "@/views/MyPageView.vue";
import SearchView from "@/views/SearchView.vue";
import FreeBoardView from "@/views/FreeBoardView.vue";
import PlanBoardView from "@/views/PlanBoardView.vue";
import WriteView from "@/views/WriteView.vue";
import FreePostView from "@/views/FreePostView.vue";
import PlanPostView from "@/views/PlanPostView.vue";
import PlanWriteView from "@/views/PlanWriteView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import { useSearchStore } from "@/stores/search.js";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      redirect: "/user/mypage",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "join",
          name: "join",
          component: JoinView,
        },
        {
          path: "mypage",
          name: "mypage",
          component: MyPageView,
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
              alert("로그인이 필요한 서비스입니다.");
              next("/user/login");
            } else next();
          },
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      children: [
        {
          path: "free",
          name: "board-free",
          component: FreeBoardView,
        },
        {
          path: "plan",
          name: "board-plan",
          component: PlanBoardView,
        },
      ],
    },
    {
      path: "/write",
      name: "write",
      children: [
        {
          path: "free",
          name: "write-free",
          component: WriteView, // Free writing view component
        },
        {
          path: "plan",
          name: "write-plan",
          component: PlanWriteView, // Plan writing view component
        },
      ],
    },
    {
      path: "/recommend",
      name: "recommend",
      component: RecommendView,
    },
    {
      path: "/search/:keyword",
      name: "search",
      component: SearchView,
      beforeEnter: (to, from, next) => {
        const searchStore = useSearchStore();
        searchStore.setKeyword(to.params.keyword);
        next();
      },
    },
    {
      path: "/fpost/:id",
      name: "fpost",
      component: FreePostView,
    },
    {
      path: "/ppost/:id",
      name: "ppost",
      component: PlanPostView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
