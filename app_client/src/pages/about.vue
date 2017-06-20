<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<div class="spacing"></div>
			<div class="about-container">
	    		<p>هذه الخدمة مُقدَّمة بغرض تيسير التّعاون بين النّاس بتسهيل إيجاد الأدوية غير المتوافرة في محيط بعضهم أو هي أغلى من قدرتهم الماديّة بطريق التّوصيل ما بين من لديهم فائض من أدوية يرغبون في التّبرُّع بها و&nbsp;من يطلبون تلك الأدوية.</p>
				<p>هذه الخدمة مجّانية لا يُدفع مقابل عينيّ و&nbsp;لا مادّي لاستخدامها، و&nbsp;لا تقدِّم مشورة صيدليّة، و&nbsp;لا يُقصد بها الاتّجار في الأدوية. و استخدامها يُعدُّ موافقة ضمنيّة على <router-link :to="navigation.terms_of_service.route">شروط الخدمة</router-link>.</p>
				<p>لعرض دواء زائد عن حاجتك ينبغي ألّا تقلّ المدّة الباقية على انتهاء صلاحيّته عن المدّة المبيّنة في استمارة الإدخال، كما تنبغي مراعاة الدّقة عند إدخال بيانات الدّواء.</p>
				<p>
				تُحذف إدراجات الأدوية تلقائيا بانتهاء صلاحيّتها أو بطلب المستخدم الذي أدرجها.
				</p>
				<p>هذا النّظام لا يستعمل كلمات السّر! هذا آمَن و يعفيك من عناء تذكُّر كلمة سرّ أخرى. كلّ المعاملات تجري بطريق رسائل البريد الإلكتروني، فتنبغي مراعاة الدّقّة في إدخال عنوان البريد. النّظام لا يحفظ أيّة بيانات عن المستخدمين واضعي الإدراجات غير ما هو مبيّن في <router-link
				:to="navigation.data_policy.route">سياسة البيانات</router-link>، و&nbsp;لا يحفظ أيّة بيانات عن الطّالبين.</p>
				<p>
					طالبو الأدوية مسؤولون عن التّحقّق من صلاحيتها و&nbsp;ملاءمتها لاحتياجاتهم، و&nbsp;عن أيّ تعامل بينهم و&nbsp;المانحين كما هو موضّح في <router-link :to="navigation.disclaimer.route">بيان إخلاء المسؤولية</router-link>.
				</p>
				<p>هذه الخدمة أنشئت و&nbsp;تُشغّل بتبرّعات من أفراد مصريين كُرماء.</p>
				<p>الاسم من ابتكار لميا :)</p>
	    	</div>
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
				pagename: "عن الخدمة",
				navigation
			}
		},
		components: {
			'ds-nav': Navbar,
			'ds-alert': Alert
		},
		methods: {
			setPagename(name) {
				this.pagename = name
			}
		}
	}
</script>

<style>
	.spacing {
		height: 30px;
	}
	.about-container p {
		font-size: 1.5rem;
		font-family: 'Lateef', serif !important;
		text-align: justify;
		max-width: 1200px;
		font-weight: 300;
	}
	.about-container li {
		font-size: 1.1rem;
		font-family: 'Lateef', serif !important;
		margin-bottom: 10px;
	}
	.about-container a {
		font-size: 1.3rem;
		font-family: 'Lateef', serif !important;
	}
	@media screen and (max-width: 640px) {
		.spacing {
			height: 0;
		}
		.about-container {
			margin-top: -40px;
			width: 95%;
		}
		p {
			font-size: 1.2rem;
			line-height: 1.8;
			word-spacing: 0.2rem;
		}
		.about-container li {
			font-size: 1.1rem;
			margin-bottom: 10px;
		}
		.about-container a {
			font-size: 1.1rem;
		}
	}
</style>
