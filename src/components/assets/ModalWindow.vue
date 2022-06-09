<template>
    <div @click.self="closePane" class="curtain hidden" ref="curtain">
        <div class="pane">
            <h1 class="title">{{ title }}</h1>
            <slot></slot>
            <CloseButton @click="closePane" />
        </div>
    </div>
</template>

<script>
import CloseButton from "./CloseButton.vue";
export default {
    name: "ModalWindow",
    components: { CloseButton },
    emits: ["closeModal"],
    props: {
        title: {
            default: "Title",
        },
        closeRedirect: {
            default: true,
        },
    },
    mounted() {
        setTimeout(() => this.$refs.curtain.classList.remove("hidden"), 50);
    },
    methods: {
        closePane() {
            this.$refs.curtain.classList.add("hidden");
            this.$emit("closeModal");
            if (!this.closeRedirect) return;
            setTimeout(() => this.$router.push({ name: "home" }), 200);
        },
    },
};
</script>

<style scoped>
.curtain {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #0005;
    opacity: 1;
    transition: opacity 0.3s;
}
.pane {
    position: relative;
    background-color: white;
    padding: 2.7rem;
    margin: 0 1rem;
    border-radius: 12px;
    box-shadow: 0 0 10px #0003;
    max-width: 500px;
    min-width: 18rem;
    width: 100%;
    max-height: 650px;
    overflow: hidden auto;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.2s;
}
.curtain.hidden {
    opacity: 0;
    pointer-events: none;
}
.curtain.hidden .pane {
    opacity: 0;
    transform: translateY(3rem);
}
.title {
    margin: 0rem 0 2rem 0;
}

@media screen and (max-width: 760px) {
    .pane {
        padding: 1.5rem;
    }
}
</style>
