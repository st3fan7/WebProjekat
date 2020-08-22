Vue.component("login", {
	data: function (){
		return {		
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
	        <li id="onlyHomePageInLogin"><a id="loginA" href="#">Početna</a></li>               
	    </ul>
	</div>   
	
	<div class="signIn">
	    <div class="form-container sign-in-container">
	        <form class="formForLogin" action="#">
	            <h1>Prijava</h1>
	            <input type="text" placeholder="Korisničko ime" />
	            <input type="password" placeholder="Lozinka" />
	            <button id="signInButton">Prijavi se</button>
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
		},
	mounted(){
	}
	
});