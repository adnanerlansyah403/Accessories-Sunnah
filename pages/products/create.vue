<template>
    <div>
        <div class="bg-white rounded-md py-2 px-3 shadow-[rgba(99,_99,_99,_0.2)_0px_2px_8px_0px] max-w-max hover:text-gray-500 transition-all duration-200 ease-in-out">
            <nuxt-link to="/products" class="flex items-center gap-1">
                <i class="ri-arrow-left-s-line translate-y-[1.5px]"></i>
                <span>Go Back</span>
            </nuxt-link>
        </div>
        <div class="mx-auto w-full max-w-[550px]">
            <form @submit.prevent="onSubmit($event)">
            <div class="mb-5">
                <label
                for="name"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Name
                </label>
                <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                v-model="formProduct.name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div class="mb-5">
                <label
                for="name"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Colors
                </label>
                <select v-model="formProduct.colors" id="countries" multiple class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="red">Red</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="brown">Brown</option>
                </select>
            </div>
            <div class="mb-5">
                <label
                for="price"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Price
                </label>
                <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                v-model="formProduct.price"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div class="mb-5">
                <label
                for="description"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Description
                </label>
                <textarea
                rows="4"
                name="description"
                id="description"
                placeholder="Type your description"
                v-model="formProduct.description"
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
            </div>
            <div class="mb-5">
                <!-- file upload modal -->
                <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md overflow-hidden" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event);">
                    <!-- scroll area -->
                    <section class="p-8 w-full h-full flex flex-col overflow-hidden">
                        <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                        <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                            <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                        </p>
                        <input id="hidden-input" type="file" class="hidden" @change="upload()" />
                        <button type="button" id="button" class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                            Upload a file
                        </button>
                        </header>

                        <ul id="gallery" class="flex flex-1 flex-wrap mt-6">
                            <li id="empty" class="h-full w-full text-center flex flex-col justify-center items-center">
                                <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                <span class="text-small text-gray-500">No files selected</span>
                            </li>
                        </ul>
                    </section>
                </article>
                <div class="mt-2">
                    <ul id="image-template" class="hidden overflow-hidden">
                        <li class="block p-1 w-[100px] h-24 overflow-hidden">
                            <article tabindex="0" class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm overflow-hidden">
                            <img alt="upload preview" class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed overflow-hidden" />
    
                            <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                                <h1 class="flex-1"></h1>
                                <div class="flex">
                                <span class="p-1">
                                    <i>
                                    <svg class="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                    </svg>
                                    </i>
                                </span>
    
                                <p class="p-1 size text-xs"></p>
                                <button type="button" class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                                    <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                    </svg>
                                </button>
                                </div>
                            </section>
                            </article>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <button
                type="submit"
                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                Submit
                </button>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    middleware: 'auth',
    data() {
        return {
            formProduct: {
                name: '',
                description: '',
                colors: [],
                // price: {
                //     type: Number,
                //     default: 0
                // }
                images_product: [],
                price: 0,
            }
        }
    },
    mounted() {
        // this.setInitialUpload();
    },
    computed: {
        ...mapState('storage', ['images', 'image_product'])
    },
    beforeMount() {
        this.$nextTick(function() {
            /** Upload File */
            const file = document.querySelector("input[type=file]"),
            imageTempl = document.getElementById("image-template"),
            empty = document.getElementById("empty");

            // use to store pre selected files
            let FILES = {};

            // check if file is of type image and prepend the initialied
            // template to the target element
            function addFile(target, file) {
                const isImage = file.type.match("image.*"),
                    objectURL = URL.createObjectURL(file);

                if(isImage) {
                    const clone = imageTempl.cloneNode(true);
                    clone.classList.remove('hidden');
                    clone.querySelector("h1").textContent = file.name;
                    clone.querySelector("li").id = objectURL;
                    clone.querySelector(".delete").dataset.target = objectURL;
                    clone.querySelector(".size").textContent =
                        file.size > 1024
                        ? file.size > 1048576
                            ? Math.round(file.size / 1048576) + "mb"
                            : Math.round(file.size / 1024) + "kb"
                        : file.size + "b";

                    isImage &&
                        Object.assign(clone.querySelector("img"), {
                        src: objectURL,
                        alt: file.name
                        });

                    empty.classList.add("hidden");
                    target.removeChild(target.firstChild);
                    target.prepend(clone);

                    FILES[objectURL] = file;
                }
            }

            const gallery = document.getElementById("gallery"),
            overlay = document.getElementById("overlay");

            // click the hidden input of type file if the visible button is clicked
            // and capture the selected files
            const hidden = document.getElementById("hidden-input");
            document.getElementById("button").onclick = () => hidden.click();
            hidden.onchange = (e) => {
            for (const file of e.target.files) {
                addFile(gallery, file);
            }
            };

            // use to check if a file is being dragged
            const hasFiles = ({ dataTransfer: { types = [] } }) =>
            types.indexOf("Files") > -1;

            // use to drag dragenter and dragleave events.
            // this is to know if the outermost parent is dragged over
            // without issues due to drag events on its children
            let counter = 0;

            // reset counter and append file to gallery when file is dropped
            function dropHandler(ev) {
            ev.preventDefault();
            for (const file of ev.dataTransfer.files) {
                addFile(gallery, file);
                overlay.classList.remove("draggedover");
                counter = 0;
            }
            }

            // only react to actual files being dragged
            function dragEnterHandler(e) {
            e.preventDefault();
            if (!hasFiles(e)) {
                return;
            }
            ++counter && overlay.classList.add("draggedover");
            }

            function dragLeaveHandler(e) {
            1 > --counter && overlay.classList.remove("draggedover");
            }

            function dragOverHandler(e) {
            if (hasFiles(e)) {
                e.preventDefault();
            }
            }

            // event delegation to caputre delete events
            // fron the waste buckets in the file preview cards
            gallery.onclick = ({ target }) => {
                if (target.classList.contains("delete")) {
                    const ou = target.dataset.target;
                    document.getElementById(ou).remove(ou);
                    gallery.children.length === 1 && empty.classList.remove("hidden");
                    delete FILES[ou];
                }
            };
        });
    },
    methods: {
        ...mapActions('products', ['storeProduct']),
        ...mapActions('storage', ['uploadFile']),
        async onSubmit() {
            try {
                // const formData = new FormData();
                // const thumbnailFile = document.querySelector("input[type=file]");
                // formData.append('name', this.formProduct.name)
                // formData.append('description', this.formProduct.description)
                // formData.append('colors', this.formProduct.colors)
                // formData.append('price', this.formProduct.price)
                // formData.append('images_product', thumbnailFile.files[0].name)
                await this.storeProduct(this.formProduct);
                setTimeout(() => {
                    this.$router.push("/products");
                }, 2000)
            } catch (error) {
                console.error(error)
            }
        },
        async upload() {
            try {
                const formData = new FormData();
                const file = document.querySelector("input[type=file]");
                formData.append('data-binary', file.files[0]);
                await this.uploadFile({ file: `/products/images/${Date.now()}.${file.files[0].name.split('.')[1]}`, body: formData })
                this.formProduct.images_product.push(this.image_product)
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>