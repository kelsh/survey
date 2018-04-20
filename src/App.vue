<template>
  <div id="app" class="page-container" >

   <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">OfficeBlankets.com Survey</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="clipped">

        <md-list>

        <md-list-item @click="currentView = 'Home'">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item @click="currentView = 'Questionaire'">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Questionaire</span>
          </md-list-item>

          <md-list-item @click="currentView = 'ImageSurvey' ">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Image Survey</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content  class="md-Pmrimary">
        <component
            :images="images"
            :questions='questions'
            @imagesSelected="imageSelected"
            @sendAnswers="sendAnswers"
            @navigateTo="navgiateTo"
            v-bind:is="currentView" >
        </component>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Home from './components/Home';
import Questionaire from './components/Questionaire';
import ImageSurvey from './components/ImageSurvey';

export default {
  name: 'app',
  data: function(){
    return {
        currentView: 'Home',
        questions:[],
        images:[]
    }
  },
  components:{
    'Home':Home,
    'Questionaire':Questionaire,
    'ImageSurvey': ImageSurvey,
  },
  created:function(){

    var localStorage = window.localStorage;

    if(localStorage){
        var id = localStorage.getItem("id");
        if(id){
            this.id = id;
        }else{
            var randomNumber = Math.floor(Math.random() * 1000000000);
            localStorage.setItem("id", randomNumber);
            this.id = randomNumber
        }
    }else{
        console.warn('oh no you dont have localstorage')
        this.currentView = 'error';
    }

    this.axios.defaults.baseURL= '/api';
    this.axios.defaults.timeout= 200000;
    this.axios.defaults.headers.common= {'user-id': this.id}

    console.log('id = ', this.id);
    this.axios.get('http://officeblankets.com/api/survey/questions').then((response) => {
         this.$set(this, 'questions', response.data);
    });

    this.axios.get('//officeblankets.com/api/survey/images/').then((response) => {

         this.$set(this, 'images', response.data);
         this.shuffleImages();
    });


  },
  methods:{
    navgiateTo:function(string) {
        this.$set(this, 'currentView', string)
    },
    sendAnswers: function(object)  {
         this.axios.post('//officeblankets.com/api/survey/questions', object);
    },
    imageSelected: function(object) {

        this.axios.post('//officeblankets.com/api/survey/images', object);

        let removeIds = object.images.map(function(item){return item._id});
        let removeImages = this.images.filter(function(image){
            return removeIds.indexOf(image._id) === -1;
        })

        console.log(removeImages);
        this.$set(this, "images", removeImages);

    },
    shuffleImages: function() {

        let array = this.images;
        console.log(array);
        for (let i = array.length - 1; i > 0; i--) {

            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];

        }

        this.$set(this, 'images', array);
    }
  }
}

</script>

<style>
.md-app {
    min-height: 100vh;
  }

.md-drawer {
    width: 200px;
    max-width: calc(100vw - 125px);
}
</style>
