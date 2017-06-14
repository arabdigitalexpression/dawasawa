<template>
	<div>
		<ul class="sub-nav">
			<li><router-link :to="navigation.about.route">{{ navigation.about.name }}</router-link></li>
			<li><router-link :to="navigation.terms_of_service.route">{{ navigation.terms_of_service.name }}</router-link></li>
			<li><router-link :to="navigation.disclaimer.route">{{ navigation.disclaimer.name }}</router-link></li>
			<li><router-link :to="navigation.data_policy.route">{{ navigation.data_policy.name }}</router-link></li>
		</ul>
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
	ul.sub-nav {
		background: #FFF;
		margin-top: 20px;
		list-style: none;	
	}
	ul.sub-nav li {
		display: inline;
		margin-right: 30px;
	}
</style>