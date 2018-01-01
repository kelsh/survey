<template>
  <div class="">

  	<md-toolbar :md-elevation="0">
        <span class="md-title">Questionaire</span>
    </md-toolbar>
    <md-subheader>Question {{page+1}} of {{questions.length}}</md-subheader>

  			<md-card :md-elevation="0">
		      <md-card-header>
		        <div class="md-title">{{questions[page].question}}</div>
		      </md-card-header>

		      <md-card-content>
		       	id:{{questions[page].id}}
		       	<br />
		       	question: {{questions[page].question}}

		       	<div>
				    <md-radio class="md-primary" v-model='questions[page].answer' @click="answer(page)" :value="1">Strongly Disagree</md-radio>
				    <md-radio class="md-primary" v-model='questions[page].answer' @click="answer(page)" :value="2">Disagree</md-radio>
				    <md-radio class="md-primary" v-model='questions[page].answer' @click="answer(page)" :value="3">Unsure</md-radio>
				    <md-radio class="md-primary" v-model='questions[page].answer' @click="answer(page)" :value="4">Agree</md-radio>
				    <md-radio class="md-primary" v-model='questions[page].answer' @click="answer(page)" :value="5">Strongly Agree</md-radio>
				 </div>
		      </md-card-content>

		       <md-card-actions>
		          <md-button class="md-dense md-accent" @click="previousPage">Previous</md-button>
		          <md-button v-if="!lastPage" class="md-dense md-primary" @click="nextPage">Next</md-button>
		          <md-button v-if="lastPage" class="md-dense md-primary" @click="send">Send</md-button>
		      </md-card-actions>
		    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Questionaire',
  props:['questions'],
  data () {
    return {
      page:0,
      lastPage:false,
      sent: false,
      answers:[]
    }
  },
  watch:{
  	page:function(){
  		if(this.page+1 === this.questions.length){
  			this.lastPage = true;
  		}else{
  			this.lastPage = false;
  		}
  	}
  },
  methods:{
  	previousPage:function(){
  		if(this.page-1 > -1){
  			this.page--
  		}
  	},
  	nextPage:function(){
  		if(this.page+1 < this.questions.length){
  			this.page++
  		}
  	},
  	send:function(){
  		this.$emit('sendAnswers', this.questions.map( (question) => {return {id:question.id, answer:question.answer} }  ) )
  	},
  	answer:function(page){
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
