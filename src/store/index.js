import { createStore } from "vuex";

const store = createStore({
    state: {
        user_type: sessionStorage.getItem("user_type"),
        access_token: sessionStorage.getItem("access_token"),
        token_type: sessionStorage.getItem("token_type"),
        backend_domain: "https://time-table-app-g14.herokuapp.com",
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
        logout() {
            sessionStorage.clear();
            console.log("Logged out");
        },
    },
    getters: {
        isUserLogged(state, getters) {
            return getters.userIsAdmin || getters.userIsTeacher;
        },
        userIsAdmin(state) {
            return state.user_type == "administrateur";
        },
        userIsTeacher(state) {
            return state.user_type == "enseignant";
        },
        getAccessToken(state) {
            return state.access_token;
        },
    },
});
export default store;
