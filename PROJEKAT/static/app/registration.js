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
			showNotification : false
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
                        <input type="radio" name="rdo" id="muski" checked="checked" id="genderM" v-model="genderM"/>Muški
                      </label>
                      
                      <label  class="radio">
                        <input type="radio" name="rdo" id="zenski" v-model="username" id="genderF" v-model="genderF"/>Ženski
                      </label>
                </div>
                 
                
                <input type="password" placeholder="Lozinka" id="password" v-model="password"/>
                <input type="password" placeholder="Ponovi lozinku" id="password2" v-model="password2"/>
                <button type="submit" id="signInButton"  v-on:click="register">Registruj se</button>
                <label v-if="showNotification" style="color:red">Korisničko ime već postoji!</label>
            </form>
        </div>
        
        <div class="overlay-container">
            <div class="overlay">               
                <div class="overlay-panel overlay-right">
                    <h1>Imaš nalog?</h1>
                    <p>Klikni ovde za prijavu!</p>
                    <button class="ghost" id="signUp" v-on:click="singIn">Prijavi se</button>
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
			
			if(this.username === null || this.username.length === 0) {
				document.getElementById("username").setAtribute("style", "border-color:red");
				empty = true;
			} else {
				document.getElementById("username").setAtribute("style", "border-color:red");
			}
			
			if(this.name === null || this.name.length === 0) {
				document.getElementById("name").setAtribute("style", "border-color:red");
				empty = true;
			} else {
				document.getElementById("name").setAtribute("style", "border-color:red");
			}
			
			if(this.surname === null || this.surname.length === 0) {
				document.getElementById("surname").setAtribute("style", "border-color:red");
				empty = true;
			} else {
				document.getElementById("surname").setAtribute("style", "border-color:red");
			}
			
			if(this.password === null || this.password.length === 0) {
				document.getElementById("password").setAtribute("style", "border-color:red");
				empty = true;
			} else {
				document.getElementById("password").setAtribute("style", "border-color:red");
			}
			
			if((this.password2 === null || this.password2.length === 0 ) && this.password2 === this.password) {
				document.getElementById("password2").setAtribute("style", "border-color:red");
				empty = true;
			} else {
				document.getElementById("password2").setAtribute("style", "border-color:red");
			}
			
			
			if(empty === false){		
				axios.post('services/users/register',  {"username": + this.username ,"password" : this.password,
							"name": + this.name, "surname" : this.surname, "gender" : this.gender, "role" : this.role},{
								params:{username: this.username}		
					}).then(response => {
						if(response.status === 200){ 
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
		
		singIn : function() {
				this.$router.push({ name: 'login' })
		}
	},
	mounted() {
		
	}
	
});