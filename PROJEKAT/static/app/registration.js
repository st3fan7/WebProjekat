Vue.component("registration", {
	data: function() {
		return {
			username : '',
			password : '',
			password2 : '',
			name : '',
			surname : '',
			genderM : null,
			genderF : null,
			role : "gost",
			showNotification : false,
			passwordCheck : false,
			gender : null,
			genderCheck : false
		}
	}, 
	template:`
	<div>
    <div class="logoAndNameForLogin">
        <div class="logo">        
            <img src="pictures/clipart302388.png"/>
        </div>
        <div class="webName">
            <h3>BookingApp</h3>
        </div>  
    </div>


    <div class="main">
            
        <ul>
            <li id="onlyHomePageInLogin"><a id="loginA" href="#/">Početna</a></li>               
        </ul>
    </div>   

    <div class="signIn">
        <div class="form-container sign-in-container">
            <form class="formReg" id="form" action="" onsubmit="return false;"  method = "POST">
                <h1>Registracija</h1>
                <input type="text" placeholder="Korisničko ime" id="username" v-model="username" />
                <input type="text" placeholder="Ime" id="name" v-model="name"/>
                <input type="text" placeholder="Prezime" id="surname" v-model="surname"/>
                
                <div class="divv">
                    <label class="radio">
                        <input type="radio" name="rdo" id="muski" checked="checked" value="musko" v-model="gender"/><label for="muski">Muški</label>
                      </label>
                      
                      <label  class="radio">
                        <input type="radio" name="rdo" id="zenski" value="zensko" v-model="gender"/><label for="zenski">Ženski</label>
                      </label>
                      
                     
                </div>
                
                
                 
                
                <input type="password" placeholder="Lozinka" id="password" v-model="password"/>
                <input type="password" placeholder="Ponovi lozinku" id="password2" v-model="password2"/>
                <label v-if="passwordCheck" style="color:red">Lozinke se ne poklapaju!</label><br>
                <label v-if="showNotification" style="color:red">Korisničko ime već postoji!</label>
                <label v-if="genderCheck" style="color:red">Odaberite pol!</label>
                <button type="submit" id="signInButton"  v-on:click="register">Registruj se</button>
                
            </form>
        </div>
        
        <div class="overlay-container">
            <div class="overlay">               
                <div class="overlay-panel overlay-right">
                    <h1>Imaš nalog?</h1>
                    <p>Klikni ovde za prijavu!</p>
                    <button class="ghost" id="signUp" v-on:click="signIn">Prijavi se</button>
                </div>
            </div>
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
			
			if(this.username === null || this.username.length === 0) {	
				var pocrveni = document.getElementById("username");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
			}
			
			
			if(this.name === null || this.name.length === 0) {
				var pocrveni = document.getElementById("name");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
			} 
			
			if(this.surname === null || this.surname.length === 0) {
				var pocrveni = document.getElementById("surname");
				pocrveni.style.backgroundColor = "LightCoral"; 
				empty = true;
			} 
			
			if(this.password === null || this.password.length === 0) {
				var pocrveni = document.getElementById("password");
				pocrveni.style.backgroundColor = "LightCoral";
				empty = true;
			} else{
				var pocrveni = document.getElementById("password");
				pocrveni.style.backgroundColor = "#eee";
				
			}
			
			if((this.password2 === null || this.password2.length === 0 )) {
				var pocrveni = document.getElementById("password2");
				pocrveni.style.backgroundColor = "LightCoral";
				empty = true;
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
				axios.post('services/users/register',  {"username": '' + this.username ,"password" : this.password,
							"name": '' + this.name, "surname" : this.surname, "gender" : this.gender, "role" : this.role},{
								params:{username: this.username}		
					}).then(response => {
						if(response.status === 200){ 
							toast('Dobrodošli ' + this.name);
							this.$router.push({ name: 'homePage' })	
						}
						else if(response.status === 201){
							this.showNotification = true;
						}
						else{
							this.$router.push({ name: 'badRequest' })
						}
					});	
				}

		},
		
		signIn : function() {
				this.$router.push({ name: 'login' })
		}
	},
	mounted() {
		
	}
	
});