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
	        <li id="onlyHomePageInLogin"><a id="loginA" href="#/homePage">Početna</a></li>               
	    </ul>
	</div>   
	
	<div class="signIn">
	    <div class="form-container sign-in-container">
	        <form id="form" class="formForLogin" action="#/homePage" method = "GET">
	            <h1>Prijava</h1>
	            <label v-if="notification">{{returnData}}</label><br><br>
	            <input type="text" name="username" v-model="username" placeholder="Korisničko ime"></input>
	            <label v-if="usernameInput">Unesite korisničko ime!</label><br>
	            <input type="password" name="password" v-model="password" placeholder="Lozinka"></input>
	            <br><label v-if="passwordInput">Unesite lozinku!</label><br>
	            <button type="submit" id="signInButton" v-on:click="onSubmit">Prijavi se</button>
	        </form>
	  </div>
	    
	    <div class="overlay-container">
	        <div class="overlay">               
	            <div class="overlay-panel overlay-right">
	                <h1>Nemaš nalog?</h1>
	                <p id="loginP">Klikni ovde za registraciju!</p>
	                <button class="ghost" id="signUp">Registruj se</button>
	            </div>
	        </div>
	    </div>
	    </div>
	    </div>
        
	`	
	,
	methods: {
		onSubmit : function() {
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
			
			axios.get('/services/users/getUserByUsername', {params:{
				username : this.username,
				password : this.password

				}}).then(response =>{
				if (response.data.toString() === ("200")){
					this.notification = false;
					this.returnData = "";
					this.$router.push({ name: 'homePage' })
				
				}
				else if(response.data.toString() === ("204")){
					this.notification = false;
					this.returnData = "";
				}
				else{
					this.notification = true;
					this.returnData = response.data;
				}
			});	
			
			
			
			}
		},
	mounted(){
			this.usernameInput = false;
			this.passwordInput = false;
	}
	
});