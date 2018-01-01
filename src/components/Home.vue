<template>
  <div class="md-layout-item">
    <md-card class="md-primary">
      <md-card-header>
        <div class="md-title">Thank you for participating!</div>
      </md-card-header>

      <md-card-content>
        <p>
        This survey has 2 parts.  There is a section with written questions, and there is a section where you're presented with 3 images, and chose the one of the 3 you like the most.
      </p>
       <p>
        You can fill out as many of the written questions as you want, or none at all.  You can do the image choosing section as many or as few times as you want
         </p>
      </md-card-content>

      <md-card-actions>
          <md-button class="md-dense "><md-icon>thumb_up</md-icon>Text Survey</md-button>
          <md-button class="md-dense "><md-icon>thumb_up</md-icon>Image Survey</md-button>
      </md-card-actions>
    </md-card>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
