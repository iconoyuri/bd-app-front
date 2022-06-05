<template>
    <ContentInjector
        header="Insert Rooms"
        :requestPath="requestPath.room"
        :cache="cache"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Code</th>
            <th scope="col">Capacity</th>
        </template>
        <!--  -->

        <template v-slot:inputs>
            <label for="line-form-1">room code</label>
            <input
                type="text"
                placeholder="Room code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form-1"
            />

            <label for="line-form-2">Capacity</label>
            <input
                type="number"
                placeholder="Capacity"
                v-model="cache.effectif"
                class="form-control"
                required
                id="line-form-2"
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
