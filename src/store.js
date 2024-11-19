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
        const response = await axios.post('http://localhost:5001/api/auth/login', credentials); // Replace with your API URL
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
          const response = await axios.post('http://localhost:5001/api/auth/register', userData); // Make the POST request using Axios
  
          if (response.status === 201) {
            const user = response.data;
            commit('setUser', user); // Store the user data if registration is successful
            commit('clearErrorMessage'); // Clear any previous error messages
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
          const response = await axios.get('http://localhost:5001/api/cars', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          }); // Assuming API endpoint to fetch companies
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
        console.log(car)
          const formData = new FormData();
          formData.append('title', car.title);
          formData.append('description', car.description);
          console.log({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          })
          formData.append('tags', JSON.stringify({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          }));
        //   formData.append('tags.car_type', car.tags.car_type);
        //   formData.append('tags.company', car.tags.company);
        //   formData.append('tags.dealer', car.tags.dealer);
  
          // Append all images to FormData
          car.images.forEach((image) => {
            formData.append('images', image);
          });
  
          // POST request to API to create car
          const response = await axios.post('http://localhost:5001/api/cars', formData, {
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
          const car = payload.car
          const formData = new FormData();
          formData.append('title', car.title);
          formData.append('description', car.description);
          console.log({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          })
          formData.append('tags', JSON.stringify({
            car_type: car.tags.car_type,
            company: car.tags.company,
            dealer: car.tags.dealer
          }));
        //   formData.append('tags.car_type', car.tags.car_type);
        //   formData.append('tags.company', car.tags.company);
        //   formData.append('tags.dealer', car.tags.dealer);
  
          // Append all images to FormData
          car.images.forEach((image) => {
            formData.append('images', image);
          });
  
          // POST request to API to create car
          const response = await axios.patch(`http://localhost:5001/api/cars/${payload.id}`, formData, {
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
      async deleteCar({ commit }, carId) {
        try {
          // Call API to delete the car
          await axios.delete(`http://localhost:5001/api/cars/${carId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Token')}`
            },
          }); // Assuming this is the correct API endpoint
          commit('removeCar', carId); // Update the state after successful deletion
        } catch (error) {
          commit('setErrorMessage', 'Failed to delete car. Please try again.');
        }
      },
  },
});

export default store;
