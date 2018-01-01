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

    this.axios.defaults.baseURL= 'http://localhost:3001/api';
    this.axios.defaults.timeout= 2000;
    this.axios.defaults.headers.common= {'user-id': this.id}

    console.log('id = ', this.id);
    this.axios.get('/survey/questions').then((response) => {
         this.$set(this, 'questions', response.data);
    });

    this.axios.get('/survey/images/15').then((response) => {
         this.$set(this, 'images', response.data);
    });


  },
  methods:{
    navgiateTo:function(string) {
        console.log('got event');
        this.$set(this, 'currentView', string)
    },
    sendAnswers: function(object)  {
        console.log('sending survey', object)
         this.axios.post('/survey/questions', object);
    },
    imageSelected: function(object) {

        this.axios.get('/survey/images/3').then((response) => {
           this.images.push(response.data);
        });

        console.log('sending images', object);
        this.axios.post('/survey/images', object);

        this.images.splice(0,3);
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
