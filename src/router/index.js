import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassTableView from "../views/ClassTableView.vue";
import RoomTableView from "../views/RoomTableView.vue";
import TeacherWorkshopView from "../views/TeacherWorkshopView.vue";
import AdminWorkshopView from "../views/AdminWorkshopView.vue";
import LoginForm from "../components/Modals/LoginForm.vue";
import ChooseClass from "../components/Modals/ChooseClass.vue";
import ChooseRoom from "../components/Modals/ChooseRoom.vue";
import DataInsertion from "../components/Modals/DataInsertion.vue";
import SessionForm from "../components/Insertionforms/SessionForm.vue";
import LevelForm from "../components/Insertionforms/LevelForm.vue";
import PathForm from "../components/Insertionforms/PathForm.vue";
import TeacherForm from "../components/Insertionforms/TeacherForm.vue";
import RoomForm from "../components/Insertionforms/RoomForm.vue";
import ClasseForm from "../components/Insertionforms/ClassForm.vue";
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
            {
                path: "/class",
                name: "chooseclass",
                component: ChooseClass,
            },
            {
                path: "/room",
                name: "chooseroom",
                component: ChooseRoom,
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
                        path: "classes",
                        name: "classeform",
                        component: ClasseForm,
                    },
                    {
                        path: "courses",
                        name: "courseform",
                        component: CourseForm,
                    },
                ],
            },
        ],
    },
    {
        path: "/table/class/:code",
        name: "classtableview",
        component: ClassTableView,
    },
    {
        path: "/table/room/:code",
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
