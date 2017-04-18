<template>
	<div v-if="alert">
		<div :class="alertClass" uk-alert>
			<p>{{ alertText }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'alertClass', //class name
			'alert',	// if false alert is hidden
			'alertText' // the message of the alert
		]
	}
</script>

<style scoped>
	.uk-alert {
		bottom: 0;
		left: 25%;
		right: 25%;
		max-width: 960px;
		position: fixed;
		z-index: 1000;
		text-align: center;
		font-size: 1rem;
	}

	@media screen and (max-width: 640px) {
		.uk-alert {
			width: 100%;
			left: 0;
			right: 0;
			max-width: 100%;
			position: fixed;
			z-index: 199;
			text-align: right;
			font-size: 0.8rem;
		}
	}
</style>