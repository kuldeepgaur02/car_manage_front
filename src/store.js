import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
      errorMessage: null,
      cars: [],
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
      isSubmitting: false,
      successMessage: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setIsSubmitting(state, status) {
        state.isSubmitting = status;
      },
      setErrorMessage(state, message) {
        state.errorMessage = message;
      },
      clearErrorMessage(state) {
        state.errorMessage = null;
      },
      setSuccessMessage(state, message) {
        state.successMessage = message;
      },
      clearSuccessMessage(state) {
        state.successMessage = null;
      },
      setCars(state, value) {
        state.cars = value
      },
      removeCar(state, carId) {
        state.cars = state.cars.filter(car => car._id !== carId);
      },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/auth/login', credentials);
        commit('setUser', response.data.user);
        localStorage.setItem("Token", response.data.token)
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async register({ commit }, userData) {
        try {
          const response = await axios.post('https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/auth/register', userData);
  
          if (response.status === 201) {
            const user = response.data;
            commit('setUser', user);
            commit('clearErrorMessage');
            return true;
          } else {
            commit('setErrorMessage', 'Registration failed. Please try again.');
            return false;
          }
        } catch (error) {
          commit('setErrorMessage', error.response?.data?.message || 'An error occurred. Please try again.');
          console.error(error);
          return false;
        }
      },
      async fetchCars({ commit }) {
        commit('setIsLoading', true);
        commit('clearErrorMessage');
        try {
          const response = await axios.get('https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/cars', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          });
          commit('setCars', response.data);
        } catch (error) {
          commit('setErrorMessage', 'Failed to load companies. Please try again.');
          console.error('Error fetching companies:', error);
        } finally {
          commit('setIsLoading', false);
        }
      },
      async createCar({ commit, state }, car) {
        try {
          commit('setIsSubmitting', true);
          commit('clearErrorMessage');
          commit('clearSuccessMessage');
          const formData = new FormData();
          formData.append('title', car.title);
          formData.append('description', car.description);
          formData.append('tags', JSON.stringify({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          }));

          car.images.forEach((image) => {
            formData.append('images', image);
          });

          const response = await axios.post('https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/cars', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          });

          if (response.status === 201) {
            commit('setSuccessMessage', 'Car created successfully!');
          }
        } catch (error) {
          commit('setErrorMessage', 'Failed to create car. Please try again.');
          console.error('Car creation error:', error);
        } finally {
          commit('setIsSubmitting', false);
        }
      },
      async updateCar({ commit, state }, payload) {
        try {
          commit('setIsSubmitting', true);
          commit('clearErrorMessage');
          commit('clearSuccessMessage');
          const car = payload.car;
          const formData = new FormData();
          formData.append('title', car.title);
          formData.append('description', car.description);
          formData.append('tags', JSON.stringify({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          }));

          car.images.forEach((image) => {
            formData.append('images', image);
          });

          const response = await axios.patch(`https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/cars/${payload.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          });

          if (response.status === 201) {
            commit('setSuccessMessage', 'Car updated successfully!');
          }
        } catch (error) {
          commit('setErrorMessage', 'Failed to update car. Please try again.');
          console.error('Car update error:', error);
        } finally {
          commit('setIsSubmitting', false);
        }
      },
      async deleteCar({ commit }, carId) {
        try {
          await axios.delete(`https://car-manage-backend-git-main-kuldeep-gours-projects.vercel.app/api/cars/${carId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          });
          commit('removeCar', carId);
        } catch (error) {
          commit('setErrorMessage', 'Failed to delete car. Please try again.');
        }
      },
  },
});

export default store;
