<template>
	<div class="">
		<ds-nav :pagename="pagename"></ds-nav>
		<br>
		<div class="error-message">
			<h1>500</h1>
			<p>حدث خطأ فى الطلب</p>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue';
	import Alert from '../components/alert.vue';

	const navigation = require('../data/navigation.json');

	export default {
		data() {
			return {
				pagename: navigation.submit.name,

				navigation
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
	.error-message {
		text-align: center;
	}
</style>
