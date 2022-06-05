<template>
    <ContentInjector
        header="Insert Classes"
        :requestPath="requestPath"
        :cache="cache"
        :addingEnabled="false"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Code</th>
            <th scope="col">Effectif</th>
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
    <p>
        Note : Les classes sont automatiquement générées à partir des niveaux et
        des filières
    </p>
</template>

<script>
import ContentInjector from "../Lines/ContentInjector.vue";

export default {
    components: { ContentInjector },
    data() {
        return {
            requestPath: "/class",
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
