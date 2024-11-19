<template>
    <div class="min-h-screen bg-gray-300 flex items-center justify-center">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
        <form @submit.prevent="registerUser">
          <!-- Name Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="name"
              type="text"
              required
              placeholder="Enter your name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Email Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Password Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
  
        <!-- Error Message -->
        <p v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const errorMessage = computed(() => store.state.errorMessage); // Get error message from Vuex store
  
      const registerUser = async () => {
        const userData = {
          name: name.value,
          email: email.value,
          password: password.value,
        };
  
        const success = await store.dispatch('register', userData);
        
        if (success) {
          router.push('/login'); // Redirect to login on successful registration
        }
      };
  
      return {
        name,
        email,
        password,
        errorMessage,
        registerUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  