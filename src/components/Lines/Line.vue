<template>
    <tr
        v-if="!modificationFormVisible"
        @dblclick="startModify"
        :class="{ line: true, modifiable: !modificationlock }"
    >
        <slot></slot>
        <td>
            <button
                @click.prevent="$emit('delete')"
                class="btn btn-outline-danger"
            >
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    </tr>
    <LineForm
        v-if="modificationFormVisible"
        @stageChanges="commit"
        @abortChanges="endModify"
    >
        <slot name="inputs"></slot>
    </LineForm>
</template>

<script>
import LineForm from "./LineForm.vue";
export default {
    props: {
        modificationlock: {
            default: false,
        },
    },
    emits: ["start-modify", "end-modify", "update", "delete"],
    components: { LineForm },
    data() {
        return {
            modificationFormVisible: false,
        };
    },
    methods: {
        startModify() {
            if (this.modificationlock) return;
            this.modificationFormVisible = true;
            this.$emit("start-modify");
        },
        endModify() {
            this.modificationFormVisible = false;
            this.$emit("end-modify");
        },
        commit() {
            this.$emit("update");
            this.endModify();
        },
    },
};
</script>

<style scoped>
.line {
    border-bottom: 1px solid #ccc;
    border-radius: 0 0 7px 0;
}
.line td {
    padding: 0.5rem 0.5rem;
}
.duration {
    text-align: center;
}
button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}
button i {
    font-size: 0.8em;
}
tr.modifiable:hover {
    background-color: rgb(232, 236, 255);
}
tr.modifiable:active {
    background-color: rgb(214, 221, 255);
}
</style>
