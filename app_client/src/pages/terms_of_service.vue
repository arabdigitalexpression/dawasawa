<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 200px;"></div>	
			</div>
			<div class="spacing"></div>
			<div class="about-container">
	    		<p>بمواصلة استخدامك هذه الخدمة و&nbsp;مطالعة المنشور عبرها فإن ذلك يعد إقرارًا ضمنيا منك بقبول الشروط التالية:</p>
				<ul class="bulky-list">
					<li>إقرارك بأنّ استخدامك الخدمة فعلك بإرادتك و&nbsp;باختيارك</li>
					<li>قبول وصفك "مستخدمًا" للخدمة على النحو الذي يرد في هذه الشروط و&nbsp;في <router-link :to="navigation.disclaimer.route">بيان إخلاء المسؤولية</router-link> و&nbsp;في<router-link :to="navigation.data_policy.route"> سياسة البيانات</router-link></li>
					<li>قبولك كُلِّ المسؤولية عن كلّ تصرّفاتك عبرها و&nbsp;قبول إخلاء مسؤولية الخدمة كما هو مذكور في <router-link :to="navigation.disclaimer.route">بيان إخلاء المسؤولية</router-link></li>
					<li>امتناعك عن أي فعل بطريق الخدمة يكون فيه أي ضرر لأي شخص أو مخالفة القانون</li>
					<li>امتناعك عن كل ما من شأنه تعطيل الخدمة أو منعها عن آخرين، أو استخدامها على نحو غير الذي ترشدك إليه الخدمة</li>
					<li>التزامك بإدخال بيانات و&nbsp;معلومات صحيحة حيثما يُطلب إدخال بيانات و&nbsp;معلومات</li>
					<li>قبولك كلّ المسؤولية عما يترتب على إتاحة نفاذ الكافة إلى البيانات و&nbsp;المعلومات التي تدخلها</li>
				</ul>
	    	</div>
		</div>
	</div>
</template>
<script>
	import Navbar from '../components/nav_bar.vue';

	const navigation = require('../data/navigation.json');

	export default {
		data() {
			return {
				pagename: "شروط الاستخدام",
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