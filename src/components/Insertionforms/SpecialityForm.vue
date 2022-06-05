<template>
    <ContentInjector
        header="Insert Teachers"
        :requestPath="requestPath.speciality"
        :cache="cache"
        ref="injector"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Class</th>
            <th scope="col">Name</th>
            <th scope="col">Students number</th>
        </template>
        <template v-slot:inputs>
            <label for="line-form-1">Select owner class</label>
            <select
                class="form-control"
                v-model="cache.code_filiere"
                id="line-form-1"
            >
                <option
                    v-for="classe in classes"
                    :key="classe.code_classe"
                    :value="classe.code_classe"
                >
                    {{ classe.code_classe }}
                </option>
            </select>
            <label for="line-form-2">Speciality name</label>
            <input
                type="text"
                placeholder="Speciality name"
                v-model="cache.nom"
                class="form-control"
                required
                id="line-form-2"
            />
            <label for="line-form-3">Students number</label>
            <input
                type="number"
                placeholder="Students number"
                v-model="cache.effectif"
                class="form-control"
                required
                id="line-form-3"
            />
        </template>
    </ContentInjector>
</template>

<script>
import ContentInjector from "../Lines/ContentInjector.vue";

export default {
    components: { ContentInjector },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            classes: [],
            cache: {},
        };
    },
    mounted() {
        this.getClasses();
    },
    methods: {
        getClasses() {
            this.axios
                .get(this.requestPath.classe + "/all")
                .then((response) => {
                    this.paths = response.data;
                })
                .catch((e) => console.log(e));
        },
        updateEntry(entry) {
            this.axios
                .delete(this.$refs.injector.requestPath, {
                    params: { id: entry.id },
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
                    params: { id: entry.id },
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
