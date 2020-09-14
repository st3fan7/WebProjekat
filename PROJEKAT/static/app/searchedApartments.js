Vue.component("searchedApartments", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			activeApartmentsForHost : null,
			priceSortBy : '',
			typeOfApartmanFilter : 'Tip',
			UnActiveApartmanCheck : false,
			changeApartmentButtonClicked : false,
			apartmentId : '',
			apType : '',
			apStatus : '',
			apRooms : null,
			apNumberOfGuests : null,
			apPriceForNightName : null,
			amenitiesList : [],
			apLocation : '',
			apAddress : '',
			apStartTime : '',
			apEndTime : '',
			showNotification : false,
			checkedList : [],
			apStartDate : '',
			state : {
			    disabledDates: {
			     to: new Date(),
			     }
			   },
			startDateModel : '',
			endDateModel : '',
			comments : [],
			reservations : [],
			oldId : '',
			freeDates : [],
			pictures : [],
			filteredAmenitiesList : [],
			activeApartmentsNOTCHANGEDlist : [],
			statusOfApartmentFilter : 'Status'
				
			 
			
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
	            <li v-if="activeHost"><a href="#/reviewApartments">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#/amenitiesChange">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/reservations">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/comments">Komentari</a></li>   
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
		     <li class="active"><a href="#/searchedApartments">REZULTAT PRETRAGE</a></li>
	     </ul>
	 </div>
	 
		 <div class="sortAndFilterReviewApartments">
		     <div class="price-title">
		         <h1 id="sort-text-in-user-reservation">Sortiraj po ceni:</h1>
		         <form id="formForSort" action="#">
		             
				         <select id="statusID" name="statusName" v-model="priceSortBy">
				                 <option value="rising">Rastuća</option>
				                 <option value="falling">Opadajuća</option>
		                 </select>
		 
		                 <div class="sort-price-btn">
		                     <button id="searchInUserReservation" type="button" @click="SortByPrice()">Sortiraj</button>
		                 </div>
		             </form>
		     </div>
		     <div class="filter-title" style="margin-top: -65px;">
		             <h1>Filtriraj po:</h1>
		             <select id="statusID" name="statusName" v-model="typeOfApartmanFilter">
                     <option value="Tip" selected>Tip</option>
                     <option value="Soba">Soba</option>
                     <option value="Ceo apartman">Ceo apartman</option>
                     </select> 
                  
                     
                      	<h1>Sadržaj:</h1>
           
			           <div  style="overflow-y:scroll;height:13em;">
				            <span class="spanAmenities" v-for="a in amenitiesList">
				            <br><label class="container">
				                <input type="checkbox" :value="a.content" v-model="filteredAmenitiesList">
				                <div class="text-checkbox">{{a.content}}</div>
				                <span class="checkmark"></span>
				                </label>
				                <br>
				            </span>
				     	</div>
				     	<form id="formForSearch">
			                <div class="filter-btn-in-review-apartment">
			                    <button type="button" @click="filterByAmenities()">Filtriraj</button>
			                </div>
			            </form>
		         </div>
		      </div>


		 <div class="titleForActiveApartments">
		     <h1>Rezultat pretrage apartmana:</h1>
		     <a @click="resetAppButtonClicked()" class="previous"> Resetuj apartmane</a>
		 </div> 
		 
		 <!-- Apartmani -->

		 <div class="listOfApartments">
		 
		 <div v-for="a in filteredApartments" >	
	 	 
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
		                 Adresa: {{a.location.address.street}} {{a.location.address.houseNumber}}, {{a.location.address.populatedPlace}} {{a.location.address.zipCode}}, {{a.location.address.country}}
		                 </p>
		                 <p>
		    			 Domaćin: {{a.host}}
		                 </p>
		                 </div>
		           <div class="review-btn">
                            <button type="button" @click="viewApartment(a)">pogledaj</button>
                    </div>
		         </div>
	         </div>
	         
	      </div>
	      
	      
	      
	      
		   </div>		     
		  
	</div>
	
	`
	,
	components : {
		vuejsDatepicker
	},	
	computed : {
		filteredApartments() {
	  		  
	  			  		
			if (this.typeOfApartmanFilter === "Soba") {
      	return this.activeApartmentsForHost.filter((ap) => {
        	return ((ap.typeOfApartment.startsWith(this.typeOfApartmanFilter)));
        });
      }else if(this.typeOfApartmanFilter === "Ceo apartman"){	    	
    	  return this.activeApartmentsForHost.filter((ap) => {
          	return ap.typeOfApartment.startsWith("Ceo apartman");
          });    	  
      }else if(this.typeOfApartmanFilter === "Tip"){
    	  return this.activeApartmentsForHost;
      }else{
    	  return this.activeApartmentsForHost;
      		} 
			
	  }
	  	
      
		
		
	},

	methods: {	
		logOut : function(event)
		{
				if (confirm('Da li ste sigurni da želite da se odjavite?') == true) {
					axios.get('services/users/logout')
				}
				else
				{
					//event.preventDefault();
					
					this.$router.push({ name: 'reviewApartments' })
				}
				
		},
		SortByPrice : function()
		{
    	
    	
        	if(this.priceSortBy === "rising"){
        		return this.activeApartmentsForHost.sort((a, b) => a.pricePerNight - b.pricePerNight );
        	}else if(this.priceSortBy === "falling"){
        		return this.activeApartmentsForHost.sort((a, b) => b.pricePerNight - a.pricePerNight );
        	}else{
        		return this.activeApartmentsForHost;
        	}
	
		},		
		
		resetAppButtonClicked : function(){
			
			
			if(confirm('Da li ste sigurni da želite da resetujete listu apartmana?')){

							this.activeApartmentsForHost = this.activeApartmentsNOTCHANGEDlist;

				
			}
		},
		
		filterByAmenities : function() {
			
			
			   axios.post('services/apartments/filterByAmenities', this.activeApartmentsNOTCHANGEDlist, {params: {"checkedAmenities" : [] +  this.filteredAmenitiesList}}).
			   then(response => {
					if(response.status === 200)
					{
						toast("Apartmani su uspešno filtrirani!");
						this.activeApartmentsForHost = response.data;
					} else if(response.data === 400) {
						this.$router.push({name : 'badRequest'});
					} else{		
						this.activeApartmentsForHost = [];
						toast("Nema apartmana za izbrane filtere!");
					}
			   });
		},
		
		viewApartment : function(apartment) {
			router.push({ name: 'chosenApartmentsReview', params: { apartment: apartment, activeApartmentsNOTCHANGEDlist : this.activeApartmentsNOTCHANGEDlist} })
		}
		
		
	},
	mounted() {
		
//		axios.get('services/apartments/getSearchedApartments').then(response => {
//			if(response.status === 200){
//				this.activeApartmentsForHost = response.data;
//				this.activeApartmentsNOTCHANGEDlist = response.data;
//			}else{
//				toast('Trenutno ne postoje apartmani')
//			}
//			
//		});	
		
		this.activeApartmentsForHost = this.$route.params.searchedApartments;
		this.activeApartmentsNOTCHANGEDlist = this.$route.params.searchedApartments;
		
		axios.get('services/amenities/getAllAmenities').then(response => {
			this.amenitiesList = response.data;			
		});
		
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
				this.activeGuest = true;
			}else{
				this.activeGuest = false;
			}
				

		});	
	}
});