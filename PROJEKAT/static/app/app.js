const homePage = {template: '<homePage></homePage>'}
const login = {template: '<login></login>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/homePage', name:'homePage', component: homePage},	
		  { path: '/login', name:'login', component: login}
		  	
	  ]
});

var app = new Vue({
	router,
	el: '#bookingApp'
});
