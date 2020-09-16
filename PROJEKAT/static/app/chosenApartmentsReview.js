Vue.component("chosenApartmentsReview", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			apartment : null,
			showCommentsPart : false,
			markForApartment : 'withoutMark',
			commentField : '',
			showNotificationForComment : false,
			showNotificationForMark : false,
			maxIdNumber : '',
			visibility : 'Sakriven',
			commentsList : [],
			startDateOfRent : null,
			endDateOfRent : null,
			showNotificationForErrorReservation : false,
			startDateModel : '',
			numberOfNightsModel : '',
			messageModel : '',
			showNotificationForErrorReservationImput : false,
			maxIdNumberForReservation : '',
			reservationsForApartmentList : [],
			searchedApartments : [],
			checkIfImageExists : false,
			imageCount : 0,
			listOfPics : []
			
		}
	},
	
	template: `
		<div>
		
		<div class="boundaryForScrollInChosenApartmentsReview">
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


    <div v-if="activeGuest" class="reservationForGuest">
        <div class="filter-title">
            <h1>Rezervacija:</h1>
            <form id="formForSearch" action="#">
                <label for="username" id="labelForStartDate">Izaberite početni datum:</label>
                <vuejs-datepicker v-model="startDateModel" id="startDateID" name="startDate" type="date"  format="dd.MM.yyyy."  :disabledDates="disabledDates"   placeholder="Izaberite početni datum..." ></vuejs-datepicker>
            
                <label for="numberOfNight" id="labelNumberOfNight">Broj noćenja:</label>
                <input type="text" v-model="numberOfNightsModel" id="numberOfNightID" name="numberOfNightName" placeholder="Unesite broj noćenja...">
            

                <label for="message" id="labelMessage">Poruka za domaćina:</label>
                <input type="text" v-model="messageModel" id="messageID" name="messageName" placeholder="Unesite poruku za domaćina...">
            
                <label v-if="showNotificationForErrorReservation" style="color:#c63939; margin-left:0%; text-align:center;">Rezervaciju nije moguće <br> izvršiti za navedene datume!</label>
                <label v-if="showNotificationForErrorReservationImput" style="color:#c63939; margin-left:0%; text-align:center;">Popunite sva potrebna polja za rezervaciju!</label>
                
                <div class="search-btn-user-overview">
                    <button type="button" @click="apartmanReservationClick()">Rezerviši</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="!activeUser" class="reservationForGuest" style="border-radius: 30px 30px 30px 30px;">
        <div class="filter-title">
        	<br><br><br>
            <h1>Da biste izvršili rezervaciju <br> 
            nepohodno je da se <br>
            prijavite!</h1>
             <div class="search-btn-user-overview" style="margin-left:14%;margin-top: 15%;">
                    <button type="button" @click="singIn()">Prijavi se</button>
             </div>
        </div>
    </div>
    
    <div v-if="activeHost || activeAdmin" class="reservationForGuest" style="border-radius: 30px 30px 30px 30px;">
        <div class="filter-title">
        	<br><br><br>
            <h1>Rezerviciju je moguće <br> 
            izvršiti jedino ako <br>
            ste prijavljeni <br>
            kao gost!<br></h1>
            <div class="search-btn-user-overview" style="margin-left:13.5%;margin-top: 15%;">
				<button type="button" @click="singIn()">Prijavi se</button>
             </div>
        </div>
    </div>

    <div v-if="activeGuest" class="commentForHost">
        <div class="filter-title">
            <h1>Komentar za apartman:</h1>
            <div v-if="this.showCommentsPart">
            <form id="formForSearch">

                <input type="text" v-model="commentField" id="messageID" name="messageName" placeholder="Unesite komentar...">
            	<label v-if="showNotificationForComment" style="color:#c63939; margin-left:12%;">Morate napisati neki komentar!</label>
            	
                <label id="labelForRole" for="role">Ocena:</label>
                <select id="roleID" name="roleName" v-model="markForApartment" style="width:76.7%;margin-left:12%;">
                    <option value="withoutMark">Bez ocene</option>
                    <option value="1">1 (jedan)</option>
                    <option value="2">2 (dva)</option>
                    <option value="3">3 (tri)</option>
                    <option value="4">4 (četiri)</option>
                    <option value="5">5 (pet)</option>
                </select>
                <label v-if="showNotificationForMark" style="color:#c63939; margin-left:21%;">Morate izabrati ocenu!</label>
            	

                <div class="search-btn-user-overview" style="margin-top: 11%">
                    <button type="button" @click="sendComment()">Pošalji</button>
                </div>
            </form>
            </div>
            <div v-if="!this.showCommentsPart">
            	<br><br><br>
            	<h3 style="color:#c63939; text-align:center;">Nemate pravo da ostavite komentar, 
            	jer do sad niste imali rezervaciju koja je odbijena <br>
            	 ili završena za ovaj apartman!</h3>
            </div>
        </div>
    </div>


    <div class="titleForUserOverviewForSelectedA">
        <h1 id="nameOfApartmentInApartmentReview">{{this.apartment.id}}</h1>
        <a class="previousInReservation" @click="previousButtonClicked()">&laquo; Nazad</a>
    </div> 

    
    <div v-if="this.checkIfImageExists === true" >
	    <div class="room-gallery">
	    <img class="gallery-hightlight" :src="this.listOfPics[0]" alt="room1" ></img>
		    <div class="room-preview">
		    	
		       <div v-for="p in this.listOfPics" >
		    	   <img :src="p"  class="room-active" alt=""></img>
		      </div>
		    </div>              
	    </div>
	  </div>  
	 <div v-else>
     </div>
    
    

    <div class="basicDataWrapper">
        <div class="filter-title">
            <div class="text-for-adding-apartment">
                <h1>Osnovni podaci o apartmanu</h1>

                <label class="labelFontSize">Naziv apartmana (ID):</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.id}}</label><br/><br/><br/>

                <label class="labelFontSize">Tip apartmana:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.typeOfApartment}}</label><br/><br/><br/>

                <label class="labelFontSize">Status:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.statusOfApartment}}</label><br/><br/><br/>

                <label class="labelFontSize">Broj soba:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.numberOfRooms}}</label><br/><br/><br/>

                <label class="labelFontSize">Broj gostiju:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.numberOfGuests}}</label><br/><br/><br/>

                <label class="labelFontSize">Cena po noći:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.pricePerNight}}</label><br/><br/><br/>

                <label class="labelFontSize">Adresa:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.location.address.street}} {{this.apartment.location.address.houseNumber}}, {{this.apartment.location.address.populatedPlace}} {{this.apartment.location.address.zipCode}}, {{this.apartment.location.address.country}} </label><br/><br/><br/>

				<label class="labelFontSize">Lokacija:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.location.latitude}}, {{this.apartment.location.longitude }}</label><br/><br/><br/>

                <label class="labelFontSize">Datum od kojeg se izdaje:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.releaseDates[0]}}</label><br/><br/><br/>

                <label class="labelFontSize">Datum do kojeg se izdaje:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.releaseDates[1]}}</label><br/><br/><br/>

                <label class="labelFontSize">Vreme za prijavu:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.checkInTime}}</label><br/><br/><br/>

                <label class="labelFontSize">Vreme za odjavu:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.checkOutTime}}</label><br/><br/><br/>

                <label class="labelFontSize">Domaćin:</label><br/><br/>
                <label class="labelWithoutItalicFontStyle">{{this.apartment.host}}</label><br/>

            </div>
        </div>
    </div>

    <div class="listOfApartments2">
        
    <h1 id="titleForContentForApartment">Sadržaj apartmana</h1><br/><br/><br/>
        <div class="table-wrapper-apartment">

                <table class="fl-table">
                    <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Naziv sadržaj apartmana</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="a in this.apartment.amenities">
                        <td class="serialNumber"></td>
                        <td>{{a.content}}</td>

                    </tr>
                    </tbody>
                </table>
            </div>
            
    </div>

    <div class="listOfApartments2">
        
            <h1 id="titleForCommentsForApartment">Komentari za apartman</h1><br/><br/><br/>
                <div class="table-wrapper-apartment">
        
                        <table class="fl-table">
                            <thead>
                            <tr>
                                <th>Gost</th>
                                <th>Komentar</th>
                                <th>Ocena</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="c in this.commentsList">
                                <td>{{c.guest}}</td>
                                <td>{{c.text}}</td>
                                <td>{{c.grade}}</td>
                            </tr>
                                      
                            </tbody>
                        </table>
                    </div>
                    <br/><br/><br/><br/><br/>
                    
      </div>
		
		</div>
	
	
	`
	,
	components : {
		vuejsDatepicker
	},
	computed : {
		disabledDates() {
			
			var startDateFromList = null;
			var endDateFromList = null;
			var listDates = [];
			
			for(r of this.reservationsForApartmentList){
				
				if(r.status === 'Kreirana' || r.status === 'Prihvacena'){
					startDateFromList = moment(r.startDate);
					startDateFromList = new Date(startDateFromList);
					
					endDateFromList = new Date(startDateFromList.getTime() + r.numberOfNight*24*60*60*1000);
					
					listDates.push({from: startDateFromList, to: endDateFromList});
				}
		
			}
			
//			var startDateFromList2 = null;
//			var endDateFromList2 = null;
			
//			for(period of this.apartment.releaseDates){
//				
//				
//				startDateFromList2 = moment(period.startDate); 
//				startDateFromList2 = new Date(startDateFromList2);
//				console.log('start: ' + startDateFromList2)
//				
//				endDateFromList2 =  moment(period.endDate); 
//				endDateFromList2= new Date(endDateFromList2);
//				console.log('end: ' + endDateFromList2)
//				
//				
//				listDates.push({to: startDateFromList2 });
//
//			}
			
			/*
			 * ------10.9-20.9-----1.10-10.10-------23.10-28.10-------
			 * I
			 * prvi datum < trenutni datum = pocetni je trenutni
			 * 
			 * prvi > trenutni = pocetni je prvi
			 * 
			 * daj poslednji u tom periodu 20.9
			 * 
			 * zabrani poslednju u prethdnom i prvi u narednom
			 * 
			 * daj poslednji u narednom
			 * 
			 * ...
			 * 
			 * krajnjeg (SVUDA PROVERA DA LI JE POSLEDNJI TAJ DATUM)
			 * 
			 * uzeti duzinu liste, brojac     period = 1
			 * 
			 * ako je stigao do kraja u promenljivu dodaj taj kranji i zabrani do kraja
			 * 
			 */
			
			var currentDate = new Date();
			var legthOfListDates = this.apartment.releaseDates.length; // ili size
			console.log('duzina ' + legthOfListDates)
			
			var startDateForRent = null;
			var firstEndDate = null;
			
			if(this.apartment.releaseDates.length !== 0){
				firstEndDate = this.apartment.releaseDates[0].endDate;
				
				if(moment(currentDate) > moment(this.apartment.releaseDates[0].startDate)){
					startDateForRent = currentDate;
				} else {
					startDateForRent = this.apartment.releaseDates[0].startDate;
				}
			}
			
			
			var i;
			var j = 0;
			
			for (i = 0; i < this.apartment.releaseDates.length; i++) {
				j = i + 1;
				if(legthOfListDates === (i + 1)){
					break;
				}		
				console.log(moment(this.apartment.releaseDates[j].startDate).startOf('day').toDate()) // 21
				console.log(moment(this.apartment.releaseDates[i].endDate).startOf('day').toDate() ) // 15
				listDates.push({to: moment(this.apartment.releaseDates[j].startDate).startOf('day').toDate(), from: moment(this.apartment.releaseDates[i].endDate).startOf('day').toDate() });	
			}
			
			
			
			
//			console.log(listDates)
				
			var state = {
					  disabledDates: {
						  to : moment(startDateForRent).startOf('day').toDate(),
						  from : moment(this.apartment.releaseDates[this.apartment.releaseDates.length - 1 ].endDate).startOf('day').toDate(),
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
		
		previousButtonClicked : function() {
			if(confirm('Da li ste sigurni da želite da se vratite na pregled rezultata pretrage?') === true){ 
				this.$router.push({ name: 'searchedApartments', params : { searchedApartments  : this.searchedApartments } })
			}
		},
		
		singIn : function() {
			this.$router.push({ name: 'login', params: { goToReservation : true, apartment: this.apartment }})
		},
		
		sendComment : function() {
			var empty = false;
			
			
			if(this.commentField.length === 0){
				empty = true;
				this.showNotificationForComment = true;
			} else {
				this.showNotificationForComment = false;
			}
			
			if(this.markForApartment === "withoutMark"){
				empty = true;
				this.showNotificationForMark = true;
			} else {
				this.showNotificationForMark = false;
			}
			
			if(!empty){
				axios.post('services/comments/addNewCommet', {"guest" : '' + this.activeUser.username, "apartment" : '' + this.apartment.id,
					"text" : '' + this.commentField, "grade" : this.markForApartment, "id": '' + "comment " + this.maxIdNumber, "visibility" :  this.visibility})
				.then(response => {
					if(response.status === 200){
						toast('Komentar je uspešno ostavljen!')
						//this.commentsList = response.data;
					} else if(response.status === 400) {
						this.$router.push({ name: 'badRequest'});
					}else {
						toast('Komentar nije uspešno ostavljen, pokušajte ponovo!')
					}
					
				});
			}
		},
		
		apartmanReservationClick : function(){
			var empty = false;
			this.showNotificationForErrorReservation = false;
			this.showNotificationForErrorReservationImput = false;
			var newStartDate = null;
			
			if(this.startDateModel.length === 0){
				empty = true;
				this.showNotificationForErrorReservationImput = true;
			} else {
				this.showNotificationForErrorReservationImput = false;
				//console.log(this.startDateModel)
				let localStartDate = moment(this.startDateModel).format("YYYY-MM-DD");
				//console.log(localStartDate)
				newStartDate = new Date(localStartDate);
				console.log(newStartDate)
			}
			
			if(this.numberOfNightsModel.length === 0){
				empty = true;
				this.showNotificationForErrorReservationImput = true;
			} else {
				this.showNotificationForErrorReservationImput = false;
			}
			
			if(this.messageModel.length === 0){
				empty = true;
				this.showNotificationForErrorReservationImput = true;
			} else {
				this.showNotificationForErrorReservationImput = false;
			}
			
			var totalCost = this.apartment.pricePerNight * this.numberOfNightsModel;
			
			
			
			if(!empty){
				axios.post('services/reservation/createReservation', {"apartment" : '' + this.apartment.id, "startDate" : newStartDate,
					"numberOfNight" : this.numberOfNightsModel, "totalCost" : totalCost, "id": '' + "R" + this.maxIdNumberForReservation, "messageForReservation" : '' + this.messageModel,
					"guest" :'' +  this.activeUser.username, "status" : "Kreirana"})
				.then(response => {
					if(response.status === 200){
						toast('Rezervacija je uspešno kreirana!');
						axios.get('services/reservations/getReservationForApartment' , {params: {"id" : '' + this.apartment.id}}).then(response => {
							this.reservationsForApartmentList = response.data;
						});
					} else if(response.status === 400) {
						this.$router.push({ name: 'badRequest'});
					}else if(response.status === 201){
						toast('Rezervacija nije kreirana, pogresan unos datuma i noci!');
					}
					
				});
			}
			
			
			
		}
		
	},
	
	mounted() {
		
		this.apartment = this.$route.params.apartment;
		this.startDateOfRent = this.apartment.releaseDates[0];
		this.endDateOfRent = this.apartment.releaseDates[1];
		this.searchedApartments = this.$route.params.activeApartmentsNOTCHANGEDlist;
		
		
		console.log(this.apartment.id)
		console.log(this.imageCount)
		for(p of this.apartment.pictures){
			this.listOfPics.push(p);
			this.imageCount++;
			console.log(p)
		}
		console.log(this.imageCount)
		
		if(this.listOfPics.length === 0){
			this.checkIfImageExists = false;
		}else{
			this.checkIfImageExists = true;
			//this.imageCount = this.listOfPics.length;
		}
		
		
		
		axios.post('services/comments/getVisibleComments', this.apartment.comments).then(response => {
			if(response.status === 200){
				this.commentsList = response.data;
			} else if(response.status === 400) {
				this.$router.push({ name: 'badRequest'});
			}else {
				this.commentsList = response.data;
			}
		});
		
		axios.get('services/comments/getCommentID').then(response => {
			this.maxIdNumber = response.data;
		});
		
		axios.get('services/reservations/getReservationID').then(response => {
			this.maxIdNumberForReservation = response.data;
		});
		
		axios.get('services/reservations/getReservationForApartment' , {params: {"id" : '' + this.apartment.id}}).then(response => {
			this.reservationsForApartmentList = response.data;
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
				axios.get('services/reservations/checkGuestReservationsForChosenApartment', 
						{params : {"apartmentID" : ''+ this.apartment.id, "guest" : '' + this.activeUser.username }}).then(response => {
							if(response.status === 200){
								this.showCommentsPart = true;
							} else {
								this.showCommentsPart = false;
							}
						});
			}else{
				this.activeGuest = false;
			}
				
		});	
	}
});