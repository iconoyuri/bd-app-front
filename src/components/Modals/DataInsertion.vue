<template>
    <ModalWindow @closePane="closePane" :title="title">
        
    </ModalWindow>
</template>

<script>
import ModalWindow from "../ModalWindow.vue";

export default {
    name: "DataInsertion",
    components: { ModalWindow },
    emits: ["closeModal"],
    data() {
        return {
            title: "Data Insertion",
        };
    },
    methods: {
        closePane() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style scoped>
</style>
