function toLatinConvert(string) {
    var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
    var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')

    return string.split('').map(function(char) {
      var index = cyrillic.indexOf(char)
      if (!~index)
        return char
      return latin[index]
    }).join('')
}

Vue.component("homePage", {
	data: function (){
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			dateFromModel : null,
			dateToModel : null,
			locationModel : '',
			priceModel : '',
			roomsModel : '',
			guestsModel : '',
			searchedApartments : [],
			places : null,
		    city : '',
		    country : '',
		    address: '',
		    addressModel : ''
		}
	},
	template:`
	<div class="bg" >

	    <div class="logoAndName">
	        <div class="logo">        
	            <img src="pictures/clipart302388.png"/>
	        </div>
	        <div class="webName">
	            <h3>BookingApp</h3>
	        </div>  
	    </div>
	
	    <div class="main">
	        <ul>
	            <li id="onlyHomePage" class="active"><a href="#">Početna</a></li>
	            <li v-if="activeHost"><a href="#/reviewApartments">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#/amenitiesChange">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/reservations">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/comments">Komentari</a></li>   
                <li v-if="activeHost || activeAdmin"><a href="#/adminUsers">Korisnici</a></li>   
                <li v-if="activeGuest"><a href="#/reservations">Moje rezervacije</a></li>
	        </ul>
	    </div>
	    
	    <div class="quote">
	        <h2>Samo oni koji će rizikovati da odu predaleko 
	            <br/> mogu da otkriju koliko daleko može da se ode!
	        </h2>
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
	
	    <div class="search">
	        <form>
	            <h1>Gde putujete?</h1>
	            <div class="form-box">
	                <input v-model="dateFromModel" type="date" class="search-field date" placeholder="Od datuma">
	                <input v-model="dateToModel" type="date" class="search-field date" placeholder="Do datuma">
	               
	              <!-- <input v-model="locationModel" type="text" class="search-field location" placeholder="Lokacija (Grad, Država)"> -->
	              <!--  <input id="address" v-model="addressModel" placeholder="Lokacija (Grad, Država)" type="search" >
	              -->
                   
                    
                    <input type="search" style="margin-top:-0.9em; border-radius:25px; height:3.3em;" class="form-control" id="autocomplete-dataset"  placeholder="Grad i/ili država"></input>
                    <input id="city" hidden>
                    <input id="country" hidden>
                    
	                <input v-model="priceModel" type="text" class="search-field price" placeholder="Cena (Od-Do)">
	                <input v-model="roomsModel" type="text" class="search-field rooms" placeholder="Broj soba (Od-Do)">
	                <input v-model="guestsModel" type="text" class="search-field persons" placeholder="Broj osoba">
	                <button class="search-btn" type="button" @click="search()">Pretraži</button>
	            </div>
	        </form>
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
				this.$router.push({ name: 'homePage' })
			}
			
		},
		
		search : function() {
			
			
			this.city = toLatinConvert(document.querySelector('#city').value);
			this.country = toLatinConvert(document.querySelector('#country').value);
			
		if(this.country === "Serbia"){
				this.country = "Srbija";
			}
			
			if(this.country === "Macedonia"){
				this.country = "Makedonija";
			}
			
			if(this.city === "Belgrade"){
				this.city = "Beograd";
			}
			
			console.log(this.city)
			console.log(this.country)
			
			
			axios.get('services/apartments/getSearchedApartments', {params : {"dateFrom" : this.dateFromModel, "dateTo" : this.dateToModel,
				"city" : '' + this.city, "country" : '' + this.country, "price" : '' + this.priceModel, "rooms" : '' + this.roomsModel, "guests" : '' + this.guestsModel }})
			.then(response => {
				if(response.status === 200) {
					this.searchedApartments = response.data;
				} else {
					this.searchedApartments = [];
				}
				
				this.$router.push({ name: 'searchedApartments', params : {searchedApartments : this.searchedApartments}});
				
			});
			
			
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
					

			});	
				/*
			this.places = places({
				appId: 'plQ4P1ZY8JUZ',
				apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
				container: document.querySelector('#address'),
				templates: {
						value: function(suggestion){
							return suggestion.name;
					}
				  }
				}).configure({
						type: "city,country",
					    language: 'srb',
					    hitsPerPage: 5
			});
			
			this.places.on('change', function getLocationData(e){
				
				
				document.querySelector('#city').value = e.suggestion.value || '';
				document.querySelector('#country').value = e.suggestion.country || '';
				//document.querySelector('#number').value = e.suggestion.number || '';

			
			});
			*/
				(function() {
			        // create the country dataset from places
			        // we automatically inject the default CSS
			        // all the places.js options are available
			        var placesCountry = placesAutocompleteDataset({
			          algoliasearch: algoliasearch,
			          templates: {
			            header: '<div class="ad-example-header">Države</div>',
			            footer: '<div class="ad-example-footer"/>'
			          },
			          hitsPerPage: 3,
			          type: ["country"],
			          language: 'srb',
			          getRankingInfo: true
			        });

			        // create the city dataset from places
			        // we automatically inject the default CSS
			        // all the places.js options are available
			        var placesCity = placesAutocompleteDataset({
			          algoliasearch: algoliasearch,
			          templates: {
			            header: '<div class="ad-example-header">Gradovi</div>'
			          },
			          hitsPerPage: 5,
			          type: ["city"],
			          language: 'srb',
			          getRankingInfo: true
			        });

			        // init
			        var autocompleteInstance = autocomplete(
			          document.querySelector("#autocomplete-dataset"),
			          {
			            hint: false,
			            debug: true,
			            cssClasses: { prefix: "ad-example" }
			          },
			          [placesCountry, placesCity]
			        );

			        var autocompleteChangeEvents = ["selected", "close"];

			        autocompleteChangeEvents.forEach(function(eventName) {
			          autocompleteInstance.on("autocomplete:" + eventName, function(
			            event,
			            suggestion,
			            datasetName
			          ) {
			            //console.log(datasetName, suggestion);
			         //   console.log(suggestion)
			            
			            
			            if(suggestion.type === 'city'){
			            	  document.querySelector('#city').value = suggestion.name || '';
							  document.querySelector('#country').value = suggestion.country || '';
			            }else if(suggestion.type === 'country'){
			            	document.querySelector('#city').value = '';
							document.querySelector('#country').value = suggestion.value || '';
			            }
		          
			          });
			        });

			        document.querySelector("#autocomplete-dataset").on("change", evt => {
			          console.log(evt, "?");
			        });
			        
			        console.log(suggestion)
			        
			      })();
			
			
	}
	
});