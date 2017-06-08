<template>
	<div class="">
		<ds-nav :pagename="pagename"></ds-nav>
		<br>
		<div class="success-message">
			
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue';
	import Alert from '../components/alert.vue';
	import emailusSuccess from '../notifications/emailus_success.json';
	import listEntriesSuccess from '../notifications/listentries_success.json';

	const navigation = require('../data/navigation.json');

	export default {
		data() {
			return {
				pagename: navigation.submit.name,
				navigation,
				message: ""
			}
		},
		components: {
			'ds-nav': Navbar,
			'ds-alert': Alert
		},
		mounted() {
			// this.type = this.$route.query.type
			if(this.$route.query.type == 1)	this.message = listEntriesSuccess.message
			if(this.$route.query.type == 2)	this.message = emailusSuccess.message
			this.renderMessage()
		},
		methods: {
			renderMessage() {
				$('.success-message').html(this.message)
			}
		}
	}
</script>

<style>
	.success-message {
		text-align: center;
	}
	.success-message p {
		color: #32d296;
	}
</style>
