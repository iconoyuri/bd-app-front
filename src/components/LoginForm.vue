<template>
    <ModalWindow @closePane="closeForm">
        <h1 class="title">Log to your account</h1>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Login</label>
                <input
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter login"
                    v-model="login"
                />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
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
import ModalWindow from "./ModalWindow.vue";
export default {
    name: "LoginForm",
    emits: ["closeForm"],
    components: { ModalWindow },
    data() {
        return {
            login: "",
            password: "",
        };
    },
    methods: {
        closeForm() {
            this.$emit("closeForm");
        },
        sendCredentials() {
            axios.defaults.baseURL =
                "https://time-table-app-g14.herokuapp.com/";

            let params = new URLSearchParams();
            params.append("username", this.login);
            params.append("password", this.password);
            axios
                .post("/login", params)
                .then((e) => {
                    console.log(e);
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
h1 {
    margin: 1rem 0 3rem 0;
}
form {
    font-size: 1.1rem;
}
button {
    margin-top: 2rem;
}
</style>
