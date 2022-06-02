import { createStore } from "vuex";

const store = createStore({
    state: {
        access_token: "",
        token_type: "",
        user_type: "",
        backend_domain: "https://time-table-app-g14.herokuapp.com",
    },
    mutations: {
        saveUser(state, { access_token, token_type, user }) {
            state.access_token = access_token;
            state.token_type = token_type;
            state.user_type = user.toLowerCase();
        },
    },
    getters: {
        isUserLogged(state, getters) {
            return getters.userIsAdmin || getters.userIsTeacher
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
