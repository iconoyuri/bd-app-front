<template>
    <ModalWindow @closePane="closePane" :title="title">
        <h3>First select a path</h3>
        <div class="paths">
            <button
                class="btn btn-secondary path"
                v-for="path in paths"
                :key="path.code"
                @click="showClasses(path)"
            >
                {{ path.nom }}
            </button>
        </div>
        <div v-if="visiblePath" class="container">
            <h3 style="margin-top: 1.5rem">{{ visiblePath }} classes</h3>
            <div class="classes">
                <div class="class" v-for="classe in classes" :key="classe.code">
                    <router-link
                        :to="{
                            name: 'classtableview',
                            params: { code: classe.code },
                        }"
                    >
                        <article>
                            <i class="fa-solid fa-book"></i>
                            <p>{{ classe.code }}</p>
                        </article>
                    </router-link>
                </div>
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
                {
                    code: "INF",
                    nom: "Informatique",
                },
                {
                    code: "BIOS",
                    nom: "Biosciences",
                },
                {
                    code: "GEOS",
                    nom: "Géosciences",
                },
            ],
            classes: [
                {
                    code: "INF L3",
                    effectif: 0,
                    niveau: 3,
                    code_filiere: "INF",
                },
                {
                    code: "BIOS L3",
                    effectif: 0,
                    niveau: 3,
                    code_filiere: "INF",
                },
                {
                    code: "GEOS L3",
                    effectif: 0,
                    niveau: 3,
                    code_filiere: "INF",
                },
            ],
        };
    },
    methods: {
        closePane() {
            this.$emit("closeModal");
        },
        showClasses(path) {
            this.visiblePath = path.nom;
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
.class article {
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
