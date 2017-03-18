<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue';
	import Alert from '../components/alert.vue';

	const navigation = require('../data/navigation.json');

	export default {
		data() {
			return {
				pagename: navigation.submit.name
			}
		},
		components: {
			'ds-nav': Navbar,
			'ds-alert': Alert
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>