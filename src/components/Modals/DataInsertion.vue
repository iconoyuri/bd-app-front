<template>
    <ModalWindow :title="title">
        <div class="split-pane">
            <nav class="left">
                <ul>
                    <router-link
                        v-for="option in options"
                        :key="option.title"
                        :to="{ name: option.formtype }"
                    >
                        <li
                            :class="{ active: option.visible }"
                            @click="setActiveOption(option.title)"
                        >
                            <i class="fas fa-times"></i>
                            <span>{{ option.title }}</span>
                        </li>
                    </router-link>
                </ul>
            </nav>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </ModalWindow>
</template>

<script>
import ModalWindow from "../assets/ModalWindow.vue";

export default {
    name: "DataInsertion",
    components: { ModalWindow },
    data() {
        return {
            title: "Data Insertion",
            options: [
                {
                    title: "Session types",
                    visible: true,
                    formtype: "sessionform",
                    requestPath: "/course_type",
                },
                {
                    title: "Class Levels",
                    visible: false,
                    formtype: "levelform",
                    requestPath: "",
                },
                {
                    title: "Paths",
                    visible: false,
                    formtype: "pathform",
                    requestPath: "",
                },
                {
                    title: "Rooms",
                    visible: false,
                    formtype: "roomform",
                    requestPath: "",
                },
                {
                    title: "Teachers",
                    visible: false,
                    formtype: "teacherform",
                    requestPath: "",
                },
                {
                    title: "Classes",
                    visible: false,
                    formtype: "classform",
                    requestPath: "",
                },
                {
                    title: "Courses",
                    visible: false,
                    formtype: "courseform",
                    requestPath: "",
                },
            ],
            formtype: "sessionform",
        };
    },
    mounted() {
        this.$router.push({ name: "sessionform" });
    },
    methods: {
        setActiveOption(title) {
            Array.from(this.options).forEach((option) => {
                if (option.title === title) {
                    option.visible = true;
                    this.formtype = option.formtype;
                } else option.visible = false;
            });
        },
    },
};
</script>

<style scoped>
.split-pane {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 10rem 1fr;
    overflow: auto;
}
.left {
    border: none;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-radius: 0px 7px 0 0;
    overflow: hidden;
}
.right {
    /* width: 100%; */
    position: relative;
    padding: 0 1rem 1rem;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-radius: 0 0 7px 0;
    /* min-width: 22rem; */
}
nav ul {
    list-style-type: none;
    padding: 0;
}
nav ul li {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    width: 100%;
    display: flex;
    gap: 0.7rem;
    align-items: center;
    transition: background-color 0.2s, color 0.2s;
    user-select: none;
}
nav ul li:hover,
nav ul li.active {
    background-color: rgb(60, 60, 60);
    color: white;
}
nav ul li.active {
    font-weight: bold;
}
nav ul li i {
    font-size: 1.5em;
}
@media screen and (max-width: 760px) {
    .split-pane {
        grid-template-columns: 7rem 1fr;
    }
    nav ul li i {
        font-size: 1.1em;
    }
}
</style>
