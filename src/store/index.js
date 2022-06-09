import { createStore } from "vuex";

const store = createStore({
    state: {
        user_type: sessionStorage.getItem("user_type"),
        access_token: sessionStorage.getItem("access_token"),
        token_type: sessionStorage.getItem("token_type"),
        matricule: sessionStorage.getItem("matricule"),
        // matricule: "14KDG23",
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
            Tactivity: "/timetable/activity",
            Tcourse: "/timetable/course",
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
        currentRoomCode: "",
        currentClass: {},
    },
    mutations: {
        saveUser(state, { access_token, token_type, user, matricule }) {
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("user_type", user.toLowerCase());
            sessionStorage.setItem("token_type", token_type);
            sessionStorage.setItem("matricule", matricule);

            state.user_type = sessionStorage.getItem("user_type");
            state.access_token = sessionStorage.getItem("access_token");
            state.token_type = sessionStorage.getItem("token_type");
            state.matricule = sessionStorage.getItem("matricule");
        },
        setCurrentRoomCode(state, code) {
            state.currentRoomCode = code;
        },
        saveCurrentClass(state, classe) {
            state.currentClass = { ...classe };
        },
        logout(state) {
            sessionStorage.clear();
            state.user_type = "";
            state.access_token = "";
            state.token_type = "";
            state.matricule = "";
            state.currentRoomCode = "";
            state.currentClass = "";
        },
    },
    getters: {
        isUserLogged(state, getters) {
            return getters.userIsAdmin || getters.userIsTeacher;
        },
        userIsAdmin(state) {
            // return true;
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
            return state.matricule;
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
