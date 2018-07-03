<template>
	<div>
		<b-container>
			<b-jumbotron bg-variant="primary" text-variant="white" border-variant="dark">
			  <template slot="header">
			    Search Recipes
			  </template>
			  <template slot="lead">
			    Search thousands of recipes online.
			  </template>
			  <hr class="my-4">
			</b-jumbotron>
			<div class="text-center">
				<form method="get" action="" @submit.prevent="searchRecipe">
					<input class="form-control" autocomplete="off" placeholder="Omelet" type="text" name="query" v-model="recipe.query">
					<br>
					<input class="btn btn-primary" type="submit" name="submit" value="search">
					<span v-if="query_empty" class="alert" style="color: red;">Please enter something</span>
				</form>
			</div>
			
			<br>
			<div v-if="success">
				<b-list-group>
				  <b-list-group-item v-for="recipe in recipes">
				  	<b-img v-if="recipe.pic" right :src="recipe.pic" rounded width="75" height="75" blank-color="#777" alt="img" class="m-1" />
				    <b-link :href="recipe.link" target="_blank">{{ recipe.title }}</b-link>
				  </b-list-group-item>
				</b-list-group>
				<p class="text-center" v-if="zero_results" show variant="danger">No Recipes Found</p>
			</div>
			<p class="text-center" v-if="searching">Searching</p>
		</b-container>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				recipe:{
					query:''
				},
				query_empty:false,
				zero_results: false,
				searching: false,
				recipes:[],
				success:false
			}
		},
		methods : {
			searchRecipe : function(){
				this.searching = true;
				this.zero_results = false;
				this.recipes = [];
				let data = this.recipe;
				if(data.query == '')
				{
					this.query_empty = true;
					this.searching = false;
				}
				else
				{
					this.query_empty = false;
					this.$http.jsonp('http://www.recipepuppy.com/api/?q='+data.query,{jsonpCallback: 'myCallback'}).then(function(data){
				  		this.success = true;
				  		this.searching = false;
				  		if(data.body.results.length > 0){
				  			this.zero_results = false;
				  			data.body.results.forEach(a=>{this.recipes.push({'title':a.title, 'link':a.href, 'pic':a.thumbnail})});
				  		}
				  		else
				  		{
				  			this.zero_results = true;
				  		}
						

					}).catch(e => {
						console.log(e);
					});
				}	
			}
		}
	}
</script>