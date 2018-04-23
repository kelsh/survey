<template>
    <div id="app" class="page-container" >

    <md-app>
        <md-app-toolbar class="brand" :class='{"on-blur":messageOpened,"off-blur":!messageOpened}'>
            <div class="logo">OfficeBlankets.Com</div>
        </md-app-toolbar>

        <md-app-content  class="md-Pmrimary" >

            <Home
                v-if="messageOpened"
                :visits="visits"
                @closeModal="closeModal"
            >

            </Home>

            <div :class='{"on-blur":messageOpened,"off-blur":!messageOpened}'>
                <Questionaire
                @sendAnswers="sendAnswers"
                :questions='questions'
                >

                </Questionaire>

                <ImageSurvey
                :images="images"
                :questions='questions'
                @imagesSelected="imageSelected"
                >
                </ImageSurvey>
            </div>
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
        questions:[],
        images:[],
        messageOpened:true
    }
  },
  components:{
    'Home':Home,
    'Questionaire':Questionaire,
    'ImageSurvey': ImageSurvey,
  },
  created:function(){

    this.$material.theming.theme = 'myTheme'

    var localStorage = window.localStorage;

    if(localStorage){

        //get id or assign one
        var id = localStorage.getItem("id");
        if(id){
            this.id = id;
        }else{
            var randomNumber = Math.floor(Math.random() * 1000000000);
            localStorage.setItem("id", randomNumber);
            this.id = randomNumber
        }

        //get number of visits
        var visits = parseInt(localStorage.getItem("visits"));
        if(visits){

            this.visits = visits++;
            localStorage.setItem("visits", this.visits);
        }

        else{

            this.visits = 1;
            localStorage.setItem("visits", 1);
        }
    }

    else{
        console.warn('oh no you dont have localstorage')
        this.currentView = 'error';
    }

    this.axios.defaults.baseURL= '/api';
    this.axios.defaults.timeout= 200000;
    this.axios.defaults.headers.common= {'user-id': this.id}

    if(this.visits){
        this.messageOpened = true;
    }

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
    closeModal:function(){
        this.messageOpened = false;
    },
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

<style lang='scss'>

@import './theme.scss';

.md-card .md-title{
    font-family:'gotham';
    font-weight: 400;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: .15em;
    line-height: 15px;
    color: #000;
    text-decoration: none;
    font-size: 13px;
    padding: 10px 0;
}
body,html{
    font-family: 'Raleway', sans-serif;
}
body,html,.page-container, .md-theme-default{
    background-color:#EAEBEF;
}
.md-app-toolbar{
    min-height:60px;
    box-shadow: 0px 0px;
}

.md-app-toolbar.brand{
     background-color: transparent;
}

.brand{
    display: flex;
    align-items:center;
    justify-content: center;
}
.logo{
    font-size:2em;
    font-family: 'Sacramento', cursive;
}
.md-app {

    min-height: 100vh;
  }

.md-drawer {
    width: 200px;
    max-width: calc(100vw - 125px);
}

.on-blur{
    transition: filter .2s;
    filter: blur(20px);
}
.off-blur{
     transition: filter .2s;
     filter: blur(0px);
}
</style>
