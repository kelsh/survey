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

      <md-app-content >
        <component :questions='questions'  @navigateTo="navgiateTo" v-bind:is="currentView" >
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
        questions:[{id:123, question:"wakka wakka"}, {id:222, question:"question two"}]
    }
  },
  components:{
    'Home':Home,
    'Questionaire':Questionaire,
    'ImageSurvey': ImageSurvey,
  },
  created:function(){
    this.axios.get('http://localhost:3001/api/survey/questions').then((response) => {
         this.$set('questions', response.data);
    });
  },
  methods:{
    navgiateTo: function(value){
        console.log('got event');
        this.$set(this, 'currentView', value)
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
