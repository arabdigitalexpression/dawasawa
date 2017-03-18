<template>
	<router-link :to="route">
		<div class="ds-link-button">
			{{ name }}
		</div>
	</router-link>
</template>
<script>
	export default {
		props: [
			'name',
			'route'
		]
	}
</script>
<style scoped>
	.ds-link-button {
		background-color: #e84c3d;
		padding: 10px;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s linear;
		box-shadow: 1px 1px 10px #333;
	}
	a {
		text-decoration: none;
	}
	a:hover {
		text-decoration: none;
	}
	.ds-link-button:hover {
		box-shadow: 1px 1px 5px #333;
		background-color: #d42720;
	}
	@media screen and (max-width: 640px) {
		.ds-link-button {
			padding: 8px;
			font-size: 1rem;
		}
	}
</style>