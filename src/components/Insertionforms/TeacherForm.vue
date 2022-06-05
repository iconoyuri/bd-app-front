<template>
    <ContentInjector
        header="Insert Teachers"
        :requestPath="requestPath.teacher"
        :cache="cache"
        ref="injector"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Matricule</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Path</th>
        </template>
        <template v-slot:inputs>
            <label for="line-form-1">Teacher matricule</label>
            <input
                type="text"
                placeholder="Teacher matricule"
                v-model="cache.matricule"
                class="form-control"
                required
                id="line-form-1"
            />
            <label for="line-form-2">Teacher name</label>
            <input
                type="text"
                placeholder="Teacher Name"
                v-model="cache.nom"
                class="form-control"
                required
                id="line-form-2"
            />
            <label for="line-form-3">Teacher email</label>
            <input
                type="email"
                placeholder="Teacher email"
                v-model="cache.email"
                class="form-control"
                required
                id="line-form-3"
            />
            <label for="line-form-4">Teacher path</label>
            <select
                class="form-control"
                v-model="cache.code_filiere"
                id="line-form-4"
            >
                <option
                    v-for="path in paths"
                    :key="path.code"
                    :value="path.code"
                >
                    {{ path.nom }}
                </option>
            </select>
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
            paths: [],
            cache: {},
        };
    },
    mounted() {
        this.getPaths();
    },
    methods: {
        getPaths() {
            this.axios
                .get(this.requestPath.path + "/all")
                .then((response) => {
                    this.paths = response.data;
                })
                .catch((e) => console.log(e));
        },
        updateEntry(entry) {
            this.axios
                .put(this.$refs.injector.requestPath, this.cache, {
                    params: { matricule: entry.matricule },
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
                    params: { matricule: entry.matricule },
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
