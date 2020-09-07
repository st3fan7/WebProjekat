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
			pictures : []
			 
			
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
	            <li v-if="activeAdmin" class="active"><a href="#/amenitiesChange">Apartmani</a></li>
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
	         <div v-if="activeHost"><li ><a href="#/reviewApartments">AKTIVNI</a></li></div><br v-if="activeHost">         
	         <div v-if="activeHost"><li class="active"><a href="#/reviewInActiveApartments">NEAKTIVNI</a></li></div><br v-if="activeHost">
	         <div v-if="activeHost"><li><a href="#/addNewApartment">DODAJ APARTMAN</a></li></div><br v-if="activeHost">	         
	         <div v-if="activeAdmin"><li><a href="#/amenitiesChange">SADRŽAJ</a></li></div><br v-if="activeAdmin">
		     <div v-if="activeAdmin"><li class="active"><a href="#/reviewInActiveApartments">PREGLED APARTMANA</a></li></div><br v-if="activeAdmin">  
	     </ul>
	 </div>
	 
	 <div v-if="changeApartmentButtonClicked === false">
	
	 
		 <div class="titleForActiveApartments">
		     <h1 v-if="activeHost">Pregled neaktivnih apartmana:</h1>
		      <h1 v-if="activeAdmin">Pregled svih apartmana:</h1>
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
		                 Adresa: {{a.location.address.street}} {{a.location.address.houseNumber}}, {{a.location.address.populatedPlace}} {{a.location.address.zipCode}} </br>
		                  </p>
		    			 <p v-if="activeAdmin">Status: {{a.statusOfApartment}}<br/>
		    			 Domaćin: {{a.host}}
		                 </p>
		             </div>
		             <div class="product-price-btn">
		                 <button type="button" @click="deleteApartment(a)">obriši</button>
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
	     
	     <form id="form" action="" onsubmit="return false;"  method = "POST">
	      <div class="confirm-cancel-field">
	        <div class="price-title">
	            <h1>Želite da izmenite podatke o apartmanu?</h1>
	            <div class="add-btn">
	                <button type="button" @click="changesConfirm()">Izmeni</button>
	            </div>
	            <div class="cancel-btn">
	                <button type="button" @click="previousButtonClicked()">Odustani</button>
	            </div>
	            <label v-if="showNotification" style="color:red; margin-left: 10%; font-size: 20px">Morate popuniti sve obavezne podatke!</label>
	        </div>
	    </div>
	      
		 <div class="listOfApartments">

	        <div class="wrapper-form">
	            <div class="data-for-apartment">
	                <div class="text-for-adding-apartment">
	                    <h1>Obavezni podaci:</h1>
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

	                </div>
	            </div>
	        </div>
	    </div>
	    </form>
		 </div>
		     
		  
	</div>
	
	`
	,
	components : {
		vuejsDatepicker
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
					this.$router.push({ name: 'reviewInActiveApartments' })
				}
				
		},
		unActiveApartmen : function()
		{
			this.UnActiveApartmanCheck = true;
			
			
		},
		changeApartment : function(a)
		{
			this.changeApartmentButtonClicked = true;
			
			this.oldId = a.id;
			
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
			this.startDateModel = a.releaseDates[0];
			this.endDateModel = a.releaseDates[1];
			this.comments = a.comments;
			this.reservations = a.reservations;
			this.freeDates = a.freeDates;
			this.pictures = a.pictures;
			
		},
		changesConfirm : function(){
			
			
			
			var empty = false;
			this.showNotification = false;
			
			var newStartDate = null;
			var newEndDate = null;
			
			
			if(this.apartmentId.length === 0) {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apRooms === null || this.apRooms === '') {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apNumberOfGuests === null || this.apNumberOfGuests === '') {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apPriceForNightName === null || this.apPriceForNightName === '') {
				var red = document.getElementById("priceForNightID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("priceForNightID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apLocation.length === 0) {
				var red = document.getElementById("locationID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("locationID");
				red.style.backgroundColor = "white";
				
				var locationLatAndLog = this.apLocation.split(',');
				var Latitude = locationLatAndLog[0].trim();
				var longitude = locationLatAndLog[1].trim();
			}
			
			if(this.apAddress.length === 0) {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "white"; 
				
				var fullAddress = this.apAddress.split(","); 
				var streetAndNum = fullAddress[0].split(/(\d+)/);
				var street = streetAndNum[0].trim();
				var number = streetAndNum[1].trim();
				
				var cityAndZip = fullAddress[1].split(/(\d+)/);
				var city = cityAndZip[0].trim();
				var zip = cityAndZip[1].trim();
			}
			
			if(this.startDateModel === null || this.startDateModel.length === 0) {
				var red = document.getElementById("startDateID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("startDateID");
				red.style.backgroundColor = "white"; 
				
				let localStartDate = moment(this.startDateModel).format("YYYY-MM-DD");
				newStartDate = new Date(localStartDate);

			}
			
			if(this.endDateModel === null || this.endDateModel.length === 0) {
				var red = document.getElementById("endDateID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("endDateID");
				red.style.backgroundColor = "white"; 
				
				let localEndDate = moment(this.endDateModel).format("YYYY-MM-DD");
				newEndDate = new Date(localEndDate);
			}
			
			
			
			if(this.apType === null){
				var red = document.getElementById("typeOfApartmentID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("typeOfApartmentID");
				red.style.backgroundColor = "white"; 
			}
		
			if(empty === false) {
				
				axios.post('services/apartments/changeApartment', {"id": '' + this.apartmentId, "numberOfRooms": this.apRooms,
					"typeOfApartment" : this.apType, "statusOfApartment" : this.apStatus, "numberOfGuests" : this.apNumberOfGuests,
					"pricePerNight" : this.apPriceForNightName, "location" : { "latitude" : Latitude, "longitude" : longitude, 
					"address" : {"street" : street, "houseNumber" : number, "populatedPlace" : city, "zipCode" : zip } },					
					"releaseDates" : [newStartDate, newEndDate], 
					"checkInTime" : '' + this.apStartTime, "checkOutTime" : '' + this.apEndTime, "host" : '' + this.activeUser.username,
					"reservations" : this.reservations, "comments" : this.comments, "amenities" : this.checkedList, "pictures": this.pictures, "freeDates" : this.freeDates},
				{params:{oldId:'' + this.oldId}})
					.then(response => {
						if(response.status === 200){
							toast('Apartman je izmenjen!')
						}else if(response.status === 202){
							toast('Apartman sa tim imenom već postoji!')
						}else {
							toast('Apartman nije uspšeno izmenjen, pokušajte ponovo!')
						}
						
					});
				
			} else {
				
				this.showNotification = true;
			}
			
		
			
		},		
		previousButtonClicked : function(){
			

				if(this.activeHost) {
					if(confirm('Da li ste sigurni da želite da se vratite na pregled neaktivnih apartmana?') === true){ 
						this.showNotification = false;
						this.changeApartmentButtonClicked = false;
						
						axios.get('services/apartments/getInActiveApratmentsForHost').then(response => {
							if(response.status === 200){
								this.activeApartmentsForHost = response.data;
							}else{
								this.activeApartmentsForHost = response.data;
								toast('Trenutno ne postoje neaktivni apartmani')
							}
							
						});
					}
					
				} else if(this.activeAdmin) {
					if(confirm('Da li ste sigurni da želite da se vratite na pregled apartmana?') === true){ 
						this.showNotification = false;
						this.changeApartmentButtonClicked = false;
						
						axios.get('services/apartments/getAllApartments').then(response => {
							if(response.status === 200){
								this.activeApartmentsForHost = response.data;
							}else{
								toast('Trenutno ne postoje apartmani')
							}
							
						});	
					}
					
				}
				
				
			
		},
		
		deleteApartment : function(a){
			
			if(confirm('Da li ste sigurni da želite da se obrišete ovaj apartman?') === true){
				axios.post('services/apartments/deleteApartment', a.id).then(response => {
					if(response.status === 200){
						toast('Apartman je obrisan')
					}
					
				});
				
				if(this.activeHost) {
					
					axios.get('services/apartments/getInActiveApratmentsForHost').then(response => {
						if(response.status === 200){
							this.activeApartmentsForHost = response.data;
						}else{
							this.activeApartmentsForHost = response.data;
							toast('Trenutno ne postoje neaktivni apartmani')
						}
						
					});
				} else if(this.activeAdmin) {
					axios.get('services/apartments/getAllApartments').then(response => {
						if(response.status === 200){
							this.activeApartmentsForHost = response.data;
						}else{
							this.activeApartmentsForHost = response.data;
							toast('Trenutno ne postoje apartmani')
						}
						
					});	
				}
				
				
			}
			
		}
		
	},
	mounted() {
		
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
				axios.get('services/apartments/getAllApartments').then(response => {
					if(response.status === 200){
						this.activeApartmentsForHost = response.data;
					}else{
						toast('Trenutno ne postoje apartmani')
					}
					
				});	
				
				axios.get('services/amenities/getAllAmenities').then(response => {
					this.amenitiesList = response.data;			
				});
				
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