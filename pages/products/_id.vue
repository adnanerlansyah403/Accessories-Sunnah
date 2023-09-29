<template>
    <div>
        <div class="bg-white rounded-md py-2 px-3 shadow-[rgba(99,_99,_99,_0.2)_0px_2px_8px_0px] max-w-max hover:text-gray-500 transition-all duration-200 ease-in-out">
            <nuxt-link to="/products" class="flex items-center gap-1">
                <i class="ri-arrow-left-s-line translate-y-[1.5px]"></i>
                <span>Go Back</span>
            </nuxt-link>
        </div>
        <div class="relative top-0 mt-6">
            <div class="w-full">
                <img :src="product?.images_product?.length > 0 ? `${originalApi}/storage/v1/object/public/${product?.images_product[0]}` : 'https://flowbite.com/docs/images/blog/image-1.jpg'" class="w-full max-h-[500px] object-cover rounded-md" alt="Featured Image">
            </div>
            <div>
                <div class="font-poppins">
                    <h2 class="mt-4 mb-2 font-semibold text-4xl">{{ product?.name }}</h2>
                    <div class="flex items-center gap-2 max-w-max py-2 px-4 rounded-md bg-white shadow-[rgba(0,_0,_0,_0.02)_0px_1px_3px_0px,_rgba(27,_31,_35,_0.15)_0px_0px_0px_1px]">
                        <i class="ri-article-line translate-y-[1px] text-lg"></i>
                        <span>Category</span>
                    </div>
                </div>
                <p class="font-ubuntu mt-6">
                    {{ product?.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return {
            product_id: params?.id,
            originalApi: env?.originalAPI
        }
    },
    middleware: 'auth',
    computed: {
        ...mapState('products', ['product'])
    },
    mounted() {
        this.fetchDetailProduct(this.product_id);
    },
    methods: {
        ...mapActions('products', ['fetchDetailProduct'])
    }
}
</script>

<style lang="scss" scoped>

</style>