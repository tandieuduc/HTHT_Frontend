import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import QLDMView from "@/views/Danhmuc/QLDMView.vue";
import PQView from "@/views/Phanquyen/PQView.vue";
import CauHinhView from "@/views/CauHinhView.vue";
import PhongBanView from "@/views/Danhmuc/PBView.vue";
import ChucVuView from "@/views/Danhmuc/CVView.vue";
import HeThongView from "@/views/Danhmuc/HTView.vue";
import QuyenHeThong from "@/views/Phanquyen/QHTView.vue";
import QLVaiTro from "@/views/Phanquyen/QLVTView.vue";
import NhomQuyen from "@/views/Phanquyen/NQView.vue"
import GanQuyen from "@/views/Phanquyen/GQView.vue"

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
      name: "user",
      component: UserView,
    },
    {
      path: "/categories",
      name: "categories",
      redirect: '/categories/phong-ban',
      component: QLDMView,
      children: [
        {
          path: "phong-ban",
          name: "phong-ban",
          component: PhongBanView,
        },
        {
          path: "chuc-vu",
          name: "chuc-vu",
          component: ChucVuView,
        },
        {
          path: "he-thong",
          name: "he-thong",
          component: HeThongView,
        },
      ]
    },
    {
      path: "/roles",
      name: "roles",
      redirect: "/roles/quyen-he-thong",
      component: PQView,
      children: [
        {
          path: "quyen-he-thong",
          name: "system-rule",
          component: QuyenHeThong
        },
        {
          path: "quyen-vai-tro",
          name: "role-rule",
          component: QLVaiTro,
        },
        {
          path: "nhom-quyen",
          name: "group-rule",
          component: NhomQuyen
        },
        {
          path: "gan-quyen",
          name: "assign-role",
          component: GanQuyen
        }
      ]
    },
    {
      path: "/settings",
      name: "settings",
      component: CauHinhView,
    },
  ],
});

export default router;

