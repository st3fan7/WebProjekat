Vue.component("login", {
	data: function (){
		return {
			usernameInput : false,
			passwordInput : false,
			username : '',
			password : '',
			returnData : '',
			notification : false
		}
	},
	template:`
	<div>
	 <div class="logoAndNameForLogin">
	    <div class="logo">        
	        <img src="pictures/clipart302388.png"/>
	    </div>
	    <div class="webName">
	        <h3>BookingApp</h3>
	    </div>  
	 </div>
	
	
	<div class="main">
	        
	    <ul>
	        <li id="onlyHomePageInLogin"><a id="loginA" href="#/">Početna</a></li>               
	    </ul>
	</div>   
	
	<div class="signIn">
	    <div class="form-container sign-in-container">
	        <form id="form" class="formForLogin" action="#/homePage" method = "GET">
	            <h1>Prijava</h1>
	            <br><label style="color:red;" v-if="notification">{{returnData}}</label><br>
	            <input type="text" name="username" v-model="username" placeholder="Korisničko ime"></input>
	            <label style="color:red;" v-if="usernameInput">Unesite korisničko ime!</label><br>
	            <input type="password" name="password" v-model="password" placeholder="Lozinka"></input>
	            <br><label style="color:red;" v-if="passwordInput">Unesite lozinku!</label><br>
	            <button type="submit" id="signInButton" v-on:click="onSubmit">Prijavi se</button>
	        </form>
	  </div>
	    
	    <div class="overlay-container">
	        <div class="overlay">               
	            <div class="overlay-panel overlay-right">
	                <h1>Nemaš nalog?</h1>
	                <p id="loginP">Klikni ovde za registraciju!</p>
	                <button class="ghost" id="signUp" v-on:click="singUp">Registruj se</button>
	            </div>
	        </div>
	    </div>
	    </div>
	    </div>
        
	`	
	,
	methods: {
		onSubmit : function() {
			this.usernameInput = false;
			this.passwordInput = false;	
			this.notification = false;
			
			document.getElementById("form").setAttribute("onsubmit","return false;");
			if(this.username.length === 0 ){
				this.usernameInput = true;			
			}
			else{
				this.usernameInput = false;
			}
			if(this.password.length === 0){
				this.passwordInput = true;
				
			}
			else{
				this.passwordInput = false;			
				}
			
			axios.get('services/users/getUserByUsername', {params:{
				username : this.username,
				password : this.password

				}}).then(response =>{
				if (response.data.toString() === ("200")){
					this.notification = false;
					this.returnData = "";
					
					if(this.$route.params.goToReservation === true) {
						//toast('Dobrodošli', { timeOut: 500 });
						router.push({ name: 'chosenApartmentsReview', params: { apartment: this.$route.params.apartment } })
					} else {
						//toast('Dobrodošli', { timeOut: 500 });
						this.$router.push({ name: 'homePage' })
					}
					
				
				}
				else if(response.data.toString() === ("204")){
					this.notification = false;
					this.returnData = "";
				} else if(response.data.toString() === ("Vaš nalog je blokiran!")){
					toast('Vaš nalog je blokiran, ne možete izvršiti prijavu!');
				}
				else{
					this.notification = true;
					this.returnData = response.data;
				}
			});	
			
			
			
			},
			
			singUp : function() {
				if(this.$route.params.goToReservation === true) {
					this.$router.push({ name: 'registration', params: { goToReservation : true, apartment: this.$route.params.apartment }})
				} else {
					this.$router.push({ name: 'registration' })
				}
				
		},
		
		checkForbidden : function(activeUser)
		{
			if (activeUser !== null)
			{				
				this.$router.push({ name: 'forbidden' })
				
			}
			else
			{				
			axios
			.post('services/users/forbiddenUser', {'page': 'login'}).then(response => {
				if(response.status !== 200)
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
		}
		
	},
	mounted(){
			this.usernameInput = false;
			this.passwordInput = false;
			
			axios.get('services/users/getActiveUser').then(response => {
				this.activeUser = response.data;
				//this.checkForbidden(response.data)
				
				if (this.activeUser.role === "admin"){
					this.activeAdmin = true;
					
				}else{
					this.activeAdmin = false;
				}		
													
				if (this.activeUser.role === "domacin"){
					this.activeHost = true;
					
				}else{
					this.activeHost = false;
				}
				
				if (this.activeUser.role === "gost"){
					this.activeGuest = true;
				}else{
					this.activeGuest = false;
				}
					

			});	
			
	}
	
});