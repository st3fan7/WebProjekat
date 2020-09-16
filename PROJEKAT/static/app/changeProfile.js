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
			invalidNewAndControlPasswords : false,
			errorName : false,
			errorSurname : false,
			errorNameRegex : false,
			errorSurnameRegex : false
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
	            <li id="onlyHomePage"><a href="#/" v-on:click="notChange($event)">Početna</a></li>
	            <li v-if="activeHost"><a href="#/reviewApartments" v-on:click="notChange($event)">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#" v-on:click="notChange($event)">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/reservations" v-on:click="notChange($event)">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/comments" v-on:click="notChange($event)">Komentari</a></li>   
                <li v-if="activeAdmin"><a href="#/adminUsers" v-on:click="notChange($event)">Korisnici</a></li>   
                <li v-if="activeGuest"><a href="#/reservations" v-on:click="notChange($event)">Moje rezervacije</a></li>
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
                        <input type="text" id="usernameID" name="usernameName" v-model=activeUser.username disabled>
                        
                        <br><label for="name">Ime:</label>
                        <input type="text" id="nameID" name="nameName" v-model=activeUser.name>
                        <label v-if="errorName" style="color:red; font-size: 16px">Polje ne sme biti prazno!</label><br>
                        <label v-if="errorNameRegex" style="color:red; font-size: 16px">Možete uneti samo slova i prvo slovo mora biti veliko!</label>
                    
                        <br><label for="surname">Prezime:</label>
                        <input type="text" id="surnameID" name="surnameName" v-model=activeUser.surname>
                        <label v-if="errorSurname" style="color:red; font-size: 16px">Polje ne sme biti prazno!</label><br>
                		<label v-if="errorSurnameRegex" style="color:red; font-size: 16px">Možete uneti samo slova i prvo slovo mora biti veliko!</label>
                    
                        <br><label for="password">Stara lozinka:</label>
                        <input type="password" id="passwordID" name="passwordName" v-model="oldPassword"  placeholder="Unesite staru lozinku...">
                    	<label style="color:red;" v-if="invalidOldPassword"><br>Neispravna stara lozinka!</label>
                    	
                        <br><label for="password">Nova lozinka:</label>
                        <input type="password" id="passwordID" name="passwordName" v-model="newPassword" placeholder="Unesite novu lozinku...">

                        <br><label for="password2">Kontrolna lozinka:</label>
                        <input type="password" id="passwor2dID" name="password2Name" v-model="newPassword2" placeholder="Unesite ponovo novu lozinku...">
                    	<label style="color:red; font-size: 16px" v-if="invalidNewAndControlPasswords"><br>Nova i kontrolna lozinka se ne poklapaju!</label>
                    	
                        <br><label for="gender">Pol:</label>
                        <select id="genderID" name="genderName" v-model=activeUser.gender>
                          <option value="musko">Muško</option>
                          <option value="zensko">Žensko</option>
                        </select>
                        
                        
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
		notChange(event)
		{
			
			if (confirm('Ukoliko napustite ovu stranicu, sve izmene će biti uklonjene. Napusti?') == false) {
				event.preventDefault()
			}
		},
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
			this.errorName = false;
			this.errorSurname = false;
			this.errorNameRegex = false;
			this.errorSurnameRegex = false;
			
			//if(this.oldPassword.length === 0 || this.newPassword.length === 0 || this.newPassword2.length === 0 || this.activeUser.name.length === 0 || this.activeUser.surname.length === 0)
			if(this.oldPassword.length === 0 )
			{
				this.emptyField = true; 
				empty = false;
			}
			else
			{
				this.emptyField = false;
			}
			
			if(activeUser.name.length === 0){
				this.emptyField = true; 
				empty = false;
				this.errorName = true;
			} else {
				if(!document.getElementById("nameID").value.match(/[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+/g)){
					this.errorNameRegex = true;
				}
			}
			
			if(activeUser.surname.length === 0){
				this.emptyField = true; 
				empty = false;
				this.errorSurname = true;
			} else {
				if(!document.getElementById("surnameID").value.match(/[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+/g)){
					this.errorSurnameRegex = true;
				}
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
			
			
			if(this.newPassword.length !== 0 && this.newPassword2.length === 0){//1 prazno
				
				this.emptyField = true; 
				empty = false;
				
			}else if(this.newPassword.length === 0 && this.newPassword2.length !== 0){//1 prazno
				
				this.emptyField = true; 
				empty = false;
				
			}else{//popunjeno
				this.emptyField = false;
				
			}
			
			
			//novaLozinka
			if(this.newPassword2 != '' && this.newPassword === this.newPassword2){
				this.userPassword = this.newPassword2;
			}
						
		
			
			
			if(empty)
			{ 
				
				axios.post('services/users/changeProfile', {"username":'' + activeUser.username, "name" :'' + activeUser.name, 
					"surname":'' + activeUser.surname, "password":'' + this.userPassword, "gender":'' + activeUser.gender, "role": '' + activeUser.role}, 
					{params:{username:'' + activeUser.username, role:'' + activeUser.role}})
				.then(response => {
					if(this.invalidNewAndControlPasswords === false)
					{
						toast('Nove informacije za korisnika ' + this.activeUser.username + ' su sačuvane!');	
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