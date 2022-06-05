<template>
    <ContentInjector
        header="Insert Rooms"
        :requestPath="requestPath"
        :cache="cache"
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
            requestPath: "/filiere",
            cache: {},
        };
    },
    methods: {
        backupEntry(entry) {
            this.cache = { ...entry };
        },
        wipeCache() {
            this.cache = {};
        },
    },
};
</script>
