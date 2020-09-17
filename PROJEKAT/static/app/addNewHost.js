Vue.component("addNewHost", {
	data: function() {
		return {
			username : '',
			password : '',
			password2 : '',
			name : '',
			surname : '',
			genderM : null,
			genderF : null,
			role : "domacin",
			showNotification : false,
			passwordCheck : false,
			gender : null,
			genderCheck : false,
			errorUsername : false,
			errorName : false,
			errorSurname : false,
			errorPassword : false,
			errorPassword2 : false,
			activeAdmin : null,
			activeHost : null,
			activeGuest : null
		}
	}, 
	template:`
	<div>
	 
	    <div class="logoAndNameForLogin" style="margin-top:2%; margin-left:5.1%">
	        <div class="logo">        
	            <img src="pictures/clipart302388.png"/>
	        </div>
	        <div class="webName">
	            <h3>BookingApp</h3>
	        </div>  
	    </div>


    <div class="main" style="margin-top:1.3%">     
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
    
    <div class="verticalLineReservation" style="margin-top:12%;"></div>
	
	 <div class="sideComponents">      
	     <ul class="ulForSideComponentsHostReservation">
	         <div><li ><a href="#/adminUsers">PREGLED KORISNIKA</a></li></div><br/>
	         <div v-if="activeAdmin"><li class="active"><a href="#/addNewHost">DODAJ DOMAĆINA</a></li></div><br/>	
	     </ul>			     
        	       
	     
	 </div>

    <div class="signIn">
        <div class="form-container sign-in-container" style="margin-left: 10%;">
            <form class="formReg" id="form" action="" onsubmit="return false;"  method = "POST">
                <h1>Registracija domaćina:</h1>
                <input type="text" placeholder="Korisničko ime" id="username" v-model="username" />
                 <label v-if="errorUsername" style="color:red">Polje ne sme biti prazno!</label>
                <input type="text" placeholder="Ime" id="name" v-model="name"/>
                 <label v-if="errorName" style="color:red">Polje ne sme biti prazno!</label>
                <input type="text" placeholder="Prezime" id="surname" v-model="surname"/>
                 <label v-if="errorSurname" style="color:red">Polje ne sme biti prazno!</label>
                
                <div class= "divv">
                    <label class= "radio">
                        <input type="radio" name="rdo" id="muski" checked="checked" value="musko" v-model="gender"/><label for="muski">Muški</label>
                      </label>
                      
                      <label  class="radio">
                        <input type="radio" name="rdo" id="zenski" value="zensko" v-model="gender"/><label for="zenski" >Ženski</label>
                      </label>
                      
                     
                </div>
                
                 <label v-if="genderCheck" style="color:red">Odaberite pol!</label>
                 
                
                <input type= "password" placeholder="Lozinka" id="password" v-model="password" />
                <label v-if="errorPassword" style="color:red">Polje ne sme biti prazno!</label><br>
                <input type="password" placeholder="Ponovi lozinku" id="password2" v-model="password2"/>
                <label v-if="errorPassword2" style="color:red">Polje ne sme biti prazno!</label><br>
                <label v-if="passwordCheck" style="color:red">Lozinke se ne poklapaju!</label><br>
                
                <label v-if="showNotification" style="color:red">Korisničko ime već postoji!</label>
               
                <button type="submit" id="signInButton"  v-on:click="register">Registruj domacina</button>
                
            </form>
        </div>
       
       
    </div>
	</div>
	`
		
	,
	methods: {
		register : function() {
			var empty = false;
			this.showNotification = false;
			this.passwordCheck = false;
			this.genderCheck = false;
			this.errorUsername = false;
			this.errorName = false;
			this.errorSurname = false;
			this.errorPassword = false;
			this.errorPassword2 = false;
			
			if(this.username === null || this.username.length === 0) {	
				var pocrveni = document.getElementById("username");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
				this.errorUsername = true;
			} else {
				var pocrveni = document.getElementById("username");
				pocrveni.style.backgroundColor = "#eee"; 
			}
			
			
			if(this.name === null || this.name.length === 0) {
				var pocrveni = document.getElementById("name");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
				this.errorName = true;
			}  else {
				var pocrveni = document.getElementById("name");
				pocrveni.style.backgroundColor = "#eee"; 
			}
			
			
			if(this.surname === null || this.surname.length === 0) {
				var pocrveni = document.getElementById("surname");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
				this.errorSurname = true;
			}  else {
				var pocrveni = document.getElementById("surname");
				pocrveni.style.backgroundColor = "#eee"; 
			}
			
			
			if(this.password === null || this.password.length === 0) {
				var pocrveni = document.getElementById("password");
				pocrveni.style.backgroundColor = "LightCoral";
				empty = true;
				this.errorPassword = true;
			} else{
				var pocrveni = document.getElementById("password");
				pocrveni.style.backgroundColor = "#eee";
				
			}
			
			if((this.password2 === null || this.password2.length === 0 )) {
				var pocrveni = document.getElementById("password2");
				pocrveni.style.backgroundColor = "LightCoral";
				empty = true;
				this.errorPassword2 = true;
			}else{
				var pocrveni = document.getElementById("password2");
				pocrveni.style.backgroundColor = "#eee";
				
			}
			
			if(this.gender === null){
				this.genderCheck = true;
				empty = true;
			}
			
			
			//ZA LOZINKE
			var pass1 = document.getElementById("password").value;
			var pass2 = document.getElementById("password2").value;
			
			if(pass1 != pass2){
				this.passwordCheck = true;
				empty = true;
			}

			
			if(empty === false){		
				axios.post('services/users/addNewHostByAdmin',  { "username": '' + this.username ,"password" : this.password,
							"name": '' + this.name, "surname" : this.surname, "gender" : this.gender, "role" : this.role},{
								params:{username: this.username}		
					}).then(response => {
						if(response.status === 200){ 							
								toast('Korisnik ' + this.name + ' je uspešno dodat sa ulogom domaćina');													
						}
						else if(response.status === 201){
							this.showNotification = true;
						}
						else if(response.data.toString() === "Bad request"){
							console.log('ovde sa')
							this.$router.push({ name: 'badRequest' })
						}
					}).catch(error => {

		                if(error.response.status === 400){
		                    this.$router.push({ name: 'badRequest' });
		                }});
				}

		},

		checkForbidden : function(activeUser)
		{
			if (activeUser === null)
			{				
				this.$router.push({ name: 'forbidden' })	
				
			}else if(activeUser.role !== 'admin'){
				this.$router.push({ name: 'forbidden' })	
			}
			
			else
			{				
			axios
			.post('services/users/forbiddenUser', {'page': 'addNewHost'}).then(response => {
				if(response.status !== 200)
				{
					this.$router.push({ name: 'forbidden' })
				}
			});
			}
		}
	},
	mounted() {
		

		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			this.checkForbidden(response.data)
			
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