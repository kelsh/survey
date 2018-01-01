<template>
  <div class="md-layout-item">
  	Questionaire
  		<div v-for="question in questions">
  			<md-card>
		      <md-card-header>
		        <div class="md-title">{{question.question}}</div>
		      </md-card-header>

		      <md-card-content>
		       	id:{{question.id}}
		       	<br />
		       	question: {{question.question}}
		      </md-card-content>
		    </md-card>
  		</div>
  </div>
</template>

<script>
export default {
  name: 'Questionaire',
  props:['questions'],
  data () {
    return {
      page:0,
      _questions:this.questions
    }
  },
  watch:{
  	questions:function(){
  		this._questions = this.questions
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
