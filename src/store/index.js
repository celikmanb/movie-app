import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieList: [],
    trendMovieList: [],
    movieDetail: {}
  },
  mutations: {
    setMovieList(state, val){
      state.movieList = val
    },
    setTrendMovieList(state, val){
      state.trendMovieList = val
    },
    setMovieDetail(state, val){
      state.movieDetail = val
    },
  },
  actions: {
    getMovieData() {
      return axios.get(`${process.env.VUE_APP_BASE_URL}/movie/popular`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieTrendData(as,params) {
      console.log("as", as);
      return axios.get(`${process.env.VUE_APP_BASE_URL}/trending/${params.media_type}/${params.time_window}`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieDetail(_,params) {
      return axios.get(`${process.env.VUE_APP_BASE_URL}/movie/${params}`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieVideo(_,params) {
      return axios.get(`${process.env.VUE_APP_BASE_URL}/movie/${params}/videos`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieCredits(_,params) {
      return axios.get(`${process.env.VUE_APP_BASE_URL}/movie/${params}/credits`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieKeywords(_,params) {
      return axios.get(`${process.env.VUE_APP_BASE_URL}/movie/${params}/keywords`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    },
    getMovieImage(_,params) {
      return axios.get(`${process.env.VUE_APP_BASE_IMAGE_URL}/original${params}`, {params: {api_key: process.env.VUE_APP_API_KEY}} )
    }
  },
  modules: {
  }
})
