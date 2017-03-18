<template>
	<div>
		<nav uk-navbar style="z-index: 980;">
			<div class="uk-navbar-right">
				<ul class="uk-navbar-nav uk-visible@s">
					<li><router-link :to="navigation.home.route"> {{ navigation.home.name }} </router-link></li>
					<li><router-link :to="navigation.submit.route"> {{ navigation.submit.name }} </router-link></li>
					<li><router-link :to="navigation.request_entries.route"> {{ navigation.request_entries.name }} </router-link></li>
					<li><router-link :to="navigation.emailus.route"> {{ navigation.emailus.name }} </router-link></li>
					<li><router-link :to="navigation.about.route"> {{ navigation.about.name }} </router-link></li>
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
	export default {
		props: [
			'pagename'
		],
		data() {
			return {
				navigation
			}
		}
	}
</script>

<style scoped>
	nav {
		padding: 0 20px;
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
	.small-logo {
		height: 45px;
	}
	.uk-offcanvas-bar {
		padding: 0;
		padding-top: 60px; 
	}
	#offcanvas-slide li a{
		padding: 20px;
		border-bottom: 1px solid #333; 
		border-top: 1px solid #333;
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