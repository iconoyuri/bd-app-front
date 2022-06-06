<template>
    <section>
        <h4>{{ fields.nom }}</h4>
        <div class="wrapper">
            <SessionCell
                v-for="field in fields.sessions"
                :key="field"
                :field="field"
            />
        </div>
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

<style scoped>
section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
h4 {
    background-color: var(--bg-dark-color);
    color: white;
    text-align: center;
    border-radius: 7px 0;
    width: 100%;
}
.wrapper {
    position: absolute;
    margin-top: 5rem;
    width: 90%;
    height: var(--grid-height);
}
</style>
