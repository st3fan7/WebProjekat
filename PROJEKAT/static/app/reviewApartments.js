Vue.component("reviewApartments", {
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
			statusOfApartmentFilter : 'Status',
			newApartment : null	,
			errorForNameOfApartment : false,
		    errorNumberOfRoomsModel : false,
		    errorNumberOfGuest : false,
		    errorPriceForNight : false,
		    errorLocation : false,
		    errorAddress : false,
		    imagesShow : [],
		    sendImages : [],
		    countImage : 0
			 
			
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
	         <div v-if="activeHost"><li class="active"><a href="#/reviewApartments">AKTIVNI</a></li></div><br v-if="activeHost">         
	         <div v-if="activeHost"><li><a href="#/reviewInActiveApartments">NEAKTIVNI</a></li></div><br v-if="activeHost">
	         <div v-if="activeHost"><li><a href="#/addNewApartment">DODAJ APARTMAN</a></li></div><br v-if="activeHost">
	         <div v-if="activeAdmin"><li><a href="#/amenitiesChange">SADRŽAJ</a></li></div><br v-if="activeAdmin">
		     <div v-if="activeAdmin"><li class="active"><a href="#/reviewActiveApartments">PREGLED APARTMANA</a></li></div><br v-if="activeAdmin"> 
	     </ul>
	 </div>
	 
	 <div v-if="changeApartmentButtonClicked === false">
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
                     
                     <select v-if="activeAdmin" id="statusID" name="statusName" v-model="statusOfApartmentFilter">
                     <option value="Status" selected>Status</option>
                     <option value="Neaktivan">Neaktivni</option>
                     <option value="Aktivan">Aktivni</option>
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
		     <h1 v-if="activeHost">Pregled aktivnih apartmana:</h1>
		     <h1 v-if="activeAdmin">Pregled svih apartmana:</h1>
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
		                 Adresa: {{a.location.address.street}} {{a.location.address.houseNumber}}, {{a.location.address.populatedPlace}} {{a.location.address.zipCode}}
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
	                    	<label v-if="errorForNameOfApartment" style="color:red; font-size: 16px">Možete uneti slova i brojeve i prvo slovo mora biti veliko!</label><br>
	                    
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
							<label v-if="errorNumberOfRoomsModel" style="color:red; font-size: 16px">Možete uneti samo brojeve počevši od 1!</label><br>

	                        <label for="numberOfGuest">Broj gostiju:</label>
	                        <input type="text" id="numberOfGuestID" name="numberOfGuestName" v-model="apNumberOfGuests"  placeholder="Unesite maksimalan broj gostiju...">
							<label v-if="errorNumberOfGuest" style="color:red; font-size: 16px">Možete uneti samo brojeve počevši od 1!</label><br>
							
	                        <label for="priceForNight">Cena po noći:</label>
	                        <input type="text" id="priceForNightID" name="priceForNightName" v-model="apPriceForNightName" placeholder="Unesite cenu po noći...">
							<label v-if="errorPriceForNight" style="color:red; font-size: 16px">Primer validne cene: a) 2500 b) 2199.99</label><br>

	                        <label for="location">Lokacija:</label>
	                        <input type="text" id="locationID" name="locationName" v-model="apLocation" placeholder="Unesite GPS koordinate (lokacija)..." pattern="[0-9]+(.[0-9]+)?,( )?[0-9]+(.[0-9]+)?" title="Primeri validnih lokacija: a) 2,52 b) 2.32,43.3">
	                        <label v-if="errorLocation" style="color:red; font-size: 16px">Primeri validnih adresa: a) 2,52 b) 2.32,43.3</label><br>
	                        
	                        <label for="address">Adresa:</label>
	                        <input  type="text" id="addressID" name="addressName" v-model="apAddress" placeholder="Unesite adresu apartmana..."  pattern="[A-Za-z ]+[0-9][0-9]*, [A-Za-z ]+[0-9][0-9]*, [A-Za-z ]+" title="Primer validne adrese: Cara Dusana 1, Novi Sad 21000, Srbija">	
							<label v-if="errorAddress" style="color:red; font-size: 16px">Primer validne adrese: Cara Dusana 1, Novi Sad 21000, Srbija</label><br>

	                        <label for="dateFromPublishing">Novi datum od kojeg se izdaje:</label><br/>
	                        <vuejs-datepicker v-model="startDateModel" id="startDateID" name="startDate" type="date"  format="dd.MM.yyyy." :disabledDates="disabledDates" placeholder="Izaberite datum od kojeg se izdaje..." ></vuejs-datepicker>
							
							<label for="dateToPublishing">Novi datum do kojeg se izdaje:</label><br/>
	                        <vuejs-datepicker v-model="endDateModel" id="endDateID" name="endDate" type="date"  format="dd.MM.yyyy."  :open-date="startDateModel" :disabledDates="disabledDatesTo" v-bind:disabled="startDateModel === ''" placeholder="Izaberite datum do kojeg se izdaje..." ></vuejs-datepicker>

	                        <label for="check-inTime">Vreme za prijavu:</label><br/>
	                        <input type="time" id="check-inTimeID" name="check-inTimeName" v-model="apStartTime" placeholder="Izaberite inicijalno vreme za prijavu...">

	                        <label for="check-outTime">Vreme za odjavu:</label><br/>
	                        <input type="time" id="check-outTimeID" name="check-outTimeName" v-model="apEndTime" placeholder="Izaberite inicijalno vreme za odjavu...">

	                        <label for="imagesForApartment">Slike:</label><br/>
	                        <input v-if="this.countImage <= 4" type="file"  id="imagesForApartmentID" @change="addImage" name="imagesForApartmentName">
	                        <input v-else type="file" disabled id="imagesForApartmentID" @change="addImage" name="imagesForApartmentName">

	                        <h1>Slike u apartmanu:</h1>
	                        
	                   	 
	                     <div >
	    			     <div >	    			             
	    			             <div class="room-gallery" style="margin-left:-150px;">
	    			 	    	
		    			 			    <div class="room-preview">
		    			 			    	
				    			 			   <div v-for="(p,index) in this.imagesShow" >
				    				    	   <img :src="p"  class="room-active"  alt=""></img>
				    				    	   <br><button @click="deleteImage(index)">Obrisi sliku iznad</button>
				    				    	   </div>
		    			 			    </div>              
		    			 	    </div>	    			             	    			             
	    			     </div>	    			         	    			        
	    			 </div>
	    		
	                        
	                        
	                        
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
	computed : {
		filteredApartments() {
	  		  
	  		if(this.activeHost){
	  			  		
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
			
	  }else if(this.activeAdmin){
	  			  
			  if (this.typeOfApartmanFilter === "Soba" && this.statusOfApartmentFilter === "Neaktivan") {
		      	return this.activeApartmentsForHost.filter((ap) => {
		        	return ((ap.typeOfApartment.startsWith("Soba")) && (ap.statusOfApartment.startsWith("Neaktivan")));
		        });
		      }else if(this.typeOfApartmanFilter === "Soba" && this.statusOfApartmentFilter === "Aktivan"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
			        	return ((ap.typeOfApartment.startsWith("Soba")) && (ap.statusOfApartment.startsWith("Aktivan")));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Soba" && this.statusOfApartmentFilter === "Status"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
			        	return ((ap.typeOfApartment.startsWith("Soba")));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Ceo apartman" && this.statusOfApartmentFilter === "Neaktivan"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
			        	return ((ap.typeOfApartment.startsWith("Ceo apartman")) && (ap.statusOfApartment.startsWith("Neaktivan")));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Ceo apartman" && this.statusOfApartmentFilter === "Aktivan"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
			        	return ((ap.typeOfApartment.startsWith("Ceo apartman")) && (ap.statusOfApartment.startsWith("Aktivan")));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Ceo apartman" && this.statusOfApartmentFilter === "Status"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
			        	return ((ap.typeOfApartment.startsWith("Ceo apartman")));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Tip" && this.statusOfApartmentFilter === "Status"){	    	
		    	  return this.activeApartmentsForHost;  
		      }else if(this.typeOfApartmanFilter === "Tip" && this.statusOfApartmentFilter === "Neaktivan"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
		    		  return (ap.statusOfApartment.startsWith("Neaktivan"));
			       });   	  
		      }else if(this.typeOfApartmanFilter === "Tip" && this.statusOfApartmentFilter === "Aktivan"){	    	
		    	  return this.activeApartmentsForHost.filter((ap) => {
		    		  return (ap.statusOfApartment.startsWith("Aktivan"));
			       });   	  
		      }else{
		    	  return this.activeApartmentsForHost;
		      } 
	  
	  }

      
		},
			
		
		
		newDateStart() {
	  		
			if(this.startDateModel !== ''){
				return {
		            to: moment(this.startDateModel).startOf('day').add(1, 'days').toDate()
		        }
			}
			
				
			
		},
		
		disabledDates() {

			var startDateFromList = null;
			var endDateFromList = null;
			var listDates = [];
			
			for(period of this.newApartment.releaseDates){
				
				
					startDateFromList = moment(period.startDate);
					startDateFromList = new Date(startDateFromList);
					
					endDateFromList =  moment(period.endDate);
					endDateFromList = new Date(endDateFromList);
					
					listDates.push({from: startDateFromList, to: endDateFromList});
				
		
			}
			  
			var state = {
					  disabledDates: {
					    to: new Date(), 
					    ranges: listDates
					  }
					}
			
			return state.disabledDates;
		
	},
	
	disabledDatesTo() {
		var startDateFromList = null;
		var endDateFromList = null;
		var listDates = [];
	
		for(period of this.newApartment.releaseDates){
			
			
				startDateFromList = moment(period.startDate);
				startDateFromList = new Date(startDateFromList);
				
				endDateFromList =  moment(period.endDate);
				endDateFromList = new Date(endDateFromList);
				
				listDates.push({from: startDateFromList, to: endDateFromList});
			
	
		}
		
		var currentDate =  this.startDateModel;
		
		/*
		 * prodjemo kroz sve datume
		 * uzmemo sve vece od trenutnog(start)
		 * prodjemo kroz novu listu
		 * uzmemo najmanji pocetni
		 * od tog datuma zabranimo
		 * 
		 */
		
		var listOfNewDates = [];
		
		for(disabledDate of listDates){
			console.log(disabledDate)
			if(currentDate < disabledDate.from) {
				listOfNewDates.push(disabledDate.from);
			}
		}
		
		var minDate = null;
		minDate = listOfNewDates[0];
		  
		var state = {
				  disabledDates: {
				    to: moment(this.startDateModel).startOf('day').toDate(),
				    from: minDate,
				    ranges: listDates
				  }
				}
		
		return state.disabledDates;
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
			this.startDateModel = '';
			this.endDateModel = '';
			this.newApartment = a;
			this.changeApartmentButtonClicked = true;
			
			
			this.countImage = this.newApartment.pictures.length;
			this.sendImages = this.newApartment.pictures;
			
			for(img of this.sendImages){
				this.imagesShow.push(img);
			}
			
			
			
			
			this.oldId = a.id;
			
			this.apartmentId = a.id;
			this.apType = a.typeOfApartment;
			this.apStatus = a.statusOfApartment;
			this.apRooms = a.numberOfRooms;
			this.apNumberOfGuests = a.numberOfGuests;
			this.apPriceForNightName = a.pricePerNight;
			this.checkedList = a.amenities;
			this.apLocation = a.location.latitude + "," + a.location.longitude;
			this.apAddress = a.location.address.street + " " + a.location.address.houseNumber + ", " + a.location.address.populatedPlace + " " + a.location.address.zipCode + ", " + a.location.address.country;
			this.apStartTime = a.checkInTime;
			this.apEndTime = a.checkOutTime;
			
//			this.startDateModel = a.releaseDates[0];
//			this.endDateModel = a.releaseDates[1];
			
			
			this.comments = a.comments;
			this.reservations = a.reservations;
			this.freeDates = a.freeDates;
			this.pictures = a.pictures;
			
		},
		changesConfirm : function(){
			
			
			
			var empty = false;
			this.showNotification = false;
			this.errorForNameOfApartment = false;
			this.errorNumberOfRoomsModel = false;
			this.errorNumberOfGuest = false;
			this.errorPriceForNight = false;
		    this.errorLocation = false,
		    this.errorAddress = false
			
			
			var newStartDate = null;
			var newEndDate = null;
			
			
			if(this.apartmentId.length === 0) {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				if(!document.getElementById("aName").value.match(/^[A-Z][A-Za-z0-9 ]*$/)){
					this.errorForNameOfApartment = true;
					empty = true;
				}
				var red = document.getElementById("aName");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apRooms === null || this.apRooms === '') {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				if(!document.getElementById("numberOfRoomsID").value.match(/^[1-9][0-9]*$/)){
					this.errorNumberOfRoomsModel = true;
					empty = true;
				}
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apNumberOfGuests === null || this.apNumberOfGuests === '') {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				if(!document.getElementById("numberOfGuestID").value.match(/^[1-9][0-9]*$/)){
					console.log('usao sam tu')
					this.errorNumberOfGuest = true;
					empty = true;
				}
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.apPriceForNightName === null || this.apPriceForNightName === '') {
				var red = document.getElementById("priceForNightID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				if(!document.getElementById("priceForNightID").value.match(/^[1-9][0-9]*([.][0-9]+)?$/)){
					this.errorPriceForNight = true;
					empty = true;
				}
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
				
				if(!document.getElementById("locationID").value.match(/^[0-9]+(.[0-9]+)?,( )?[0-9]+(.[0-9]+)?$/)){
					this.errorLocation = true;
					empty = true;
				} else {
					var locationLatAndLog = this.apLocation.split(',');
					var Latitude = locationLatAndLog[0].trim();
					var longitude = locationLatAndLog[1].trim();
				}	

				
				

			}
			
			if(this.apAddress.length === 0) {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				if(!document.getElementById("addressID").value.match(/^[A-Za-z ]+[0-9][0-9]*, [A-Za-z ]+[0-9][0-9]*, [A-Za-z ]+$/)){
					this.errorAddress = true;
					empty = true;
				} else {
					var fullAddress = this.apAddress.split(","); 
					var streetAndNum = fullAddress[0].split(/(\d+)/);
					var street = streetAndNum[0].trim();
					var number = streetAndNum[1].trim();
					
					var cityAndZip = fullAddress[1].split(/(\d+)/);
					var city = cityAndZip[0].trim();
					var zip = cityAndZip[1].trim();
					
					var country = fullAddress[2].trim();
				}
				
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "white"; 
				

			}
			
			
//			if(this.startDateModel === null || this.startDateModel.length === 0) {
//				var red = document.getElementById("startDateID");
//				red.style.backgroundColor = "LightCoral"; 
//				empty = true;
//			} else {
//				var red = document.getElementById("startDateID");
//				red.style.backgroundColor = "white"; 
//				
//				let localStartDate = moment(this.startDateModel).format("YYYY-MM-DD");
//				newStartDate = new Date(localStartDate);			
//			}
//			
//			if(this.endDateModel === null || this.endDateModel.length === 0) {
//				var red = document.getElementById("endDateID");
//				red.style.backgroundColor = "LightCoral"; 
//				empty = true;
//			} else {
//				var red = document.getElementById("endDateID");
//				red.style.backgroundColor = "white"; 
//				
//				let localEndDate = moment(this.endDateModel).format("YYYY-MM-DD");
//				newEndDate = new Date(localEndDate);
//			}
			
			
			// uneo prvi a nije drugi, uneo oba
			if(this.startDateModel !== null || this.startDateModel.length !== 0) {
				if(this.endDateModel !== null || this.endDateModel.length !== 0){
					let localStartDate = moment(this.startDateModel).format("YYYY-MM-DD");
					newStartDate = new Date(localStartDate);
					
					let localEndDate = moment(this.endDateModel).format("YYYY-MM-DD");
					newEndDate = new Date(localEndDate);
				} else {
					var red = document.getElementById("endDateID");
					red.style.backgroundColor = "LightCoral"; 
					empty = true;
				}
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
					"address" : {"street" : street, "houseNumber" : number, "populatedPlace" : city, "zipCode" : zip, "country" : country } },					
					"releaseDates" : [newStartDate, newEndDate], 
					"checkInTime" : '' + this.apStartTime, "checkOutTime" : '' + this.apEndTime, "host" : '' + this.activeUser.username,
					"reservations" : this.reservations, "comments" : this.comments, "amenities" : this.checkedList, "pictures": this.sendImages, "freeDates" : this.freeDates},
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
				if(confirm('Da li ste sigurni da želite da se vratite na pregled aktivnih apartmana?') === true){ 
					this.showNotification = false;
					this.changeApartmentButtonClicked = false;
					axios.get('services/apartments/getActiveApratmentsForHost').then(response => {
						if(response.status === 200){
							this.activeApartmentsForHost = response.data;
						}else{
						
							toast('Trenutno ne postoje aktivni apartmani')
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
		
		resetAppButtonClicked : function(){
			
			
			if(confirm('Da li ste sigurni da želite da resetujete listu apartmana?')){
				if(this.activeHost === true){
					axios.get('services/apartments/getActiveApratmentsForHost').then(response => {
						if(response.status === 200){
							this.activeApartmentsForHost = response.data;
						}else{
						
							toast('Trenutno ne postoje aktivni apartmani')
						}
						
					});
				}else if(this.activeAdmin === true){
					
						axios.get('services/apartments/getAllApartments').then(response => {
							if(response.status === 200){
								this.activeApartmentsForHost = response.data;
							}else{
							
								toast('Trenutno ne postoje aktivni apartmani')
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
					}else{					
						toast('Trenutno ne postoje aktivni apartmani za brisanje')
					}
					
				});
				
				if(this.activeHost) {
					
					axios.get('services/apartments/getActiveApratmentsForHost').then(response => {
						if(response.status === 200){
							this.activeApartmentsForHost = response.data;
						}else{
							this.activeApartmentsForHost = response.data;
							toast('Trenutno ne postoje aktivni apartmani')
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
		
		deleteImage : function(index){
			
			this.imageCount--;
			//this.newApartment.pictures.splice(index,1);
			this.sendImages.splice(index, 1);
			this.imagesShow.splice(index,1);
			
		},
		addImage : function(e){
			
			
			const file = e.target.files[0];
			this.createBase64Image(file);
			this.countImage++;
		
			if(this.countImge === 5){
				this.disabled5 = true;
			}
			this.imagesShow.push(URL.createObjectURL(file)); //blob oblik za prikaz slike na frontu

			
		},
		
		createBase64Image : function(file){
			
			const reader = new FileReader();
			reader.onload = (e) => {
				
				let image = e.target.result;
				this.sendImages.push(image);				
				
			}
			
			reader.readAsDataURL(file);
			
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
						this.activeApartmentsNOTCHANGEDlist = response.data;
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
				axios.get('services/apartments/getActiveApratmentsForHost').then(response => {
					if(response.status === 200){
						this.activeApartmentsForHost = response.data;
						this.activeApartmentsNOTCHANGEDlist = response.data;
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