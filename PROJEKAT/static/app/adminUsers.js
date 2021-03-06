Vue.component("adminUsers",{
	data : function(){
		return{
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			allUsers : null,
			searchedUsers : null,
			searchUsername : '',
			selectedGender : 'pol',
			selectedRole : 'uloga',
			addHostCheck : false
			
			
		}
	
	},
	template:` 
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
			                <li v-if="activeHost || activeAdmin" class="active"><a href="#/adminUsers">Korisnici</a></li>   
			                <li v-if="activeGuest"><a href="#/reservations">Moje rezervacije</a></li>
				         </ul>
				     </div>
				 
				     <div class="dropdown">
				         <button class="dropbtn"><img id="menuIcon" src="pictures/menuIcon.png" />
				             <img id="userIcon" src="pictures/user.png" />
				         </button>
				         <div class="dropdown-content">
				         	<router-link to="/changeProfile" > Moj nalog </router-link>
				            <router-link to="/login" v-on:click.native="logOut($event)" > Odjavi se </router-link>  
				         </div>
				     </div>
		     </div>
	
			 <div class="verticalLineReservation"></div>
			
			 <div class="sideComponents">      
			     <ul class="ulForSideComponentsHostReservation">
			         <div><li v-bind:class="{ active: this.addHostCheck === false}"><a href="#/adminUsers">PREGLED KORISNIKA</a></li></div><br/>
			         <div v-if="activeAdmin"><li v-bind:class="{ active: this.addHostCheck}"><a href="#/addNewHost">DODAJ DOMAĆINA</a></li></div><br/>	
			     </ul>			     
		         	       
			     
			 </div>
	
			 <div class="sortAndFilterForUserOverview">
			     <div class="filter-title">
			         <h1>Pretraži po:</h1>
			         	 <br><br>
			             <label for="username" id="labelForUsername">Korisničko ime:</label>
			             <input type="text" id="usernameID" name="usernameName" v-model="searchUsername" placeholder="Unesite korisničko ime...">
			          <form id="formForSearch" >
			             <label id="labelForRole" for="role">Uloga:</label>
			             <select id="roleID" name="roleName" v-model="selectedRole">
			             	 <option value="uloga" selected>Uloga</option>
			                 <option value="gost">Gost</option>
			                 <option value="domacin">Domaćin</option>
			                 <option value="admin">Administrator</option>
			             </select>
						<br><br>
			             <label id="labelForGender" for="gender">Pol:</label>
			             <select id="genderID" name="genderName" v-model="selectedGender">
			             	 <option value="pol" selected>Pol</option>
			                 <option value="musko">Muško</option>
			                 <option value="zensko">Žensko</option>
			             </select>
			
			             <div class="search-btn-user-overview">
			                 <button type="button" @click="searchRoleAndGender">Pretraži</button>
			             </div>
			             
			             
		                 
			         </form>
			     </div>
			 </div>
	
			 <div class="listOfApartments">
			     <div class="table-wrapper">
			             <table class="fl-table">
			                 <thead>
			                 <tr>
			                     <th>Korisničko ime</th>
			                     <th>Ime</th>
			                     <th>Prezime</th>
			                     <th>Pol</th>
			                     <th>Uloga</th>
			                     <th v-if="activeAdmin">Manipulacija nalogom</th>
			                 </tr>
			                 </thead>
			                 <tbody>
			                 
				                 <tr v-for="user in filteredUsers">
				                 <td>{{user.username}}</td>
				                 <td>{{user.name}}</td>
				                 <td>{{user.surname}}</td>
				                 <td>{{user.gender}}</td>
				                 <td>{{user.role}}</td>		
				                 <td v-if="activeAdmin">
				                 	
		                            <button style="width: 130px; height: 40px; font-size: 16px;" type="button" v-if="user.blocked === false && user.role !== 'admin'" @click="blockUser(user)">Blokiraj</button>
		                            <button style="width: 130px; height: 40px; font-size: 16px;" type="button" v-if="user.blocked === true && user.role !== 'admin'" @click="blockUser(user)">Odblokiraj</button>
                        		</td>	                 
				                 </tr>
			                 
			                 </tbody>
			             </table>
			         </div>
			 </div>
		
		
		
		
		</div>
	
	
	`,
	methods: {
		logOut : function(event)
			{
				if (confirm('Da li ste sigurni da želite da se odjavite?') == true) {
					axios.get('services/users/logout')
				}
				else
				{
					//event.preventDefault();
					this.$router.push({ name: 'homePage' })
				}
		
			},
			
			searchRoleAndGender : function()
			{
			axios.get('services/users/searchAdminUsersByRoleAndGender', {params: {
				role : this.selectedRole, gender : this.selectedGender
				}}).then(response => {
				if(response.status === 200)
				{
					this.allUsers = null;
					this.allUsers = response.data;
				}
				else{
					
					this.allUsers = this.allUsers;
				}
			});
			
			},
			
			checkForbidden : function(activeUser)
			{
				if (activeUser === null)
				{
					
					this.$router.push({ name: 'forbidden' })
				}
				else if(activeUser.role === 'gost')
				{
					
					this.$router.push({ name: 'forbidden' })
				}
				else
				{
					
				axios
				.post('services/users/forbiddenUser', {'page': 'adminUsers'}).then(response => {
					if(response.status !== 200)
					{
						this.$router.push({ name: 'forbidden' })
					}
				});
				}
			},
			
			blockUser : function(user) {
				if (confirm('Da li ste sigurni da želite da izvršite izmenu naloga?') == true) {
					axios.post('services/users/blockUser', user.username).then(response => {
						if(response.status === 200)
						{
							toast('Izmena je uspešno izvršena!')
							this.allUsers = response.data;
						}
					});
				}
				
			}
				
		
	}, 
	
	computed: {
	  	filteredUsers() {
	  		  
	  		
				if (this.searchUsername !== '') {
	      	return this.allUsers.filter((user) => {
	        	return user.username.startsWith(this.searchUsername);
	        });
	      }else{

	    	  return this.allUsers;	    	  
	      }
	      
	      
	    }
	  },
	    
	mounted(){
		  
		  this.allUsers = null;
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			this.checkForbidden(response.data)
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
				 this.allUsers = null;
				axios.get('services/users/getAllUsers').then(response => {
			      	  this.allUsers = response.data;  
			    });
			}else{
				this.activeAdmin = false;
			}		
												
			if (this.activeUser.role === "domacin"){
				this.activeHost = true;
				 this.allUsers = null;
				axios.get('services/users/getHostUsers').then(response => {
			      	  this.allUsers = response.data;  
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