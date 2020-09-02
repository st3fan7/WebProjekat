Vue.component("addNewApartment", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			showNotification : false,
			nameOfApartment : '',
			numberOfRoomsModel : '',
			numberOfGuestModel : '',
			priceForNightModel : '',
			locationModel : '',
			addressModel : '',
			startDateModel : '',
			endDateModel : '',
			checkinTimeModel : '',
			checkoutTimeModel : ''
			
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
	            <li id="onlyHomePage"><a href="#">Početna</a></li>
	            <li v-if="activeHost" class="active"><a href="#/addNewApartment">Moji apartmani</a></li>
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
            <div><li><a href="#">AKTIVNI</a></li></div><br/>         
            <div><li><a href="#">NEAKTIVNI</a></li></div><br/>
            <div><li class="active"><a href="#">DODAJ APARTMAN</a></li></div><br/>
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
                        <select id="typeOfApartmentID" name="typeOfApartmentName">
                          <option value="allApartment">Ceo apartman</option>
                          <option value="room">Soba</option>
                        </select>

                        <label for="status">Status:</label>
                        <select id="statusID" name="statusName">
                          <option value="active">Neaktivan</option>
                          <option value="inactive">Aktivan</option>
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
                        <vuejs-datepicker v-model="startDateModel" id="startDateID" name="startDate" type="date"  format="dd.MM.yyyy." placeholder="Izaberite datum od kojeg se izdaje..." ></vuejs-datepicker>
						
						<label for="dateToPublishing">Datum do kojeg se izdaje:</label><br/>
                        <vuejs-datepicker v-model="endDateModel" id="endDateID" name="endDate" type="date"  format="dd.MM.yyyy." placeholder="Izaberite datum do kojeg se izdaje..." ></vuejs-datepicker>
                                            
                        <label for="check-inTime">Vreme za prijavu:</label><br/>
                        <input v-model="checkinTimeModel" type="time" id="check-inTimeID" name="check-inTimeName" placeholder="Izaberite inicijalno vreme za prijavu...">

                        <label for="check-outTime">Vreme za odjavu:</label><br/>
                        <input v-model="checkoutTimeModel" type="time" id="check-outTimeID" name="check-outTimeName" placeholder="Izaberite inicijalno vreme za odjavu...">
			
                        <label for="imagesForApartment">Slike:</label><br/>
                        <input type="image" id="imagesForApartmentID" name="imagesForApartmentName">

                        <h1>Ostali podaci:</h1>

                        <label class="container">
                                <div class="text-checkbox">Internet</div>
                                <input type="checkbox">
                                <span class="checkmark"></span>
                         </label>
                        <label class="container"> 
                            <div class="text-checkbox">TV</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Klima uređaj</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Pegla</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                                <div class="text-checkbox">Veš mašina</div>
                                <input type="checkbox">
                                <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Mašina za sudove</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Grejanje</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Tuš kabina</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Kada</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Peškiri</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Terasa</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Krevetac</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">
                            <div class="text-checkbox">Pomoćni krevet</div>
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
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
			
			
			if(this.nameOfApartment.length === 0) {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("aName");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.numberOfRoomsModel.length === 0) {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfRoomsID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.numberOfGuestModel.length === 0) {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("numberOfGuestID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.priceForNightModel.length === 0) {
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
			}
			
			if(this.addressModel.length === 0) {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("addressID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.startDateModel === null || this.startDateModel.length === 0) {
				var red = document.getElementById("startDateID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("startDateID");
				red.style.backgroundColor = "white"; 
			}
			
			if(this.endDateModel === null || this.endDateModel.length === 0) {
				var red = document.getElementById("endDateID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
			} else {
				var red = document.getElementById("endDateID");
				red.style.backgroundColor = "white"; 
			}
			
			if(empty === false) {
				axios.post('services/apartments/addNewApartment', {"nameOfApartment": '' + this.nameOfApartment, "numberOfRoomsModel": '' + this.numberOfRoomsModel,
					"numberOfGuestModel": '' + this.numberOfGuestModel , "priceForNightModel": '' + this.priceForNightModel, "locationModel": '' + this.locationModel ,
					"addressModel": '' + this.addressModel, "startDateModel" : '' + this.startDateModel, "endDateModel" : '' + this.endDateModel, 
					"checkinTimeModel" : '' + this.checkinTimeModel, "checkoutTimeModel" : '' + this.checkoutTimeModel})
					.then(response => {
						if(response.status === 200){
							toast('Apartman je uspšeno dodat!')
						} else {
							toast('Apartman nije uspšeno dodat, pokušajte ponovo!')
						}
						
					});
			} else {
				
				this.showNotification = true;
			}
		}



	},
	mounted() {
	
		document.getElementById("check-inTimeID").defaultValue = "14:00";
		document.getElementById("check-outTimeID").defaultValue = "10:00";
		
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