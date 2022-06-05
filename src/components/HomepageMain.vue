<template>
    <main>
        <div class="center">
            <h1>{{ title }}</h1>
            <p>
                {{ paragraph }}
            </p>
        </div>
        <div class="options">
            <h1>Let's Start with</h1>
            <div class="buttons">
                <router-link :to="{ name: 'chooseroom' }">
                    <button type="button" class="btn btn-outline-dark">
                        Choose a room
                    </button>
                </router-link>

                <router-link :to="{ name: 'chooseclass' }">
                    <button type="button" class="btn btn-outline-dark">
                        Choose a class
                    </button>
                </router-link>
                <slot name="buttons"></slot>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "HomepageMain",
    props: ["title", "paragraph"],
};
</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    background: #fff;
}
main,
.center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.center h1 {
    font-size: 4rem;
    max-width: 80%;
}
.center p {
    font-size: 1.8rem;
    max-width: 85%;
}
.options {
    margin-top: 2rem;
}
.buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 30rem;
    gap: 1rem;
}
</style>
