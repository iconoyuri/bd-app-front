<template>
    <ContentInjector
        header="Insert Paths"
        :requestPath="requestPath.path"
        :cache="cache"
        ref="injector"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
        </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form-1">Path code</label>
            <input
                type="text"
                placeholder="Path code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form-1"
            />

            <label for="line-form-2">Path name</label>
            <input
                type="text"
                placeholder="Path name"
                v-model="cache.nom"
                class="form-control"
                required
                id="line-form-2"
            />
        </template>
        <!--  -->
    </ContentInjector>
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
