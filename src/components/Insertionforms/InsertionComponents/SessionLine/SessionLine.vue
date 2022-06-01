<template>
    <tr
        v-if="!modificationFormVisible"
        @dblclick="startModify"
        :class="{ line: true, modifiable: !modificationlock }"
    >
        <td class="type">{{ session }}</td>
        <td class="duration">
            {{ duration }}
        </td>
        <td>
            <button
                @click.prevent="deleteSession"
                class="btn btn-outline-danger"
            >
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    </tr>
    <SessionLineForm
        v-if="modificationFormVisible"
        @refresh="loadSession"
        @abort="endModify"
        :session="session"
        :duration="duration"
        :purposeIsUpdate="true"
    />
</template>

<script>
import SessionLineForm from "../../../Insertionforms/InsertionComponents/SessionLine/SessionLineForm.vue";
export default {
    name: "SessionLine",
    props: {
        nom: {
            default: "",
        },
        duree: {
            default: "02:00",
        },
        modificationlock: {
            default: false,
        },
    },
    emits: ["start-modify", "end-modify", "refresh"],
    components: { SessionLineForm },
    data() {
        return {
            modificationFormVisible: false,
            session: this.nom,
            duration: this.duree,
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
        loadSession(session, duration) {
            this.session = session;
            this.duration = duration;
            console.log("POST => loading modified session");
            this.endModify();
        },
        deleteSession() {
            console.log(
                "Deleting Session : " +
                    this.session +
                    " Duration : " +
                    this.duration
            );
            this.$emit("refresh");
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
