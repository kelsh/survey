<template>
	<div class="">
	<transition name="slide-fade" mode="out-in">
			<div v-if="questions.length>0" >
					<transition name="slide-fade" mode="out-in">
					<md-card  :md-elevation="0" :key="page">
						<div v-if="!done">
							<md-subheader>{{page+1}} of {{questions.length}}</md-subheader>

							<md-card-header>
								<div class="md-title">{{questions[page].question}}</div>
							</md-card-header>

							<md-card-content>
								<div>
									<md-radio class="md-primary" v-model='questions[page].answer' @change="nextPage()" :value="5">Yes</md-radio>
									<md-radio class="md-primary" v-model='questions[page].answer' @change="nextPage()" :value="1">No</md-radio>
								</div>
							</md-card-content>
						</div>

						<div v-if="done" :key="done">

							<md-card-header>
								<div class="md-title">Thanks! your answers were sent</div>
							</md-card-header>

							<md-card-content>

								<!-- <span class="">u wanna sign up for our newsletter when office blankets are ready?</span> -->

							<div class="md-layout md-gutter">

								 <md-field :class="getValidationClass('email')" class="md-layout-item md-size-50">
						            <label for="email">Email</label>
						            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
						            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
						            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
						         </md-field>

						         <div class="md-layout-item">
						         	\HIIIIIIIII
						         </div>
						     </div>

							</md-card-content>
						</div>

					</md-card>
					</transition>
			</div>



	</transition>
	</div>
</template>

<script>

import { validationMixin } from 'vuelidate'
import {
required,
email,
minLength,
maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'Questionaire',
  props:['questions'],
  mixins: [validationMixin],
  data () {
    return {
      page:0,
      lastPage:false,
      sent: false,
      answers:[],
      done:false,
      form:{
      	email:""
      }
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
  validations: {
      form: {
        email: {
          required,
          email
        }
      }
    },
  methods:{
  	getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
  	previousPage:function(){
  		if(this.page-1 > -1){
  			this.page--
  		}
  	},
  	nextPage:function(){
  		if(this.page+1 < this.questions.length){
  			this.page++
  		}
  		if(this.page+1 === this.questions.length){
  			this.send();
  		}
  	},
  	send:function(){
  		console.log('emitting answers');
  		this.$emit('sendAnswers', this.questions.map( (question) => {return {id:question._id, answer:question.answer} }  ) )
  		this.$set(this, "done", true);
  	},
  	answer:function(page){
  		console.log(nextPage);
  		this.nextPage();
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
	.md-card-header{
		padding:0;
		padding-left:16px;
	}
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for <2.1.8 */ {
	  opacity: .3;
	}
</style>
