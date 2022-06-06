<template>
    <section>
        <!-- {{fields}} -->
        <h3>{{ fields.nom }}</h3>
        <SessionCell v-for="field in fields.sessions" :key="field" :field="field" />
    </section>
</template>

<script>
import SessionCell from "./SessionCell.vue";
export default {
    props: {
        fields: {
            default: [],
        },
    },
    components: { SessionCell },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
        };
    },
    methods: {},
};
</script>

<style></style>
