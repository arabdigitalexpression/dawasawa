<template>
	<div>
		<ds-nav></ds-nav>
		<div class="page-wrapper">
			<br>
			<p class="uk-text-center uk-text-success">
				شكرا لك! سيظهر هذا الإدراج في نتائج البحث بعد قليل. نرجو أن يجد هذا الدواءَ من يحتاجُه.
			</p>
			<p class="uk-text-center">لمطالعة إدراجاتك الأخرى - إنْ وُجدت - و&nbsp;إدارتها اتّبع الإرشادات في قسم 	
				<router-link :to="navigation.request_entries.route">إدراجاتي</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/nav_bar.vue'

const navigation = require('../data/navigation.json')

export default {
	data() {
		return {
			navigation
		}
	},
	components: {
			'ds-nav': Navbar
		}
}
	
</script>

<style>
	
</style>
