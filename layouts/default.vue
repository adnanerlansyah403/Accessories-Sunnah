<template>
    <div>
        <Header />
        <main>
            <Nuxt />
        </main>
    </div>
</template>

<script>

export default {
    mounted() {
        if(!process.client) return;
        const user = JSON.parse(localStorage.getItem("user"));
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if(user){
            this.$store.commit('auth/SET_USER', { user, access_token, refresh_token });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>