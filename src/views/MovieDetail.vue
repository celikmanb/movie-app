<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12" md="4" lg="4">
          <b-img :fluid="true" :src="currentImage"></b-img>
        </b-col>
        <b-col cols="12" md="8" lg="8">
          <b-card style="text-align: left;">
            <h2>{{movieDetail.original_title}}</h2>
            <p>{{movieDetail.overview}}</p>
            <p><strong>Çıkış Tarihi:</strong>{{" "+movieDetail.release_date}}</p>
            <b-form-rating class="movieRate" v-model="movieRate" readonly show-value stars="10" inline precision="2" />
            <br>

            <b-row>
              <b-col cols="12" md="6" lg="6">
                <h3>Kategoriler</h3>
                <hr>
                <p v-for="(category) in movieDetail.genres" :key="category.id">
                  {{category.name}}
                </p>
              </b-col>
              
              <b-col cols="12" md="6" lg="6">
                <h3>Yapımcılar</h3>
                <hr>
                <p v-for="(producer) in movieDetail.production_companies" :key="producer.id">
                  {{producer.name}}
                </p>
              </b-col>
            </b-row>

            <b-row>
              <h3>Video</h3>
              <hr>
              <b-embed 
                type="iframe" 
                aspect="16by9" 
                controls 
                :src="`https://www.youtube.com/embed/${videoId}?rel=0`"
                style="width: 100%; min-height: 300px; max-height: 400px;"
              />
            </b-row>
            
            <b-row>
              <b-col cols="12" md="6" lg="6">
                <h3>Oyuncular</h3>
                <hr>
                <p v-for="(cast) in crewList" :key="cast.id">
                  {{cast.name}} -- {{cast.character}}
                </p>
              </b-col>
              <b-col cols="12" md="6" lg="6">
                <div>
                  <h3>Etiketleri</h3>
                  <hr>
                  <b-badge variant="primary" class="ms-1" v-for="tag in tags" :key="tag.id">
                    {{tag.name}}
                  </b-badge>
                </div>
              </b-col>
            </b-row>

          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  data(){
    return{
      movieId: 0,
      baseImgUrl: process.env.VUE_APP_BASE_IMAGE_URL,
      currentImage: '',
      videoId: null,
      movieRate: 0,
      crewList: [],
      tags: [],
      showDismissibleAlert: false
    }
  },
  computed: {
    ...mapState(['movieDetail'])
  },
  methods:{
    ...mapActions(['getMovieDetail','getMovieVideo','getMovieCredits','getMovieKeywords']),
    ...mapMutations(['setMovieDetail']),
    showToast(val) {
      this.$bvToast.toast(`${val}`, {
        title: `Error`,
        variant: 'danger',
        toaster: 'b-toaster-bottom-center',
        solid: true,
      })
    },
    getMountData(id) {
      this.getMovieDetail(id).then((res)=>{
        this.setMovieDetail(res.data)
        this.currentImage = this.baseImgUrl + "/original" + this.movieDetail.poster_path
        this.movieRate = this.movieDetail.vote_average
        this.getMovieKeywords(this.movieDetail.id).then((res)=>{
          this.tags = res.data.keywords
        }).catch((err)=>{
          this.showToast(err.response.data.status_message)
        })
        this.getMovieCredits(this.movieDetail.id).then((res)=>{
          this.crewList = res.data.cast.splice(0,10)
        }).catch((error)=>{
          this.showToast(error.response.data.status_message)
        })
        this.getMovieVideo(this.movieDetail.id).then((res)=>{
          let findTrailer = res.data.results.find(element => element.name.toLowerCase().includes("official trailer"))
          this.videoId = findTrailer ? findTrailer.key : res.data.results[0].key
        }).catch((error)=>{
          this.showToast(error.response.data.status_message)
        })
      }).catch((err)=>{
        this.showToast(err.response.data.status_message)
      })
    }
  },
  mounted() {
    this.movieId = this.$route.params.id
    this.getMountData(this.movieId)
  }
}
</script>

<style>
.badge {
  background-color: #6c757d !important;
}
.errorAlert {
  position: fixed !important;
  left: 40% !important;
  bottom: 10% !important;
}
</style>