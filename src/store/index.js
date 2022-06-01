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
            state.user_type = user;
        },
    },
    getters: {
        isUserLogged(state) {
            return state.access_token !== "";
        },
        userIsAdmin(state){
            return state.user_type === "Administrateur"
        },
        userIsTeacher(state){
            return state.user_type === "Enseignant"
        }
    },
});
export default store;
