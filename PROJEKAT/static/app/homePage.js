Vue.component("homePage", {
	data: function (){
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false
			
		}
	},
	template:`
	<div class="bg">

	    <div class="logoAndName">
	        <div class="logo">        
	            <img src="pictures/clipart302388.png"/>
	        </div>
	        <div class="webName">
	            <h3>BookingApp</h3>
	        </div>  
	    </div>
	
	    <div class="main">
	        <ul>
	            <li id="onlyHomePage" class="active"><a href="#">Početna</a></li>
	            <li v-if="activeHost"><a href="#">Moji apartmani</a></li>
                <li v-if="activeHost"><a href="#">Rezervacije</a></li>
                <li v-if="activeHost"><a href="#">Komentari</a></li>   
	        </ul>
	    </div>
	    
	    <div class="quote">
	        <h2>Samo oni koji će rizikovati da odu predaleko 
	            <br/> mogu da otkriju koliko daleko može da se ode!
	        </h2>
	    </div>  
	
	    <div class="dropdown">
	        <button class="dropbtn">
	        	<img id="menuIcon" src="pictures/menuIcon.png" />
	        	<img id="userIcon" src="pictures/user.png" />
	        </button>
	        <div v-if="activeHost" class="dropdown-content">
	            <a href="#">Moj nalog</a>
	            <a href="#">Odjavi se</a>	            
	        </div>
		    <div v-else class="dropdown-content">
		        <a href="#">Registruj se</a>
	            <a href="#/login">Prijavi se</a>
		    </div>
	    </div>
	
	    <div class="search">
	        <form>
	            <h1>Gde putujete?</h1>
	            <div class="form-box">
	                <input type="datetime" class="search-field date" placeholder="Datum">
	                <input type="text" class="search-field location" placeholder="Lokacija (Grad, Država)">
	                <input type="text" class="search-field price" placeholder="Cena (Od-Do)">
	                <input type="text" class="search-field rooms" placeholder="Broj soba (Od-Do)">
	                <input type="text" class="search-field persons" placeholder="Broj osoba">
	                <button class="search-btn" type="button">Pretraži</button>
	            </div>
	        </form>
	    </div>
    
	</div>
        
	`	
	,
	methods: {
		},
	mounted(){

			axios.get('services/users/getActiveUser').then(response => {
				this.activeUser = response.data;
				
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
					this.acitveGuest = true;
				}else{
					this.acitveGuest = false;
				}
					

			});	
			
	}
	
});