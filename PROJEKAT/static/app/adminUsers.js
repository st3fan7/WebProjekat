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
			selectedRole : 'uloga'
			
			
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
				             <li><a href="#/">Početna</a></li>
				             <li><a href="#">Apartmani</a></li>
				             <li><a href="#">Rezervacije</a></li>
				             <li><a href="#">Komentari</a></li>
				             <li class="active"><a href="#">Korisnici</a></li>
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
			         <div><li class="active"><a href="#">PREGLED KORISNIKA</a></li></div><br/>
			     </ul>
			 </div>
	
			 <div class="sortAndFilterForUserOverview">
			     <div class="filter-title">
			         <h1>Pretraži po:</h1>
			         
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
			                 </tr>
			                 </thead>
			                 <tbody>
			                 
				                 <tr v-for="user in filteredUsers">
				                 <td>{{user.username}}</td>
				                 <td>{{user.name}}</td>
				                 <td>{{user.surname}}</td>
				                 <td>{{user.gender}}</td>
				                 <td>{{user.role}}</td>			                 
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
		
		axios.get('services/users/getAllUsers').then(response => {
      	  this.allUsers = response.data;  
        });
		
		
		
		
	}
	
	
});