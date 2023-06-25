import home from "@/pages/common/home.vue";
import notFound from "@/pages/common/404.vue";

const routes = [
  {
    path: "/",
    meta: {
      title: "home",
      notAuth: true,
    },
    component: home,
  },
  {
    path: "/:pathMatch(.*)",
    meta: {
      title: "404",
      notAuth: true,
    },
    component: notFound,
  },
];

export default routes;
