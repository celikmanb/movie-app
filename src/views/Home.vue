<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          <b-jumbotron text-variant="white" bg-variant="dark" header="The Movie App" lead="Popular Movies Database">
            <p>For more information visit website</p>
          </b-jumbotron>
        </b-col>
      </b-row>
      <br>
      <h3 class="sectionTitle">Popüler Filmler</h3>
      <b-row class="colPopular">
        <b-col style="max-width: 340px;" v-for="(movie, key) in movieList" :key="key" @click="getDetailMovie(movie)">
          <movie-card 
            class="colCell"
            :movieName= "movie.title"
            :movieImg= "movie.poster_path"
            :movieDate= "movie.release_date"
            :movieRate= "movie.vote_average"
          />
        </b-col>
      </b-row>
      <h3 class="sectionTitle">Trend Filmler</h3>
      <b-row class="colPopular">
        <b-col style="max-width: 340px;" v-for="(trend,key) in trendMovieList" :key="key" @click="getDetailMovie(trend)">
          <movie-card 
            class="colCell"
            :movieName= "trend.title"
            :movieImg= "trend.poster_path"
            :movieDate= "trend.release_date"
            :movieRate= "trend.vote_average"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCard from '../components/MovieCard.vue' 
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  name: 'Home',
  components: {
    MovieCard
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['movieList','trendMovieList'])
  },
  methods: {
    ...mapActions(['getMovieData','getMovieImage','getMovieTrendData']),
    ...mapMutations(['setMovieList','setTrendMovieList']),
    getDetailMovie(item) {
      console.log("movie item", item)
      this.$router.push(`/detail/${item.id}`)
    },
    showToast(val) {
      this.$bvToast.toast(`${val}`, {
        title: `Error`,
        variant: 'danger',
        toaster: 'b-toaster-bottom-center',
        solid: true,
      })
    },
  },
  mounted() {
    this.getMovieData().then((res)=>{
      this.setMovieList(res.data.results)
    }).catch((err)=>{
      this.showToast(err.response.data.status_message)
    })
    let params = {
      media_type: "movie", // get parameters with all, movie, tv or person 
      time_window: "week" // get parameters with day, week
    } 
    this.getMovieTrendData(params).then((res)=>{
      this.setTrendMovieList(res.data.results)
    }).catch((err)=>{
      this.showToast(err.response.data.status_message)
    })
  }
}
</script>

<style>
.colCell {
 display: flex;
 justify-content: center;
}
.sectionTitle {
  text-align: left;
}
.colPopular {
  max-height: 700px;
  flex-direction: column;
  white-space: nowrap;
  overflow-x: visible;
  overflow-y: hidden;
}
</style>
