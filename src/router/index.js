import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

import SearchView from "@/views/SearchView.vue";

//user
import LoginView from "@/views/user/LoginView.vue";
import JoinView from "@/views/user/JoinView.vue";
import MyPageView from "@/views/user/MyPageView.vue";

//free board
import FreeBoardListView from "@/views/board/free/ListView.vue";
import FreeBoardWriteView from "@/views/board/free/WriteView.vue";
import FreeBoardPostView from "@/views/board/free/PostView.vue";

//plan board
import PlanBoardListView from "@/views/board/plan/ListView.vue";
import PlanBoardWriteView from "@/views/board/plan/WriteView.vue";
import PlanBoardPostView from "@/views/board/plan/PostView.vue";

import NotFoundView from "@/views/NotFoundView.vue";

import { useSearchStore } from "@/stores/search.js";
import { useAuthStore } from "@/stores/auth";

function requireAuth(to, from, next) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    alert("로그인이 필요한 서비스입니다.");
    next("/user/login");
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: "/board",
      redirect: "/board/free",
      children: [
        {
          path: "free",
          name: "board-free",
          component: FreeBoardListView,
        },
        {
          path: "plan",
          name: "board-plan",
          component: PlanBoardListView,
        },
      ],
    },
    {
      path: "/write",
      name: "write",
      redirect: "/write/free",
      children: [
        {
          path: "free",
          name: "write-free",
          component: FreeBoardWriteView,
          beforeEnter: requireAuth,
        },
        {
          path: "plan",
          name: "write-plan",
          component: PlanBoardWriteView,
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: "/post",
      redirect: "/",
      children: [
        {
          path: "free/:id",
          name: "post-free",
          component: FreeBoardPostView,
        },
        {
          path: "plan/:id",
          name: "post-plan",
          component: PlanBoardPostView,
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
