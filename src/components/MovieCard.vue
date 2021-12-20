<template>
  <div>
    <b-card
        :title="movieName"
        :img-src="currentImage"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        {{"Çıkış Tarihi: "+movieDate}}
      </b-card-text>

      <b-form-rating class="movieRate" v-model="movieRate" readonly show-value stars="10" inline precision="2">
      </b-form-rating>
      <!-- <b-button href="#" variant="primary">Detay</b-button> -->
    </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props: {
    movieName: {
      default: ''
    },
    movieImg: {
      default: ''
    },
    movieDate: {
      default: ''
    },
    movieRate: {
      default: 0
    }
  },
  data() {
    return {
      baseImgUrl: process.env.VUE_APP_BASE_IMAGE_URL,
      currentImage: ''
    };
  },
  methods: {
    ...mapActions(['getMovieImage']),
  },
  mounted(){
    this.currentImage = this.baseImgUrl + "/original" + this.movieImg
  }

}
</script>

<style>
.movieRate {
  padding-left: unset !important;
  padding-right: unset !important;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>