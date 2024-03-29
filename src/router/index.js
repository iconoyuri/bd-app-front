import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassTableView from "../views/ClassTableView.vue";
import RoomTableView from "../views/RoomTableView.vue";
import TeacherWorkshopView from "../views/TeacherWorkshopView.vue";
import AdminWorkshopView from "../views/AdminWorkshopView.vue";
// import ActivityPlanningView from "../views/ActivityPlanningView.vue";

import LoginForm from "../components/Modals/LoginForm.vue";
import DataInsertion from "../components/Modals/DataInsertion.vue";
import SessionForm from "../components/Insertionforms/SessionForm.vue";
import LevelForm from "../components/Insertionforms/LevelForm.vue";
import PathForm from "../components/Insertionforms/PathForm.vue";
import TeacherForm from "../components/Insertionforms/TeacherForm.vue";
import RoomForm from "../components/Insertionforms/RoomForm.vue";
import ClassForm from "../components/Insertionforms/ClassForm.vue";
import SpecialityForm from "../components/Insertionforms/SpecialityForm.vue";
import CourseForm from "../components/Insertionforms/CourseForm.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        children: [
            {
                path: "/login",
                name: "login",
                component: LoginForm,
            },
        ],
    },
    {
        path: "/insertion",
        name: "datainsertion",
        component: DataInsertion,
        children: [
            {
                path: "sessions",
                name: "sessionform",
                component: SessionForm,
            },
            {
                path: "levels",
                name: "levelform",
                component: LevelForm,
            },
            {
                path: "paths",
                name: "pathform",
                component: PathForm,
            },
            {
                path: "teachers",
                name: "teacherform",
                component: TeacherForm,
            },
            {
                path: "rooms",
                name: "roomform",
                component: RoomForm,
            },
            {
                path: "class",
                name: "classform",
                component: ClassForm,
            },
            {
                path: "speciality",
                name: "specialityform",
                component: SpecialityForm,
            },
            {
                path: "courses",
                name: "courseform",
                component: CourseForm,
            },
        ],
    },
    // {
    //     path: "/workshop/activity/",
    //     name: "activity",
    //     component: ActivityPlanningView,
    // },
    {
        path: "/table/class/",
        name: "classtableview",
        component: ClassTableView,
    },
    {
        path: "/table/room/",
        name: "roomtableview",
        component: RoomTableView,
    },
    {
        path: "/workshop/teacher/:matricule",
        name: "teacherworkshop",
        component: TeacherWorkshopView,
    },
    {
        path: "/workshop/admin/",
        name: "adminworkshop",
        component: AdminWorkshopView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
