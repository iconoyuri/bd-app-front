<template>
    <ModalWindow @closePane="closePane" :title="title">
        <div class="rooms">
            <div class="room" v-for="room in rooms" :key="room.code">
                <router-link
                    :to="{
                        name: 'roomtableview',
                        params: { code: room.code },
                    }"
                >
                    <article>
                        <i class="fa-solid fa-landmark"></i>
                        <p>{{ room.code }}</p>
                    </article>
                </router-link>
            </div>
        </div>
    </ModalWindow>
</template>

<script>
import ModalWindow from "../ModalWindow.vue";

export default {
    name: "ChooseRoom",
    components: { ModalWindow },
    emits: ["closeModal"],
    data() {
        return {
            title: "Select a room",
            requestPath: "/room",
            rooms: [],
        };
    },
    mounted() {
        this.getDatas();
    },
    methods: {
        getDatas() {
            this.axios
                .get(this.requestPath + "/all")
                .then((response) => {
                    this.rooms = response.data;
                })
                .catch((e) => console.log(e));
        },
        closePane() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style scoped>
.paths {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    overflow: auto;
    padding: 0.4rem;
    border-radius: 1rem;
}
.path {
    border-radius: 2rem;
    flex-shrink: 0;
}
.rooms {
    padding: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
.room article {
    display: flex;
    width: 10rem;
    height: 10rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #f8dff2;
    border-radius: 4px;
    box-shadow: 0 0 5px #eee;
    user-select: none;
}
.room:hover {
    background: #efc5f3;
    box-shadow: 0 0 5px #bbb;
}
.room i {
    font-size: 3rem;
}
.room p {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: calibri;
}
</style>
