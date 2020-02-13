import Vue from "vue";
import Router from "vue-router";
import LoginPanel from "./components/LoginPanel.vue";
import Main from "./components/Main.vue";
import ProfessorPage from "./components/ProfessorPage.vue";
import CoursePage from "./components/CoursePage.vue";
import QuizPage from "./components/QuizPage.vue";
import store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginPanel,
      meta: {
        unauth: true
      }
    },
    {
      path: "/professor/:id",
      name: "professor",
      component: ProfessorPage,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/course/:id",
      name: "course",
      component: CoursePage,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
  if (to.matched.some(record => record.meta.unauth)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
  }
});

export default router;
