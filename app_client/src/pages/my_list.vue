<template>
	<div>
		<ds-nav :pagename="pagename"></ds-nav>
		<div class="page-wrapper">
			<div class="page-info uk-visible@s">
				<h1 class="page-name"> {{ pagename }} </h1>
				<div class="page-name-border" style="width: 100px;"></div>	
			</div>

			<div class="results">
				<!-- empty result -->
				<div v-if="isempty">{{ emptyResult }}</div>
				<!-- medicine results -->
				<div v-else="isempty" v-for="med in results" class="medicine-container card-1">
					<div class="medicine-col">
						<h4 class="medicine-name">{{ med.latin_name }}</h4>
						<h4 class="medicine-name">{{ med.arabic_name }}</h4>
						<p class="medicine-date">تاريخ إنتهاء الصلاحية : {{med.expiry_date}}</p>
						<p class="medicine-date">تاريخ الإدراج : {{med.submission_date}}</p>
						<p class="medicine-data">حالة العبوه : {{med.package_state}}</p>
						<p class="medicine-data">المحافظة : {{med.governorate}}</p>
					</div>
					<div class="medicine-col">
						<a @click="removeMedicine" v-bind:href="removeUrl + med.accessToken" class="uk-button-primary delete-button" uk-icon="icon: trash">حذف</a>
					</div>
				</div>
			</div>
		</div>
		<div v-if="pageLoading" uk-spinner></div>
	</div>
</template>

<script>
	import Navbar from '../components/nav_bar.vue';

	// notifications
	import responseError from '../notifications/response_error.json'

	const navigation = require('../data/navigation.json');
	const config = require('../config.json')

	export default {
		data() {
			return {
				pagename: navigation.my_entries.name,

				results: [], // the returned results

				// empty result
				emptyResult: "لم يتم العثور على أى إدراجات",
				isempty: false,

				// remove url
				removeUrl: config.server_url + "/api/remove/",

				//notifications
				responseError,

				// loading indicator
				pageLoading: false
			}
		},
		components: {
			'ds-nav': Navbar
		},
		methods: {
			logToken() {
				let token = this.$route.query.accesstoken
				let t = token.split("/")
			},
			getMyEntries() {
				this.pageLoading = true
				let token = this.$route.query.accesstoken
				let t = token.split("/")

				let url = config.server_url + '/api/mylist/' + t[1] 

				// request my list
				this.$http.get(url, { "credentials": true }).then(response=> {
					// success
					this.pageLoading = false
					this.results = response.data
				}, response=> {
					// error
					this.pageLoading = false
					if(response.status == 404) {
						this.isempty = true
					} else {
						UIkit.notification({
							message: this.responseError.message,
							status: 'danger',
							pos: 'top-center',
							timeout: 5000
						})
					}
				})
			},
			removeMedicine() {
				location.reload()
			}
		},
		mounted() {
			//this.logToken()
			this.getMyEntries()
		}
	}
</script>

<style>
	.results {
		margin-top: 30px;
	}
	.medicine-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		max-width: 960px;
		margin-top: 20px;
		background-color: #FFF;
	}
	.medicine-container:last-of-type {
		border-bottom: 0;
	}
	.medicine-col { 
		margin: 20px 0 20px 20px;
		padding: 10px;
		min-width: 280px;
		width: 600px;
	}

	.medicine-name {
		color: #d42720;
		display: inline-block;
		margin: 0 0 0 10px;
	}
	.medicine-date {
		color: #000;
		margin-top: 10px;
		margin-bottom: 0;
		font-size: 0.9rem;
	}
	.medicine-data {
		margin-bottom: 0;
		margin-top: 10px;
	}
	.delete-button {
		float: left;
		padding: 8px 20px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.22);
  		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
	.delete-button:hover {
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		text-decoration: none;
	}
	.delete-button > svg {
		margin-right: 10px;
	}

	.card-1 {
	  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}

	.hoverable:hover {
		cursor: pointer;	
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}

	.card-2 {
	  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}

	.card-3 {
	  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	}

	.card-4 {
	  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}

	.card-5 {
	  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
	}

	@media screen and (max-width: 640px) {
		.results {
			margin-top: -20px;
		}
		.medicine-container {
			flex-direction: column;
		}
		.medicine-col {
			margin: 0;
			min-width: 94%;
			width: 260px;
		}
	}

</style>