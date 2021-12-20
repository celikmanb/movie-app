<template>
  <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand @click="$router.push('/')">
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            class="headerLogo"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Menu">
              <b-dropdown-item @click="$router.push('/')">Anasayfa</b-dropdown-item>
              <b-dropdown-item @click="$router.push('/about')">About</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.headerLogo {
  width: 50px; 
  height: 40px;
  margin-left: 15%;
  background-color: black;
}
</style>