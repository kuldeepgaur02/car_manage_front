<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Create Car</h2>
  
        <!-- Success Message -->
        <p v-if="successMessage" class="text-green-500 text-center mb-4">{{ successMessage }}</p>
        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</p>
  
        <form @submit.prevent="submitCarForm">
          <!-- Title Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="car.title"
              type="text"
              required
              placeholder="Enter car title"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Description Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="car.description"
              required
              placeholder="Enter car description"
              rows="4"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
  
          <!-- Images Upload -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Images (Max 10)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="handleFileUpload"
              class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div v-if="car.images.length > 0" class="mt-2 flex flex-wrap gap-2">
              <div
                v-for="(image, index) in car.images"
                :key="index"
                class="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img :src="URL.createObjectURL(image)" alt="car image" class="object-cover w-full h-full" />
                <button
                  @click.prevent="removeImage(index)"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            </div>
          </div>
  
          <!-- Tags -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700">Car Type</label>
                <input
                  v-model="car.tags.car_type"
                  type="text"
                  required
                  placeholder="Enter car type"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">Company</label>
                <input
                  v-model="car.tags.company"
                  type="text"
                  required
                  placeholder="Enter company name"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">Dealer</label>
                <input
                  v-model="car.tags.dealer"
                  type="text"
                  required
                  placeholder="Enter dealer name"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Create Car</span>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  
  export default {
    data() {
      return {
        car: {
          title: '',
          description: '',
          images: [],
          tags: {
            car_type: '',
            company: '',
            dealer: '',
          },
        },
      };
    },
    computed: {
      errorMessage() {
        return this.$store.state.errorMessage;
      },
      successMessage() {
        return this.$store.state.successMessage;
      },
      isSubmitting() {
        return this.$store.state.isSubmitting;
      },
    },
    methods: {
      handleFileUpload(event) {
        const files = event.target.files;
        if (files.length + this.car.images.length > 10) {
          alert('You can upload a maximum of 10 images.');
          return;
        }
  
        for (let i = 0; i < files.length; i++) {
          this.car.images.push(files[i]);
        }
      },
      removeImage(index) {
        this.car.images.splice(index, 1);
      },
      submitCarForm() {
        this.$store.dispatch('createCar', this.car);
        this.$router.push('/'); 
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles (if any) */
  </style>
  