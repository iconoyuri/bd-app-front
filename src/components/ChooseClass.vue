<template>
    <ModalWindow @closePane="closePane" :title="title">
        <h3>First select a path</h3>
        <div class="paths">
            <button
                class="btn btn-secondary path"
                v-for="path in paths"
                :key="path"
                @click="showClasses(path)"
            >
                {{ path }}
            </button>
        </div>
        <div v-if="visiblePath" class="container">
            <h3 style="margin-top: 1.5rem">{{ visiblePath }} classes</h3>
            <div class="classes">
                <article class="class" v-for="classe in classes" :key="classe">
                    <i class="fa-solid fa-book"></i>
                    <p>{{ classe }}</p>
                </article>
            </div>
        </div>
    </ModalWindow>
</template>

<script>
import ModalWindow from "./ModalWindow.vue";

export default {
    name: "ChooseClass",
    components: { ModalWindow },
    emits: ["closeModal"],
    data() {
        return {
            title: "Choose a class",
            visiblePath: "",
            paths: [
                "Computer science",
                "Biochemistry",
                "Physics",
                "Mathematics",
            ],
            classes: [
                "INF L3",
                "INF L3",
                "INF L3",
                "INF L3",
                "BIOS L3",
                "BIOS L3",
                "BIOS L3",
                "BIOS L3",
                "BIOS L3",
                "GEOS L3",
                "GEOS L3",
                "GEOS L3",
                "GEOS L3",
                "GEOS L3",
                "GEOS L3",
            ],
        };
    },
    methods: {
        closePane() {
            this.$emit("closeModal");
        },
        showClasses(path) {
            this.visiblePath = path;
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
.classes {
    padding: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
.class {
    display: flex;
    width: 10rem;
    height: 10rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #dfeaf8;
    border-radius: 4px;
    box-shadow: 0 0 5px #eee;
    user-select: none;
}
.class:hover {
    background: #cdddf3;
    box-shadow: 0 0 5px #bbb;
}
.class i {
    font-size: 3rem;
}
.class p {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: calibri;
}
</style>
