<template>
	<div>
		<div class="dropdown-elements">
			<router-link :to="navigation.about.route">{{ navigation.about.name }}</router-link>
			<router-link :to="navigation.terms_of_service.route">{{ navigation.terms_of_service.name }}</router-link>
			<router-link :to="navigation.disclaimer.route">{{ navigation.disclaimer.name }}</router-link>
			<router-link :to="navigation.data_policy.route">{{ navigation.data_policy.name }}</router-link>
		</div>
	</div>
</template>
<script>
	const navigation = require('../data/navigation.json');

	

	export default {
		data() {
			return {
				navigation
			}
		}
	}
</script>
<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}
	.dropdown-elements {
		margin-top: 30px;
		display: none;
    	position: absolute;
    	background-color: #FFF;
    	min-width: 160px;
    	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    	z-index: 1;
	}
	.dropdown-elements a {
		padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	}
	.dropdown-elements a:hover {background-color: #f1f1f1}
	.dropdown:hover .dropdown-elements {
    	display: block;
	}
</style>