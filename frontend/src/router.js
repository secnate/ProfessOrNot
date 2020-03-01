import Vue from "vue";
import Router from "vue-router";
import LoginPanel from "./components/LoginPanel.vue";
import Main from "./components/Main.vue";
import ProfessorPage from "./components/ProfessorPage.vue";
import CoursePage from "./components/CoursePage.vue";
import AboutUs from "./components/AboutUs.vue";
import QuizPage from "./components/QuizPage.vue";
import MyReviews from "./components/MyReviews.vue";
import store from "./store";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
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
      props: true
    },
    {
      path: "/course/:id",
      name: "course",
      component: CoursePage,
      props: true
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizPage
    },
    {
      path: "/about",
      name: "about",
      component: AboutUs
    },
    {
      path: "/myreviews",
      name: "myreviews",
      component: MyReviews
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.getUser.survey_complete);
  if (store.getters.isAuthenticated) {
    if (to.matched.some(record => record.meta.unauth)) {
      next("/");
    } else if (!store.getters.getUser.quiz_complete && to.path != "/quiz") {
      next("/quiz");
    } else {
      next();
    }
  } else {
    if (to.matched.some(record => record.meta.unauth)) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
