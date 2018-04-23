<template>

  <div
    @click="closeModal"
    class="md-layout-item"
    id="home-message"
  >
     <transition name="fade" appear>
      <div>
        <canvas id="confetti">
        </canvas>
        <div class="logo">OfficeBlankets.Com</div>
        <md-card class="md-primary" id="welcome">
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
              <md-button class="md-dense" @click="navigateTo('Questionaire')">Text Survey</md-button>
              <md-button class="md-dense" @click="navigateTo('ImageSurvey')">Image Survey</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </transition>
  </div>
</template>

<script>

import {Confetti}  from '../utility/confetti.js';
export default {
  name: 'Home',
  props:['visits'],
  data () {
    return {

    }
  },
  mounted:()=>{
    var canvas = document.getElementById('confetti');
    window.setTimeout(function(){
      const a = Confetti(canvas);
    },1000)

  },
  methods:{
    navigateTo: function(value){

        this.$emit('navigateTo', value)
    },
    closeModal:function(){
       console.log('sent event');
        this.$emit('closeModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#home-message{
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: top;
}
#confetti{
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
#home-message .logo{
  position: relative;
  top: 80px;
  text-align: center;
  margin: .5em;
}

#welcome{
    height:300px;
    width:600px;
    position: relative;
    top: 80px;
    background-color: white;
    border: 4px solid rgba(194, 221, 250, 0.7);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave-to{
    opacity:1;
}
</style>
