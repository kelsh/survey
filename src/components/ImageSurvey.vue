<template>
  <div class="">

    <md-subheader>Click on the image you like best.</md-subheader>

    <div class="md-layout md-gutter md-alignment-left-center" >
    	<div @click="selectImage(index)" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-50" v-for="(image, index) in images.slice(0,3)">
    		<img class="image-item" :src='image.url'>
    	</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'ImageSurvey',
  props:['images'],
  data () {
    return {

    }
  },
  methods:{
  	selectImage:function(index){
  		this.$emit('imagesSelected', {images: this.images.slice(0,3), selectedImage: this.images[index]})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 .image-item{
 	width:100%;
 	margin-bottom:1em;
 }
</style>
