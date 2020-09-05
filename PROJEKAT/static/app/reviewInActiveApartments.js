Vue.component("reviewInActiveApartments", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			activeApartmentsForHost : null,
			priceSortBy : '',
			typeOfApartmanFilter : '',
			UnActiveApartmanCheck : false
			 
			
		}
	},
	template: `
	<div>
	
	 <div class="boundaryForScroll">
	     <div class="logoAndName">
	         <div class="logo">        
	             <img src="pictures/clipart302388.png"/>
	         </div>
	         <div class="webName">
	             <h3>BookingApp</h3>
	         </div>  
	     </div>
	 
	     <div class="main">     
	         <ul class="menu-contents">
	            <li id="onlyHomePage"><a href="#/">Početna</a></li>
	            <li v-if="activeHost" class="active"><a href="#/reviewApartments">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/reservations">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#">Komentari</a></li>   
                <li v-if="activeHost || activeAdmin"><a href="#/adminUsers">Korisnici</a></li>   
                <li v-if="activeGuest"><a href="#/reservations">Moje rezervacije</a></li>
	         </ul>
	     </div>
 
	     <div class="dropdown">
	        <button class="dropbtn">
	        	<img id="menuIcon" src="pictures/menuIcon.png" />
	        	<img id="userIcon" src="pictures/user.png" />
	        </button>
	        <div v-if="activeUser" class="dropdown-content">
	             <router-link to="/changeProfile" > Moj nalog </router-link>
	            <router-link to="/login" v-on:click.native="logOut($event)" > Odjavi se </router-link>            
	        </div>
		    <div v-else class="dropdown-content">
		        <a href="#/registration">Registruj se</a>
	            <a href="#/login">Prijavi se</a>
		    </div>
	    </div>
	 </div>

		 <div class="verticalLine"></div>
		
		 <div class="sideComponents">      
		     <ul class="ulForSideComponents">
		         <div><li ><a href="#/reviewApartments">AKTIVNI</a></li></div><br/>         
		         <div><li class="active"><a href="#/reviewInActiveApartments">NEAKTIVNI</a></li></div><br/>
		         <div><li><a href="#/addNewApartment">DODAJ APARTMAN</a></li></div><br/>
		     </ul>
		 </div>

		 <div class="titleForActiveApartments">
		     <h1>Pregled neaktivnih apartmana:</h1>
		 </div> 
		 <!-- Apartmani -->

		 <div class="listOfApartments">
		 
		 <div v-for="a in activeApartmentsForHost" >	
	 	 
			 <div class="wrapper">
		         <div class="product-img">
		             <img src="http://bit.ly/2tMBBTd" height="420" width="327">
		         </div>
		         <div class="product-info">
		             <div class="product-text">
		                 <h1>{{a.id}}</h1>
		                 <h2>Cena po noći: {{a.pricePerNight}}[RSD]</h2>
		                 <h3> </h3>
		                 <p>Tip: {{a.typeOfApartment}}, Broj soba: {{a.numberOfRooms}}, Dozvoljen broj gostiju: {{a.numberOfGuests}} </br>
		                 Adresa: {{a.location.address.street}} {{a.location.address.houseNumber}}, {{a.location.address.populatedPlace}} {{a.location.address.zipCode}}
		                 </p>
		             </div>
		             <div class="product-price-btn">
		                 <button type="button">obriši</button>
		             </div>
		             <div class="product-price-btn2">
		                     <button type="button">izmeni</button>
		             </div>
		         </div>
	         </div>
	         
	      </div>
	      </div>
		   
		     
		  
	</div>
	
	`
	,		

	methods: {	
		logOut : function(event)
		{
				if (confirm('Da li ste sigurni da želite da se odjavite?') == true) {
					axios.get('services/users/logout')
				}
				else
				{
					//event.preventDefault();
					this.$router.push({ name: 'reviewInActiveApartments' })
				}
				
		}
	},
	mounted() {
		
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
			}else{
				this.activeAdmin = false;
			}		
												
			if (this.activeUser.role === "domacin"){
				axios.get('services/apartments/getInActiveApratmentsForHost').then(response => {
					if(response.status === 200){
						this.activeApartmentsForHost = response.data;
					}else{
						toast('Trenutno ne postoje neaktivni apartmani')
					}
					
				});								
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