Vue.component("login", {
	data: function (){
		return {
			usernameInput : false,
			passwordInput : false,
			username : '',
			password : ''
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
	        <form class="formForLogin" action="#" >
	            <h1>Prijava</h1>
	            <input type="text" name="username" v-model="username" placeholder="Korisničko ime"></input>
	            <label v-if="usernameInput">Unesite korisničko ime!</label><br>
	            <input type="password" name="password" v-model="password" placeholder="Lozinka"></input>
	            <br><label v-if="passwordInput">Unesite lozinku!</label><br>
	            <button type="submit" id="signInButton" v-on:click="loginSubmit">Prijavi se</button>
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
		loginSubmit : function() {
			//document.getElementById("form").setAttribute("loginSubmit","return false;");
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
			}
		},
	mounted(){
			this.usernameInput = false;
			this.passwordInput = false;
	}
	
});