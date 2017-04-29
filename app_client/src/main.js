import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


// pages
import IndexPage from './pages/index.vue'
import SubmitPage from './pages/submit.vue'
import EmailusPage from './pages/emailus.vue'
import RequestEntriesPage from './pages/list_entries.vue'
import MyEntriesPage from './pages/my_list.vue'
import Aboutpage from './pages/about.vue'
import ResultsPage from './pages/results.vue'
import Verified from './pages/verified.vue'
import Page404 from './pages/404.vue'
import Page500 from './pages/500.vue'



Vue.use(VueRouter)
Vue.use(VueResource)


const routes = [
	{ path: '/', component: IndexPage },
  { path: '/submit', component: SubmitPage },
  { path: '/emailus', component: EmailusPage},
  { path: '/about', component: Aboutpage},
  { path: '/list_entries', component: RequestEntriesPage},
  { path: '/mylist', component: MyEntriesPage, props: true},
  { path: '/search', component: ResultsPage},
  { path: '/verified', component: Verified},
  { path: '/error', component: Page500 },
  { path: '/*', component: Page404}
]

let base = '/'

if (location.pathname && location.pathname != '/') {
    base = location.pathname.split('/').slice(0, -1).join('/')
}

const router = new VueRouter({
	base,
   	routes,
    mode: 'history',
    history: true,
    linkActiveClass: 'uk-active'
})

new Vue({
  el: '#app',
  router,

  render: h => h(App)
})
