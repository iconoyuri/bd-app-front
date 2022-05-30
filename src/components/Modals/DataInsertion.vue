<template>
    <ModalWindow @closePane="closePane" :title="title">
        <div class="split-pane">
            <nav class="left">
                <ul>
                    <li
                        v-for="option in options"
                        :key="option.title"
                        :class="{ active: option.visible }"
                        @click="setActiveOption(option.title)"
                    >
                        <i class="fas fa-times"></i>
                        <span>{{ option.title }}</span>
                    </li>
                </ul>
            </nav>
            <div class="right">
                <RootInsertionForm :formtype="formtype" />
            </div>
        </div>
    </ModalWindow>
</template>

<script>
import ModalWindow from "../ModalWindow.vue";
import RootInsertionForm from "../Insertionforms/RootInsertionForm.vue";

export default {
    name: "DataInsertion",
    components: { ModalWindow, RootInsertionForm },
    emits: ["closeModal"],
    data() {
        return {
            title: "Data Insertion",
            options: [
                {
                    title: "Days",
                    visible: true,
                    formtype: "daysform",
                },
                {
                    title: "Session types",
                    visible: false,
                    formtype: "sessionform",
                },
                {
                    title: "Class levels",
                    visible: false,
                    formtype: "levelsform",
                },
                {
                    title: "Paths",
                    visible: false,
                    formtype: "pathsform",
                },
                {
                    title: "Teachers",
                    visible: false,
                    formtype: "teacherform",
                },
                {
                    title: "Rooms",
                    visible: false,
                    formtype: "roomsform",
                },
                {
                    title: "Classes",
                    visible: false,
                    formtype: "classesform",
                },
                {
                    title: "Courses",
                    visible: false,
                    formtype: "coursesform",
                },
            ],
            formtype: "daysform",
        };
    },
    methods: {
        closePane() {
            this.$emit("closeModal");
        },
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
    padding: 0 1rem;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-radius: 0 0 7px 0;
    min-width: 20rem;
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
