<template>
    <div>
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-ubuntu">List Products</h1>
            <div>
                <nuxt-link to="/products/create" class="flex items-center gap-3">
                    <i class="ri-add-line text-lg"></i>
                    <span>Add Product</span>
                </nuxt-link>
            </div>
        </div>
        <div class="w-full grid grid-cols-3 gap-4 mt-4">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" v-for="product of products" :key="product?.id">
                <a href="#">
                    <img class="rounded-t-lg w-full h-[200px] object-cover" :src="product?.images_product?.length > 0 ? `${originalApi}/storage/v1/object/public/${product?.images_product[0]}` : 'https://flowbite.com/docs/images/blog/image-1.jpg'" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ product.name }}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ product?.description }}</p>
                    <div class="flex items-center justify-between">
                        <nuxt-link :to="`/products/${product?.id}`" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </nuxt-link>
                        <div class="flex items-center gap-2">
                            <nuxt-link :to="`/products/edit/${product?.id}`" class="bg-yellow-400 text-white py-2 px-3 rounded-lg"><i class="ri-edit-line text-xl"></i></nuxt-link>
                            <button type="button" @click="handleDelete(product?.id)" class="bg-red-400 text-white py-2 px-3 rounded-lg"><i class="ri-delete-bin-line text-xl"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return {
            originalApi: env?.originalAPI
        }
    },
    middleware: 'auth',
    data() {
        return {
            originalAPI: this.originalApi
        }
    },
    computed: {
        ...mapState('products', ['products'])
    },
    mounted() {
        this.fetchProducts()
        this.setOriginalApi();
    },
    methods: {
        ...mapActions('products', ['fetchProducts', 'removeProduct']),
        async handleDelete(productId) {
            try {
                await this.removeProduct(productId);
                this.fetchProducts()
            } catch (error) {
                console.error(error)
            }
        },
        setOriginalApi() {
            this.processEnv = this.originalApi
        }
    }
}
</script>

<style lang="scss" scoped>

</style>