<template>
    <ModalWindow title="Log to your account" ref="pane">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Login</label>
                <input
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter login"
                    v-model="login"
                    required
                />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                    required
                />
            </div>
            <button
                class="btn btn-dark btn-lg btn-block"
                @click.prevent="sendCredentials"
            >
                Log in
            </button>
        </form>
    </ModalWindow>
</template>

<script>
import ModalWindow from "../assets/ModalWindow.vue";
export default {
    name: "LoginForm",
    components: { ModalWindow },
    data() {
        return {
            login: "",
            password: "",
        };
    },
    methods: {
        sendCredentials() {
            let params = new URLSearchParams();
            params.append("username", this.login);
            params.append("password", this.password);
            this.axios
                .post("/login", params)
                .then((response) => {
                    this.$store.commit("saveUser", response.data);
                    this.axios.defaults.headers.common = {
                        Authorization: `bearer ${this.$store.getters.getAccessToken}`,
                    };
                    if (response.data.user == "enseignant") {
                        // Fetching teacher profile
                        this.axios
                            .get("/teacher/profile")
                            .then((response) => {
                                this.$store.commit("saveTeacherMatricule", response.data);
                            })
                            .catch((e) => console.log(e));
                    }

                    this.$refs.pane.closePane();
                })
                .catch((e) => console.log(e));
        },
    },
};
</script>

<style scoped>
* {
    font-family: calibri;
}
form {
    font-size: 1.1rem;
}
button {
    margin-top: 2rem;
}
</style>
