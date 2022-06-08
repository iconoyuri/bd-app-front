<template>
    <ContentInjector
        header="Insert Classes"
        :requestPath="requestPath.classe"
        :cache="cache"
        ref="injector"
        :addingEnabled="false"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Code</th>
            <th scope="col">Effectif</th>
            <th scope="col">Level code</th>
            <th scope="col">Path code</th>
        </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form-1">Class code</label>
            <input
                type="text"
                placeholder="Class code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form-1"
                disabled
            />
            <label for="line-form-2">Effectif</label>
            <input
                type="number"
                placeholder="Effectif"
                v-model="cache.effectif"
                class="form-control"
                required
                id="line-form-2"
            />
        </template>
        <!--  -->
    </ContentInjector>
    <div class="texts">
        <p>
            Note : Les classes sont automatiquement générées à partir des
            niveaux et des filières
        </p>
        <p>Pour générer ou mettre à jour les classes, cliquez sur le bouton</p>
        <button
            @click.prevent="generateClasses"
            type="button"
            class="btn btn-outline-primary btn-lg"
        >
            Générer les classes
        </button>
    </div>
</template>

<script>
import ContentInjector from "../Lines/ContentInjector.vue";

export default {
    components: { ContentInjector },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            cache: {},
        };
    },
    methods: {
        generateClasses() {
            this.axios.get("/class/generate_classes").then(() => {
                this.$refs.injector.getDatas();
            });
        },
        updateEntry(entry) {
            this.axios
                .put(this.$refs.injector.requestPath, this.cache, {
                    params: { code: entry.code },
                })
                .then(() => {
                    // entry = this.cache;
                    this.$refs.injector.getDatas();
                })
                .catch((e) => console.log(e));
        },
        deleteEntry(entry) {
            this.axios
                .delete(this.$refs.injector.requestPath, {
                    params: { code: entry.code },
                })
                .then(() => {
                    this.$refs.injector.deleteLine(entry);
                });
        },
        backupEntry(entry) {
            this.cache = { ...entry };
        },
        wipeCache() {
            this.cache = {};
        },
    },
};
</script>

<style scoped>
.texts {
    text-align: center;
}
</style>
