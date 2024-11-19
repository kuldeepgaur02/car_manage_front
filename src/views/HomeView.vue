<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <!-- Create Car Button -->
    <button 
      @click="$router.push('/car')" 
      class="px-6 py-3 mb-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none font-semibold"
    >
      + Create New Car
    </button>

    <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Cars List</h2>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</p>

      <!-- Loading State -->
      <p v-if="isLoading" class="text-center text-gray-500">Loading cars...</p>

      <!-- Cars List -->
      <ul v-if="!isLoading && cars.length > 0" class="space-y-4">
        <li 
          v-for="car in cars" 
          :key="car._id" 
          class="p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <div class="flex gap-4 flex-wrap justify-center">
            <img
              v-for="(image, index) in car.images"
              :key="index"
              :src="getImageUrl(image)"
              :alt="car.title"
              @error="onImageError(index)"
              class="w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="text-lg font-semibold text-gray-800 mt-6">
            Title: {{ car.title }}
          </div>
          <div class="text-sm text-gray-500">
            Description: {{ car.description }}
          </div>
          <p class="text-center border-b border-gray-600 mb-4 pb-3">Tags</p>
          <div class="grid grid-cols-2">
            <div class="text-sm text-gray-500">Car Type: {{ car.tags.car_type }}</div>
            <div class="text-sm text-gray-500">Company: {{ car.tags.company }}</div>
          </div>
          <div class="text-sm text-gray-500">
            Dealer: {{ car.tags.dealer }}
          </div>
          <div class="flex justify-between mt-4">
            <button 
              class="px-4 py-2 text-red-500 hover:text-red-700 transition duration-300" 
              @click.prevent="deleteCar(car._id)"
            >
              Delete Car
            </button>
            <button 
              class="px-4 py-2 text-orange-400 hover:text-orange-600 transition duration-300" 
              @click.prevent="$router.push(`/car/${car._id}`)"
            >
              Edit Car
            </button>
          </div>
        </li>
      </ul>

      <!-- No Cars Found -->
      <p 
        v-if="!isLoading && cars.length === 0" 
        class="text-center text-gray-500"
      >
        No cars found.
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CarList',
  methods: {
    // Construct URL for image source
    getImageUrl(image) {
      const baseUrl = 'https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/uploads/';
      return `${baseUrl}${image}`;
    },

    // Handle image loading errors by updating an error flag
    onImageError(index) {
      // Optionally, you could handle image fallback logic here
      this.$set(this.cars[index], 'imageError', true);
    },

    // Delete a car by dispatching Vuex action
    deleteCar(carId) {
      this.$store.dispatch('deleteCar', carId);
    },
  },
  computed: {
    // Access Vuex state for cars, loading, and errors
    cars() {
      return this.$store.state.cars;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
  mounted() {
    // Fetch cars when the component is mounted
    this.$store.dispatch('fetchCars');
  },
};
</script>

<style scoped>
/* You can add custom styles specific to this component here */
</style>
