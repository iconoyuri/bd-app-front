<template>
    <tr>
        <td colspan="3" @dblclick.self="abort" class="form-line">
            <label for="session-line-form-name">Session type</label>
            <input
                type="text"
                placeholder="Session type"
                v-model="session"
                class="form-control"
                required
                id="session-line-form-name"
            />
            <label for="session-line-form-duration">Duration</label>
            <input
                id="session-line-form-duration"
                type="time"
                class="form-control"
                v-model="duration"
                required
            />
            <div class="buttons" @dblclick.self="abort">
                <button
                    @click.prevent="validate"
                    class="btn btn-outline-success"
                >
                    <i class="fas fa-check"></i>
                </button>
                <button @click.prevent="abort" class="btn btn-danger">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "SessionLineForm",
    props: {
        duration: {
            default: "02:00",
        },
        session: {
            default: "",
        },
        purposeIsUpdate: {
            default: false,
        },
    },
    emits: ["abort", "refresh"],
    data() {
        return {
            backupSession: "",
        };
    },
    mounted() {
        // For Session update
        // Saving the session type identifier for put request
        if (this.purposeIsUpdate) this.backupSession = this.session;
    },
    methods: {
        abort() {
            this.$emit("abort");
        },
        validate() {
            if (this.purposeIsUpdate) this.update();
            else this.post();
            this.$emit("refresh", this.session, this.duration);
        },
        post() {
            console.log(
                "Posting session : " +
                    this.session +
                    " Duration : " +
                    this.duration
            );
        },
        update() {
            console.log(
                "Updating session : " +
                    this.backupSession +
                    " Set name : " +
                    " Duration : " +
                    this.duration
            );
        },
    },
};
</script>

<style scoped>
.form-line {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgb(200, 232, 253);
    border-radius: 7px;
    box-shadow: 0 0 3px rgba(200, 232, 253, 0.5);
}
.form-line:hover {
    box-shadow: 0 0 5px rgba(165, 219, 255, 0.8);
    background-color: rgb(245, 247, 255);
}
.form-line p {
    text-transform: capitalize;
}
.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin: 1rem 0 0;
}
</style>
