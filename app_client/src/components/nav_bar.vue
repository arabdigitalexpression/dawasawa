<template>
	<div>
		<nav uk-sticky uk-navbar style="z-index: 980;">
			<div class="uk-navbar-right">
				<ul class="uk-navbar-nav uk-visible@s">
					<li><router-link :to="navigation.home.route"> {{ navigation.home.name }} </router-link></li>
					<li><router-link :to="navigation.submit.route"> {{ navigation.submit.name }} </router-link></li>
					<li><router-link :to="navigation.request_entries.route"> {{ navigation.request_entries.name }} </router-link></li>
					<li><router-link :to="navigation.emailus.route"> {{ navigation.emailus.name }} </router-link></li>
					<!-- <li id="sub-nav"><router-link :to="navigation.emailus.route"> {{ navigation.about.name }}</router-link></li> -->
					<li class="dropdown">
						<div class="drp-btn">{{ navigation.about.name }}</div>
						<sub-nav></sub-nav>
					</li>
				</ul>
				<a href="#offcanvas-slide" uk-icon="icon: menu; ratio: 1.5" class="offcanvas-toggle uk-hidden@s" uk-toggle></a>
			</div>
			<div class="uk-navbar-left">
				<router-link to="/" class="logo-container uk-visible@s">
					<img class="header-logo" src="../../static/logo/dawasawa_logo@0,2x.png">
				</router-link>
				<ul class="uk-navbar-nav uk-hidden@s">
					<li>
						<p class="page-name">{{ pagename }}</p>
					</li>
					<li>
						<router-link to="/" class="logo-container">
							<img class="small-logo" src="../../static/logo/dawasawa_logo@0,1x.png">
						</router-link>
					</li>
				</ul>
			</div>
		</nav>
		<div id="offcanvas-slide" uk-offcanvas>
			<div class="uk-offcanvas-bar">
			    <ul class="uk-nav uk-nav-default">
			        <li><router-link :to="navigation.home.route"> {{ navigation.home.name }} </router-link></li>
					<li><router-link :to="navigation.submit.route"> {{ navigation.submit.name }} </router-link></li>
					<li><router-link :to="navigation.request_entries.route"> {{ navigation.request_entries.name }} </router-link></li>
					<li><router-link :to="navigation.emailus.route"> {{ navigation.emailus.name }} </router-link></li>
					<li><router-link :to="navigation.about.route"> {{ navigation.about.name }} </router-link></li>
			    </ul>

			</div>
		</div>
	</div>

</template>

<script>
	const navigation = require('../data/navigation.json');

	import SubNav from './sub_nav.vue';

	export default {
		props: [
			'pagename'
		],
		data() {
			return {
				navigation
			}
		},
		components: {
			'sub-nav': SubNav
		}
	}
</script>

<style scoped>
	nav {
		padding: 0 30px 0 40px;
		box-shadow: 1px 1px 6px #ccc;
		background-color: #FFF;
	}
	ul > li > a {
		color: #e84c3d;
	}
	ul > li > a:hover {
		background-color: #e84c3d;
		color: #fff;
	}
	.page-name {
		margin-left: 20px;
		font-size: 1.4rem;
		margin-top: 24px; 
	}	
	.offcanvas-toggle {
		fill: #e84c3d;
		margin-right: 5px;
	}
	.uk-navbar-nav li{

	}
	.header-logo {
		width: 150px;
	}
	.small-logo {
		height: 35px;
	}
	.uk-offcanvas-bar {
		padding: 0;
		padding-top: 60px; 
	}
	a.logo-container:hover {
		background: transparent; 
	}

	#offcanvas-slide li a{
		padding: 20px;
		border-bottom: 1px solid #333; 
		border-top: 1px solid #333;
	}
	.drp-btn {
		color: #e84c3d;
		margin-top: 30px;
		margin-right: 10px;
		font-size: 14px;
		cursor: pointer;
	}
	@media screen and (max-width: 640px) {
		nav {
			padding: 0 10px;
		}
		
		.uk-navbar {
			height: 60px;
		}
	}
</style>