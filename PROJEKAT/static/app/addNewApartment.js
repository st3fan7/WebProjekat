Vue.component("addNewApartment", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			showNotification : false,
			nameOfApartment : '',
			numberOfRoomsModel : null,
			numberOfGuestModel : null,
			priceForNightModel : null,
			locationModel : '',
			addressModel : '',
			startDateModel : '',
			endDateModel : '',
			checkinTimeModel : '',
			checkoutTimeModel : '',
			typeOfApartment : null,
			statusOfApartment : 'Neaktivan',
			starTimeInit : '',
			endTimeInit : '',
			amenitiesList : null,
			checkedAmenities : [],
			 state : {
				    disabledDates: {
				     to: new Date(),
				     }
				   }
			 
			
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
            <div><li><a href="#/reviewApartments">AKTIVNI</a></li></div><br/>         
            <div><li><a href="#/reviewInActiveApartments">NEAKTIVNI</a></li></div><br/>
            <div><li class="active"><a href="#/addNewApartment">DODAJ APARTMAN</a></li></div><br/>
        </ul>
    </div>

    <div class="titleForActiveApartments">
        <h1>Dodavanje novog apartmana</h1>
    </div> 
   
   <form id="form" action="" onsubmit="return false;"  method = "POST">
       <div class="confirm-cancel-field">
        <div class="price-title">
            <h1>Popunili ste potrebne podatke?</h1>
            <div class="add-btn">
                <button type="submit" v-on:click="addNewApartment">Dodaj</button>
            </div>
            <div class="cancel-btn">
                <button type="button">Odustani</button>
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
                        <input v-model="nameOfApartment" type="text" id="aName" name="apartmentname" placeholder="Unesite naziv apartmana..." pattern="[A-Z][A-Za-z0-9 ]*" title="Možete uneti slova i brojeve i prvo slovo mora biti veliko!">
                    
                        <label for="typeOfApartment">Tip apartmana:</label>
                        <select id="typeOfApartmentID" name="typeOfApartmentName" v-model="typeOfApartment">
                          <option value="Ceo apartman">Ceo apartman</option>
                          <option value="Soba">Soba</option>
                        </select>

                        <label for="status">Status:</label>
                        <select id="statusID" name="statusName" v-model="statusOfApartment">
                          <option value="Neaktivan">Neaktivan</option>
                          <option value="Aktivan">Aktivan</option>
                        </select>

                        <label for="numberOfRooms">Broj soba:</label>
                        <input v-model="numberOfRoomsModel" type="text" id="numberOfRoomsID" name="numberOfRoomsName" placeholder="Unesite broj soba..." pattern="[1-9][0-9]*" title="Možete uneti samo brojeve počevši od 1!">

                        <label for="numberOfGuest">Broj gostiju:</label>
                        <input v-model="numberOfGuestModel" type="text" id="numberOfGuestID" name="numberOfGuestName" placeholder="Unesite maksimalan broj gostiju..." pattern="[1-9][0-9]*" title="Možete uneti samo brojeve počevši od 1!">

                        <label for="priceForNight">Cena po noći [RSD]:</label>
                        <input v-model="priceForNightModel" type="text" id="priceForNightID" name="priceForNightName" placeholder="Unesite cenu po noći..." pattern="[1-9][0-9]*([.][0-9]+)?" title="Primer validne cene: a) 2500 b) 2199.99">

                        <label for="location">Lokacija:</label>
                        <input v-model="locationModel" type="text" id="locationID" name="locationName" placeholder="Unesite GPS koordinate (lokacija)...">
                        
                        <label for="address">Adresa:</label>
                        <input v-model="addressModel" type="text" id="addressID" name="addressName" placeholder="Unesite adresu apartmana..."  pattern="[A-Z][a-z A-Z]*[ ][1-9][0-9]*, [A-Z][a-z A-Z]* [0-9]{5}" title="Primer validne adrese: Cara Dusana 25, Novi Sad 21000">	
							
						<label for="dateFromPublishing">Datum od kojeg se izdaje:</label><br/>
                        <vuejs-datepicker v-model="startDateModel" id="startDateID" name="startDate" type="date"  format="dd.MM.yyyy." :disabledDates="state.disabledDates" placeholder="Izaberite datum od kojeg se izdaje..." ></vuejs-datepicker>
						
						<label for="dateToPublishing">Datum do kojeg se izdaje:</label><br/>
                        <vuejs-datepicker v-model="endDateModel" id="endDateID" name="endDate" type="date"  format="dd.MM.yyyy."  :open-date="startDateModel" :disabledDates="newDateStart" v-bind:disabled="startDateModel === ''" placeholder="Izaberite datum do kojeg se izdaje..." ></vuejs-datepicker>
                                            
                        <label for="check-inTime">Vreme za prijavu:</label><br/>
                        <input v-model="checkinTimeModel" type="time" :hours-format="24" id="check-inTimeID"  name="check-inTimeName"  placeholder="Izaberite inicijalno vreme za prijavu...">

                        <label for="check-outTime">Vreme za odjavu:</label><br/>
                        <input v-model="checkoutTimeModel" type="time" :hours-format="24" id="check-outTimeID"  name="check-outTimeName" placeholder="Izaberite inicijalno vreme za odjavu...">
			
                        <label for="imagesForApartment">Slike:</label><br/>
                        <input type="image" id="imagesForApartmentID" name="imagesForApartmentName">

                        <h1>Ostali podaci:</h1>
                         
                        <span class="spanAmenities" v-for="a in amenitiesList">
                        <br><label class="container">
	                        <input type="checkbox" :value="a" v-model="checkedAmenities">
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
	
	`
	,
	
	components : {
		vuejsDatepicker
	},
	
	computed : {
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
				this.$router.push({ name: 'addNewApartment' })
			}
			
		},
		addNewApartment : function() {
			
			var empty = false;
			this.showNotification = false;
			var newStartDate = null;
			var newEndDate = null;
			
			if(this.nameOfApartment.length === 0) {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.numberOfRoomsModel === null) {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.numberOfGuestModel === null) {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.priceForNightModel === null) {
				var red = document.getElementById("priceForNightID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("priceForNightID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.locationModel.length === 0) {
				var red = document.getElementById("locationID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("locationID");
				red.style.backgroundColor = "white";
				
				var locationLatAndLog = this.locationModel.split(',');
				var Latitude = locationLatAndLog[0].trim();
				var longitude = locationLatAndLog[1].trim();
			}
			
			if(this.addressModel.length === 0) {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "white"; 
				
				var fullAddress = this.addressModel.split(","); 
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
				
				//console.log(this.startDateModel)
				let localStartDate = moment(this.startDateModel).format("YYYY-MM-DD");
				//console.log(localStartDate)
				newStartDate = new Date(localStartDate);
				//console.log(newStartDate)
			
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
			
			if(this.typeOfApartment === null){
				var red = document.getElementById("typeOfApartmentID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("typeOfApartmentID");
				red.style.backgroundColor = "white"; 
			}
		
			//console.log(newStartDate);
			
			
			if(empty === false) {
				axios.post('services/apartments/addNewApartment', {"id": '' + this.nameOfApartment, "numberOfRooms": this.numberOfRoomsModel,
					"typeOfApartment" : this.typeOfApartment, "statusOfApartment" : this.statusOfApartment, "numberOfGuests" : this.numberOfGuestModel,
					"pricePerNight" : this.priceForNightModel, "location" : { "latitude" : Latitude, "longitude" : longitude, 
					"address" : {"street" : street, "houseNumber" : number, "populatedPlace" : city, "zipCode" : zip } },					
					"releaseDates" : [newStartDate, newEndDate], 
					"checkInTime" : '' + this.checkinTimeModel, "checkOutTime" : '' + this.checkoutTimeModel, "host" : '' + this.activeUser.username,
					"reservations" : [], "comments" : [], "amenities" : this.checkedAmenities, "pictures": []})
					.then(response => {
						if(response.status === 200){
							toast('Apartman je uspšeno dodat!')
						} else if(response.status === 201){
							toast('Apartman sa tim imenom već postoji!')
						}else {
							toast('Apartman nije uspšeno dodat, pokušajte ponovo!')
						}
						
					});
			} else {
				
				this.showNotification = true;
			}
			
			
		}



	},
	mounted() {
		
		this.checkinTimeModel = "14:00";
		this.checkoutTimeModel = "10:00";

		
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
			}else{
				this.activeAdmin = false;
			}		
												
			if (this.activeUser.role === "domacin"){
				this.activeHost = true;
				axios.get('services/amenities/getAllAmenities').then(response => {
					this.amenitiesList = response.data;			
				});
				
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