const homePage = {template: '<homePage></homePage>'}
const login = {template: '<login></login>'}
const registration = {template: '<registration></registration>'}
const badRequest = {template: '<badRequest></badRequest>'}
const changeProfile = {template: '<changeProfile></changeProfile>'}
const adminUsers = {template: '<adminUsers></adminUsers>'}
const reservations = {template: '<reservations></reservations>'}
const addNewApartment = {template: '<addNewApartment></addNewApartment>'}
const amenitiesChange = {template: '<amenitiesChange></amenitiesChange>'}
const reviewApartments = {template: '<reviewApartments></reviewApartments>'}
const reviewInActiveApartments = {template: '<reviewInActiveApartments></reviewInActiveApartments>'}
const comments = {template: '<comments></comments>'}
const searchedApartments = {template: '<searchedApartments></searchedApartments>'}
const chosenApartmentsReview = {template: '<chosenApartmentsReview></chosenApartmentsReview>'}
const forbidden = {template: '<forbidden></forbidden>'}
const addNewHost = {template: '<addNewHost></addNewHost>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/', name:'homePage', component: homePage},	
		  { path: '/login', name:'login', component: login},
		  { path: '/registration', name:'registration', component: registration},
		  { path: '/badRequest', name:'badRequest', component: badRequest},
		  { path: '/changeProfile', name:'changeProfile', component: changeProfile},
		  { path: '/adminUsers', name:'adminUsers', component: adminUsers},
		  { path: '/reservations', name:'reservations', component: reservations},
		  { path: '/addNewApartment', name:'addNewApartment', component: addNewApartment},
		  { path: '/amenitiesChange', name:'amenitiesChange', component: amenitiesChange},
		  { path: '/reviewApartments', name:'reviewApartments', component: reviewApartments},
		  { path: '/reviewInActiveApartments', name:'reviewInActiveApartments', component: reviewInActiveApartments},
		  { path: '/comments', name:'comments', component: comments},
		  { path: '/searchedApartments', name:'searchedApartments', component: searchedApartments},
		  { path: '/chosenApartmentsReview', name:'chosenApartmentsReview', component: chosenApartmentsReview},
		  { path: '/forbidden', name:'forbidden', component: forbidden},
		  { path: '/addNewHost', name:'addNewHost', component: addNewHost}
	  ]
});

var app = new Vue({
	router,
	el: '#bookingApp'
});
