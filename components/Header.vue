<template>
    <header class="flex items-center justify-between w-full py-6 px-4 bg-white shadow-md fixed top-0 z-[100]">
        <div class="flex items-center gap-10">
            <a href="" class="flex items-end gap-[1px]">
                <span class="font-poppins text-5xl text-secondary">A</span>
                <p class="font-ubuntu text-4xl">CS</p>
            </a>
            <ul class="flex items-end h-full gap-4">
                <li class="hover:text-gray-500 transition duration-200 ease-in-out">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="hover:text-gray-500 transition duration-200 ease-in-out">
                    <nuxt-link to="/about">About</nuxt-link>
                </li>
                <li class="hover:text-gray-500 transition duration-200 ease-in-out" v-if="user">
                    <nuxt-link to="/products">Products</nuxt-link>
                </li>
            </ul>
        </div>
        <div>
            <div class="flex items-center gap-6" v-if="user">
                <button type="button" @click="handleLogout()" class="hover:text-primary/90 transition-all duration-200 ease-in-out">Sign Out</button>
            </div>
            <div class="flex items-center gap-6" v-else>
                <nuxt-link to="/auth/signin" class="hover:text-primary/90 transition-all duration-200 ease-in-out">Sign In</nuxt-link>
                <nuxt-link to="/auth/signup" class="hover:text-primary/90 transition-all duration-200 ease-in-out">Sign Up</nuxt-link>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState('auth', ['user'])
    },
    mounted() {
        // this.fetchMe()
    },
    methods: {
        ...mapActions('auth', ['logout']),
        async handleLogout() {
            try {
                await this.logout();
                this.$router.push('/auth/signin')
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>