Vue.component("changeProfile", {
	data: function (){
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false, 
			oldPassword : '',
			newPassword : '',
			newPassword2 : '',
			emptyField : false,
			userPassword : '',
			invalidOldPassword : false,
			invalidNewAndControlPasswords : false
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
	            <li v-if="activeHost"><a href="#">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#">Komentari</a></li>   
                <li v-if="activeAdmin"><a href="#">Korisnici</a></li>   
                <li v-if="activeGuest"><a href="#">Moje rezervacije</a></li>
            </ul>
        </div>
    
        <div class="dropdown">
            <button class="dropbtn"><img id="menuIcon" src="pictures/menuIcon.png" />
                <img id="userIcon" src="pictures/user.png" />
            </button>
	        <div v-if="activeUser" class="dropdown-content">
	             <router-link to="/changeProfile" > Moj nalog </router-link>
	            <router-link to="/login" v-on:click.native="logOut($event)" > Odjavi se </router-link>            
	        </div>
        </div>
    </div>

    <div class="verticalLine"></div>

    <div class="sideComponents">      
        <ul class="ulForSideComponents">     
            <div><li class="active"><a href="#">IZMENA PROFILA</a></li></div><br/>
        </ul>
    </div>


    <div class="titleForMyProfil">
        <h1>Moji podaci</h1>
    </div> 

    <div class="listOfApartments">

        <div class="wrapper-form-my-profil">
            <div class="data-my-profil">
                <div class="text-for-adding-apartment">
                    <form id="form" method="POST">
                    	
                        <br><label for="name">Korisničko ime:</label>
                        <input type="text" id="usernameID" name="usernameName" v-model=activeUser.username  disabled>
                        
                        <br><label for="name">Ime:</label>
                        <input type="text" id="nameID" name="nameName" v-model=activeUser.name>
                    
                        <br><label for="surname">Prezime:</label>
                        <input type="text" id="surnameID" name="surnameName" v-model=activeUser.surname>
                			
                    
                        <br><label for="password">Stara lozinka:</label>
                        <input type="password" id="passwordID" name="passwordName" v-model="oldPassword"  placeholder="Unesite staru lozinku...">
                    	<label style="color:red;" v-if="invalidOldPassword"><br>Neispravna stara lozinka!</label>
                    	
                        <br><label for="password">Nova lozinka:</label>
                        <input type="password" id="passwordID" name="passwordName" v-model="newPassword" placeholder="Unesite novu lozinku...">

                        <br><label for="password2">Kontrolna lozinka:</label>
                        <input type="password" id="passwor2dID" name="password2Name" v-model="newPassword2" placeholder="Unesite ponovo novu lozinku...">
                    	<label style="color:red;" v-if="invalidNewAndControlPasswords"><br>Nova i kontrolna lozinka se ne poklapaju!</label>
                    	
                        <br><label for="gender">Pol:</label>
                        <select id="genderID" name="genderName" v-model=activeUser.gender>
                          <option value="musko">Muško</option>
                          <option value="zensko">Žensko</option>
                        </select>
                        
                        <label style="color:red;" v-if="emptyField"><br>Sva polja moraju biti popunjena!</br></label>
                        
                        <div class="change-btn">
                            <button type="submit" v-on:click="change(activeUser, newPassword)">Izmeni</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	</div>
	`	
	,
	methods: {
		logOut : function(event)
		{
			if (confirm('Da li ste sigurni da želite da se odjavite?') == true) {
				axios.get('services/users/logout')
			}
			else
			{
				//event.preventDefault();
				this.$router.push({ name: 'changeProfile' })
			}
			
		},
		change : function(activeUser, newPassword)
		{
			var empty = true;
			document.getElementById("form").setAttribute("onsubmit","return false;");
			
			if(this.oldPassword.length === 0 || this.newPassword.length === 0 || this.newPassword2.length === 0 || activeUser.name.length === 0 || activeUser.surname.length === 0)
			{
				this.emptyField = true; 
				empty = false;
			}
			else
			{
				this.emptyField = false;
			}
			
			if(this.oldPassword != this.userPassword)
			{
				this.invalidOldPassword = true; 
				empty = false;
			}
			else
			{
				this.invalidOldPassword = false;
			}
			
			if(this.newPassword != this.newPassword2){
				this.invalidNewAndControlPasswords = true;
				empty = false;
			} else {
				this.invalidNewAndControlPasswords = false;
			}
			
			
			if(empty)
			{ 
				axios.post('services/users/changeProfile', {"username":'' + this.acitveUser.username, "name" : '' + this.acitveUser.name, 
					"surname":'' + this.acitveUser.surname, "password":'' + this.acitveUser.password, "gender":'' + this.activeUser.gender}, 
					{params:{username:'' + this.activeUser.username}})
				.then(response => {
					if(this.invalidNewAndControlPasswords === false)
					{
						toast('Nove informacije za korisnika ' + this.acitveUser.username + ' su sačuvane!');	
					}
				});
			
			}
			
				
		}
	},
	mounted(){
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
			
			this.userPassword = response.data.password;
			

		});	
	}
	
});