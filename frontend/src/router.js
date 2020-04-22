import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import Home from "./components/Home.vue";
import ProfessorPage from "./components/ProfessorPage.vue";
import CoursePage from "./components/CoursePage.vue";
import AboutUs from "./components/AboutUs.vue";
import QuizPage from "./components/QuizPage.vue";
import MyReviews from "./components/MyReviews.vue";
import ContactPage from "./components/ContactPage.vue";
import store from "./store";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
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
      component: AboutUs,
      meta: {
        unauth: true
      }
    },
    {
      path: "/myreviews",
      name: "myreviews",
      component: MyReviews
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactPage,
      meta: {
        unauth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (!store.getters.getUser.quiz_complete && to.path != "/quiz") {
      next("/quiz");
    } else {
      next();
    }
  } else {
    if (to.matched.some(record => record.meta.unauth)) {
      next();
    } else {
      next("/");
    }
  }
});

export default router;
