const homePage = {template: '<homePage></homePage>'}
const login = {template: '<login></login>'}
const registration = {template: '<registration></registration>'}
const badRequest = {template: '<badRequest></badRequest>'}
const changeProfile = {template: '<changeProfile></changeProfile>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/', name:'homePage', component: homePage},	
		  { path: '/login', name:'login', component: login},
		  { path: '/registration', name:'registration', component: registration},
		  { path: '/badRequest', name:'badRequest', component: badRequest},
		  { path: '/changeProfile', name:'changeProfile', component: changeProfile}
		  
	  ]
});

var app = new Vue({
	router,
	el: '#bookingApp'
});
