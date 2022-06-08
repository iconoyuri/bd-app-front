import { createStore } from "vuex";

const store = createStore({
    state: {
        user_type: sessionStorage.getItem("user_type"),
        access_token: sessionStorage.getItem("access_token"),
        token_type: sessionStorage.getItem("token_type"),
        teacher_matricule: sessionStorage.getItem("teacher_matricule"),
        // teacher_matricule: "14KDG23",
        backend_domain: "https://time-table-app-g14.herokuapp.com",
        requestPaths: {
            classe: "/class",
            course: "/course",
            level: "/level",
            path: "/filiere",
            room: "/room",
            session: "/course_type",
            teacher: "/teacher",
            speciality: "/speciality",
            day: "/day",
            table: {
                course: {
                    room: "/timetable/course/room",
                    teacher: "/timetable/course/teacher",
                },
                activity: {
                    room: "/timetable/activity/room",
                    teacher: "/timetable/activity/teacher",
                },
            },
        },
        time0: Date.parse("June 9, 2022 07:00:00"),
        dateRoot: "June 9, 2022 ",
    },
    mutations: {
        saveUser(state, { access_token, token_type, user }) {
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("user_type", user.toLowerCase());
            sessionStorage.setItem("token_type", token_type);

            state.user_type = sessionStorage.getItem("user_type");
            state.access_token = sessionStorage.getItem("access_token");
            state.token_type = sessionStorage.getItem("token_type");
        },
        saveTeacherMatricule(state, { matricule }) {
            sessionStorage.setItem("teacher_matricule", matricule);
            state.teacher_matricule =
                sessionStorage.getItem("teacher_matricule");
        },
        logout(state) {
            sessionStorage.clear();
            state.user_type = "";
            state.access_token = "";
            state.token_type = "";
            state.teacher_matricule = "";
        },
    },
    getters: {
        isUserLogged(state, getters) {
            return getters.userIsAdmin || getters.userIsTeacher;
        },
        userIsAdmin(state) {
            return true;
            return state.user_type == "administrateur";
        },
        userIsTeacher(state) {
            // return true;
            return state.user_type == "enseignant";
        },
        getAccessToken(state) {
            return state.access_token;
        },
        getTeacherMatricule(state) {
            return state.teacher_matricule;
        },
        getRequestPaths(state) {
            return state.requestPaths;
        },
        // getDataInsetionCache(){
        //     return state.insertionCache
        // }
    },
});
export default store;
