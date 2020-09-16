Vue.component("amenitiesChange", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			amenitiesList : null,
			amenityModel : '',
			oldAmenityModel : '',
			showManpulationPartForContent : false,
			addAmenityInputField : '',
			errorAddNewAmenity : false,
			errorChangeAmenity : false,
			emptyAddNewField : false,
			emptyChange : false
		}
	},
	template: 
		`
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
		
		    <div class="sortAndFilterForUserReservation">
		
		        <div class="search-title2">
		            <h1>Dodaj novi sadržaj:</h1>
		            <form id="formForSearch" action="#">
		                <input v-model="addAmenityInputField" type="text" id="amenitiesID" name="amenitiesName" placeholder="Unesite naziv sadržaja...">
		        		<label v-if="errorAddNewAmenity" style="color:red; font-size: 16px; margin-left: 20%;">Možete uneti samo slova!</label><br>
		        		<label v-if="emptyAddNewField" style="color:red; font-size: 16px; margin-left: 20%;">Polje ne sme biti prazno!</label><br>
		        		
		                <div class="add-btn-amenities">
		                    <button @click="addAmenity()" id="searchInUserReservationID" type="button">Dodaj</button>
		                </div>
		            </form>           
		        </div>
		
		        <div v-if="showManpulationPartForContent" class="price-title2">
		            <h1 id="sort-text-in-user-reservation">Selektovan sadržaj:</h1>
		            <form id="formForSort" action="#">
		                
		                    <input v-model="amenityModel" type="text" id="amenitiesChangeID" name="amenitiesChangeName">
		    				<label v-if="errorChangeAmenity" style="color:red; font-size: 16px; margin-left: 20%;">Možete uneti samo slova!</label><br>
		    				<label v-if="emptyChange" style="color:red; font-size: 16px; margin-left: 20%;">Polje ne sme biti prazno!</label><br>
		    				
		                    <div class="search-btn-user-reservation">
		                        <button @click="changeAmenities()" id="change-btn-in-admin-change-apartment" type="button">Izmeni</button>
		                    </div>
		
		                    <div class="delete-btn-in-amenities">
		                        <button @click="deleteAmenities()" id="delete-btn-id" type="button">Obriši</button>
		                    </div>
		                   
		                    <div class="cancel-btn-in-amenities">
		                        <button @click="cancelChange()" id="cancel-btn-id" type="button">Odustani</button>
		                    </div>
		            </form>
		        </div>
		
		
		    </div>
		
		    <div class="verticalLine"></div>
		
		    <div class="sideComponents">      
		        <ul class="ulForSideComponents">
		            <div><li class="active"><a href="#">SADRŽAJ</a></li></div><br/>
		            <div><li><a href="#/reviewApartments">PREGLED APARTMANA</a></li></div><br/>  
		        </ul>
		    </div>
		
		    <div class="listOfApartments">
		        <div class="table-wrapper">
		                <table class="fl-table">
		                    <thead>
		                    <tr>
		                        <th>Redni broj</th>
		                        <th>Naziv sadržaj apartmana</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    <tr v-for="a in amenitiesList" @click="fillInputWithContent(a.content)">
		                        <td class="serialNumber"></td>
		                        <td>{{a.content}}</td>
		                    </tr>
		                    
		                    </tbody>
		                </table>
		            </div>
		    </div>
		</div>
		
		`
	,
	methods : {
		fillInputWithContent : function(content){
			this.showManpulationPartForContent = true;
			this.oldAmenityModel = content;
			this.amenityModel = content;
			console.log("Stara : " + this.oldAmenityModel)
		},
		
		cancelChange : function() {
			if(confirm('Da li ste sigurni da želite da odustante od promene?') == true){
				this.showManpulationPartForContent = false;
			}
			
		},
		
		deleteAmenities : function() {
			if(confirm('Da li ste sigurni da želite da obrišete sadržaj koji se zove: ' + this.amenityModel + '?') == true){
				this.showManpulationPartForContent = false;
				axios.post('services/amenities/deleteAmenity', this.amenityModel)
				.then(response => {
					if(response.status === 200){
						toast('Sadržaj je uspšeno obrisan!')
					} else if(response.status === 201){
						toast('Neuspešno brisanje!')
					} else {
						toast('Greška!')
					}
				});
				
				axios.get('services/amenities/getAllAmenities').then(response => {
					if(response.status === 200){
						this.amenitiesList = response.data;	
					} else {
						this.amenitiesList = response.data;	
						toast('Trenutno nema sadržaja!')
					}
				});
				
			}
		},
		
		changeAmenities : function() {
			var empty = false;
			this.errorChangeAmenity = false;
			
			this.emptyChange = false;
			
			if(this.amenityModel === null || this.amenityModel === '') {
				var red = document.getElementById("amenitiesChangeID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
				this.emptyChange = true;
			} else {
				if(!document.getElementById("amenitiesChangeID").value.match(/^[A-Za-zŠšĐđŽžČčĆć ]+$/)){
					this.errorChangeAmenity = true;
					empty = true;
				}
				var red = document.getElementById("amenitiesChangeID");
				red.style.backgroundColor = "white"; 
			} 
			
			
			if(empty === false){
				if(confirm('Da li ste sigurni da želite da izvršite izmenu?') == true){
					this.showManpulationPartForContent = false;
					axios.post('services/amenities/changeAmenity', {"content" : '' + this.amenityModel}, 
							{params : {"oldAmenity" : this.oldAmenityModel}})
					.then(response => {
						if(response.status === 200){
							toast('Sadržaj je uspšeno izmenjen!')
							this.amenitiesList = response.data;
						} else {
							this.$router.push({name : 'badRequest'});
						}
					});
				}
			}
			
			
		},
		
		addAmenity : function() {
			
			var empty = false;
			this.errorAddNewAmenity = false;
			this.emptyAddNewField = false;
			
			if(this.addAmenityInputField === null || this.addAmenityInputField === '') {
				var red = document.getElementById("amenitiesID");
				red.style.backgroundColor = "LightCoral"; 
				empty = true;
				this.emptyAddNewField = true;
			} else {
				if(!document.getElementById("amenitiesID").value.match(/^[A-Za-zŠšĐđŽžČčĆć ]+$/)){
					this.errorAddNewAmenity = true;
					empty = true;
				}
				var red = document.getElementById("amenitiesID");
				red.style.backgroundColor = "white"; 
			} 
			
			if(empty === false){
				if(confirm('Da li ste sigurni da želite da dodate ' + this.addAmenityInputField + '?') == true){
					axios.post('services/amenities/addAmenity', {"content": '' + this.addAmenityInputField})
					.then(response => {
						if(response.status === 201) {
							toast('Sadržaj je uspešno dodat!')
							this.amenitiesList = response.data;
						} else if(response.status === 200) {
							toast('Sadržaj već postoji!')
						} else {
							toast('Sadržaj nije dodat!')
							this.$router.push({ name : 'badRequest'});
						}
					});
					
				} 
				
				this.addAmenityInputField = '';
			}
			
			

			
		}
		
		
		
	},
	mounted() {
		
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
				axios.get('services/amenities/getAllAmenities').then(response => {
					if(response.status === 200){
						this.amenitiesList = response.data;	
					} else {
						toast('Trenutno nema sadržaja!')
					}
				});
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