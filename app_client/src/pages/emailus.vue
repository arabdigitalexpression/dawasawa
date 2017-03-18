<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>
			<div>
				<form id="emailus-form" class="uk-form-stacked">
					<div class="uk-margin">
						<label class="uk-form-label" for="username">نحب مخاطبتك باسمك عند التواصل معك</label>
						<div class="uk-form-controls uk-inline">
							<span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: user"></span>
				            <input class="uk-input" id="username" type="text" placeholder="فلان الفلاني">
				        </div>
					</div>
					<div class="uk-margin">
						<label class="uk-form-label" for="email">عنوان البريد الإلكتروني</label>
						<div class="uk-form-controls uk-inline">
						 	<span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: mail"></span>
				            <input class="uk-input" id="email" type="email" placeholder="عنوان بريدك الإلكتروني مطلوب لنتمكن من الردّ عليك إذا لزم الأمر">
				        </div>
					</div>
					<div class="uk-margin">
						<label class="uk-form-label" for="message">الرسالة</label>
						<div class="uk-form-controls">
				            <textarea id="message" class="uk-textarea" rows="5"></textarea>
				        </div>
					</div>
					<button id="email-us-submit" class="uk-button uk-button-primary">إرسال</button>
				</form>
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
				pagename: navigation.emailus.name
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
	#emailus-form {
		margin-top: 30px;
	}
	#emailus-form  .uk-input, #emailus-form  .uk-textarea {
		width: 640px;
	}
	@media screen and (max-width: 640px) {
		#emailus-form {
			margin-top: 10px;
		}
		#emailus-form  .uk-input, #emailus-form  .uk-textarea {
			font-size: 0.8rem;
			min-width: 300px;
			width: 640px;
		}
	}
</style>