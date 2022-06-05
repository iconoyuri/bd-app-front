<template>
    <!-- <ModalWindow :title="title"> -->
    <!-- <p>test</p> -->
    <div class="">
        <!-- <h1>Data Insertion</h1> -->
        <div class="split-pane">
            <nav class="left">
                <ul>
                    <router-link
                        v-for="option in options"
                        :key="option.title"
                        :to="{ name: option.formtype }"
                        :class="{ active: option.visible }"
                    >
                        <li @click="setActiveOption(option.title)">
                            <i class="fas fa-times"></i>
                            <span>{{ option.title }}</span>
                        </li>
                    </router-link>
                    <a href="">
                        <li></li>
                    </a>
                </ul>
            </nav>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <!-- </ModalWindow> -->
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
                    title: "Specialities",
                    visible: false,
                    formtype: "specialityform",
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
nav {
    margin: 0;
    padding: 0;
}
h1 {
    padding: 0;
}
.split-pane {
    width: 100%;
    height: 100%;
    background-color: inherit;
    display: flex;
}
.left {
    border: none;
    /* border-right: 1px solid #ddd; */
    /* border-top: 1px solid #ddd; */
    flex-shrink: 0;
    width: 13rem;
    overflow: hidden;
    background-color: inherit;
}
.right {
    width: 100%;
    position: relative;
    padding: 0 1rem 1rem;
    background-color: white;
}
nav ul {
    list-style-type: none;
    background-color: #bbb;

    background: var(--bg-grey-color-2); /* Old browsers */
    background: -moz-linear-gradient(
        left,
        var(--bg-grey-color-2) 0%,
        #fff 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
        left,
        var(--bg-grey-color-2) 0%,
        #fff 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
        to right,
        var(--bg-grey-color-2) 0%,
        #fff 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--bg-grey-color)', endColorstr='#fff',GradientType=1 ); /* IE6-9 */
    padding: 0;
    margin: 0;
}
nav ul li {
    padding: 0.8rem;
    width: 100%;
    display: flex;
    gap: 0.7rem;
    align-items: center;
    user-select: none;
}
nav ul a {
    background-color: var(--bg-dark-color);
    transition: background-color 0.2s, color 0.2s;
}
nav ul a:nth-last-of-type() {
    background: red;
    pointer-events: none;
}
nav ul a:hover {
    background-color: var(--transparent-dark-color);
}
nav ul a.active {
    background-color: initial;
}
nav ul a.active li {
    /* background-color: var(--bg-grey-color); */
    color: var(--bg-dark-color);
    font-weight: bold;
}
nav ul a.active + a > li {
    border-radius: 0 8px 0 0;
    overflow: hidden;
}
nav ul li {
    background: inherit;
    color: var(--bg-grey-color);
}
nav ul li i {
    font-size: 1.5em;
}
@media screen and (max-width: 760px) {
    nav ul li i {
        font-size: 1.1em;
    }
}
</style>
