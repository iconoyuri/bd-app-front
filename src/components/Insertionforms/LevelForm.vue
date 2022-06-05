<template>
    <ContentInjector
        header="Insert Levels"
        :requestPath="requestPath.level"
        :cache="cache"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers> <th scope="col">Code</th> </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form">Level code</label>
            <input
                type="text"
                placeholder="Level code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form"
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
                .put(this.requestPath, this.cache, {
                    params: { code: entry.code },
                })
                .then(() => {
                    // entry = this.cache;
                    this.getDatas();
                })
                .catch((e) => console.log(e));
        },
        deleteEntry(entry) {
            this.axios
                .delete(this.requestPath, {
                    params: { code: entry.code },
                })
                .then(() => {
                    this.entries = this.deleteLine(entry);
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
