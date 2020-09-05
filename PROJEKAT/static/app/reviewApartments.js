Vue.component("reviewApartments", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			activeApartmentsForHost : null,
			priceSortBy : '',
			typeOfApartmanFilter : '',
			UnActiveApartmanCheck : false,
			changeApartmentButtonClicked : false,
			apartmentId : '',
			apType : '',
			apStatus : '',
			apRooms : '',
			apNumberOfGuests : '',
			apPriceForNightName : '',
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
			endDateModel : ''
				
			 
			
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
	         <div><li class="active"><a href="#/reviewApartments">AKTIVNI</a></li></div><br/>         
	         <div><li><a href="#/reviewInActiveApartments">NEAKTIVNI</a></li></div><br/>
	         <div><li><a href="#/addNewApartment">DODAJ APARTMAN</a></li></div><br/>
	     </ul>
	 </div>
	 
	 <div v-if="changeApartmentButtonClicked === false">
		 <div class="sortAndFilter">
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
		     <div class="filter-title">
		             <h1>Filtriraj po:</h1>
		             <select id="statusID" name="statusName" v-model="typeOfApartmanFilter">
                     <option value="Tip" selected>Tip</option>
                     <option value="Soba">Soba</option>
                     <option value="Ceo apartman">Ceo apartman</option>
                     </select>
		             <form id="formForFilter" action="#">
		             
		               
		                 <div class="content-filter-btn">
		                     <button type="button">Sadržaju</button>
		                 </div>
		                 <div class="filter-btn-active-apartment">
		                     <button id="searchInUserReservation" type="button" >Filtriraj</button>
		                 </div>
		             </form>           
		         </div>
		      </div>


		 
		
		 
		 <div class="titleForActiveApartments">
		     <h1>Pregled aktivnih apartmana:</h1>
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
		                 Adresa: {{a.location.address.street}} {{a.location.address.houseNumber}}, {{a.location.address.populatedPlace}} {{a.location.address.zipCode}}
		                 </p>
		             </div>
		             <div class="product-price-btn">
		                 <button type="button">obriši</button>
		             </div>
		             <div class="product-price-btn2">
		                     <button type="button" @click="changeApartment(a)">izmeni</button>
		             </div>
		         </div>
	         </div>
	         
	      </div>
	      </div>
	      
	      
	      
		   </div>
		   
		   <!--IZMENA!--> 
		   <div v-else>
		 <div class="titleForHostChangeActiveApartments">
	     <h1 id="titleInAdminChangeApartment">Izmena podataka</h1>
	     <a @click="previousButtonClicked()" class="previous">&laquo; Nazad</a>
	     </div> 
		 <div class="listOfApartments">

	        <div class="wrapper-form">
	            <div class="data-for-apartment">
	                <div class="text-for-adding-apartment">
	                    <h1>Obavezni podaci:</h1>
	                    <form action="#">
	                        <label for="apartmentName">Naziv apartmana (ID):</label>
	                        <input type="text" id="aName" name="apartmentname"  v-model="apartmentId" placeholder="Unesite naziv apartmana...">
	                    
	                        <label for="typeOfApartment">Tip apartmana:</label>
	                        <select id="typeOfApartmentID" name="typeOfApartmentName" v-model="apType">
	                          <option value="Ceo apartman">Ceo apartman</option>
	                          <option value="Soba">Soba</option>
	                        </select>

	                        <label for="status">Status:</label>
	                        <select id="statusID" name="statusName" v-model="apStatus">
	                          <option value="Neaktivan">Neaktivan</option>
	                          <option value="Aktivan">Aktivan</option>
	                        </select>

	                        <label for="numberOfRooms">Broj soba:</label>
	                        <input type="text" id="numberOfRoomsID" name="numberOfRoomsName" v-model="apRooms" placeholder="Unesite broj soba...">

	                        <label for="numberOfGuest">Broj gostiju:</label>
	                        <input type="text" id="numberOfGuestID" name="numberOfGuestName" v-model="apNumberOfGuests"  placeholder="Unesite maksimalan broj gostiju...">

	                        <label for="priceForNight">Cena po noći:</label>
	                        <input type="text" id="priceForNightID" name="priceForNightName" v-model="apPriceForNightName" placeholder="Unesite cenu po noći...">

	                        <label for="location">Lokacija:</label>
	                        <input type="text" id="locationID" name="locationName" v-model="apLocation" placeholder="Unesite GPS koordinate (lokacija)...">
	                        
	                        <label for="address">Adresa:</label>
	                        <input  type="text" id="addressID" name="addressName" v-model="apAddress" placeholder="Unesite adresu apartmana..."  pattern="[A-Z][a-z A-Z]*[ ][1-9][0-9]*, [A-Z][a-z A-Z]* [0-9]{5}" title="Primer validne adrese: Cara Dusana 25, Novi Sad 21000">	

	                        <label for="dateFromPublishing">Datum od kojeg se izdaje:</label><br/>
	                        <vuejs-datepicker v-model="startDateModel" id="startDateID" name="startDate" type="date"  format="dd.MM.yyyy." :disabledDates="state.disabledDates" placeholder="Izaberite datum od kojeg se izdaje..." ></vuejs-datepicker>
							
							<label for="dateToPublishing">Datum do kojeg se izdaje:</label><br/>
	                        <vuejs-datepicker v-model="endDateModel" id="endDateID" name="endDate" type="date"  format="dd.MM.yyyy."  :open-date="startDateModel" :disabledDates="newDateStart" v-bind:disabled="startDateModel === ''" placeholder="Izaberite datum do kojeg se izdaje..." ></vuejs-datepicker>

	                        <label for="check-inTime">Vreme za prijavu:</label><br/>
	                        <input type="time" id="check-inTimeID" name="check-inTimeName" v-model="apStartTime" placeholder="Izaberite inicijalno vreme za prijavu...">

	                        <label for="check-outTime">Vreme za odjavu:</label><br/>
	                        <input type="time" id="check-outTimeID" name="check-outTimeName" v-model="apEndTime" placeholder="Izaberite inicijalno vreme za odjavu...">

	                        <label for="imagesForApartment">Slike:</label><br/>
	                        <input type="image" id="imagesForApartmentID" name="imagesForApartmentName">

	                        <h1>Ostali podaci:</h1>
	                        <span class="spanAmenities" v-for="a in amenitiesList">
	                        <br><label class="container">
		                        <input type="checkbox" :value="a" v-model="checkedList" checked>
		                        <div class="text-checkbox">{{a.content}}</div>
		                        <span class="checkmark"></span>
		                        </label>
		                        <br>
	                        </span>

	                        <label v-if="showNotification" style="color:red; margin-left: 10%; font-size: 20px">Morate popuniti sve obavezne podatke!</label>
	                        <div class="change-btn-in-admin-change-apartment">
	                            <button type="button" @click="changesConfirm()">Izmeni</button>
	                        </div>
	                        <div class="cancel-btn-in-admin-change-apartment">
	                            <button type="button">Odustani</button>
	                        </div>
	                    </form>
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
        	return ap.typeOfApartment.startsWith(this.typeOfApartmanFilter);
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
      
		},
		
		newDateStart() {
	  		
			if(this.startDateModel !== ''){
				return {
		            to: moment(this.startDateModel).startOf('day').add(1, 'days').toDate()
		        }
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
		unActiveApartmen : function()
		{
			this.UnActiveApartmanCheck = true;
			
			
		},
		changeApartment : function(a)
		{
			this.changeApartmentButtonClicked = true;
			
			this.apartmentId = a.id;
			this.apType = a.typeOfApartment;
			this.apStatus = a.statusOfApartment;
			this.apRooms = a.numberOfRooms;
			this.apNumberOfGuests = a.numberOfGuests;
			this.apPriceForNightName = a.pricePerNight;
			this.checkedList = a.amenities;
			this.apLocation = a.location.latitude + "," + a.location.longitude;
			this.apAddress = a.location.address.street + " " + a.location.address.houseNumber + ", " + a.location.address.populatedPlace + " " + a.location.address.zipCode;
			this.apStartTime = a.checkInTime;
			this.apEndTime = a.checkOutTime;
			//this.startDateModel = a.releaseDates;
			
		},
		changesConfirm : function(){
			this.showNotification = true;
		},		
		previousButtonClicked : function(){
			this.showNotification = false;
			this.changeApartmentButtonClicked = false;
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
				axios.get('services/apartments/getActiveApratmentsForHost').then(response => {
					if(response.status === 200){
						this.activeApartmentsForHost = response.data;
					}else{
						toast('Trenutno ne postoje aktivni apartmani')
					}
					
				});	
				
				axios.get('services/amenities/getAllAmenities').then(response => {
					this.amenitiesList = response.data;			
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