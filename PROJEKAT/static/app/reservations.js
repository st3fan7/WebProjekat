Vue.component("reservations", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			listOfReservations : null,
			closeReservation : false
		}
	},
	template: `
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
                <li v-if="activeHost || activeAdmin"  class="active"><a href="#/reservations">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#">Komentari</a></li>   
                <li v-if="activeHost || activeAdmin"><a href="#/adminUsers">Korisnici</a></li>   
                <li v-if="activeGuest"><a href="#">Moje rezervacije</a></li>
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
            <h1>Pretraži rezervacije po:</h1>
            <input type="text" id="usernameID" name="usernameName" placeholder="Unesite korisničko ime...">          
        </div>

        <div class="price-title2">
            <h1 id="sort-text-in-user-reservation">Sortiraj po ceni:</h1>
            <form id="formForSort" action="#">
                
                    <select id="statusID" name="statusName">
                            <option value="rising">Rastuća</option>
                            <option value="falling">Opadajuća</option>
                        </select>
    
                    <div class="search-btn-user-reservation">
                        <button id="searchInUserReservation" type="submit">Sortiraj</button>
                    </div>
                </form>
        </div>

            <div class="filter-title">
                <h1>Filtriraj rezervacije po:</h1>
                <form id="formForFilter" action="#">
                
                    <select id="statusID" name="statusName">
                        <option value="created">Kreirana</option>
                        <option value="rejected">Odbijena</option>
                        <option value="accepted">Prihvaćena</option>
                        <option value="completed">Završena</option>
                    </select>
    
                    <div class="search-btn-user-reservation">
                        <button id="searchInUserReservation" type="submit">Filtriraj</button>
                    </div>
                </form>           
            </div>

    </div>

    <div class="titleForUserReservationSelectedA">
		<h1 id="nameOfApartment2">Rezervacije</h1>
        <a href="#" class="previousInReservation">&laquo; Nazad</a>
		<a href="#" class="saveChange">Sačuvaj izmene</a>
    </div> 

    <div class="listOfApartments">
        <div class="table-wrapper-reservations">
                <table class="fl-table">
                    <thead>
                    <tr>
						<th>Apartman</th>
                        <th>Korisnik</th>
                        <th>Početni datum</th>
                        <th>Broj noćenja</th>
                        <th>Ukupna cena</th>
                        <th>Status</th>
                        <th>Poruka pri rezervaciji</th>
                    </tr>
                    </thead>
                    <tbody>
            			<tr v-for="r in listOfReservations">
			                 <td>{{r.apartment}}</td>
			                 <td>{{r.guest}}</td>
			                 <td>{{r.startDate}}</td>
			                 <td>{{r.numberOfNight}}</td>
			                 <td>{{r.totalCost}}</td>	
			                 <td>                        
	                            <select v-model=r.status id="statusID" name="statusName">
	                                <option v-if="r.status === 'Kreirana'" value="Kreirana">Kreirana</option>
	                                <option v-if="r.status === 'Odbijena' || r.status === 'Kreirana' || r.status === 'Prihvacena'" value="Odbijena">Odbijena</option>
	                                <option v-if="r.status === 'Prihvacena' || r.status === 'Kreirana'" value="Prihvacena">Prihvaćena</option>
	                                <option v-if="(r.status === 'Zavrsena' || r.status === 'Prihvacena') && checkDate(r.startDate, r.numberOfNight) === true" value="Zavrsena">Završena</option>
	                                <option v-if="activeGuest && (r.status === 'Odustanak' || r.status === 'Prihvacena' || r.status === 'Kreirana')" value="Odustanak">Odustanak</option>
	                            </select>
                        	</td>
                        	<td class="tdbreak">{{r.messageForReservation}}</td>			                 
			             </tr>
                    </tbody>
                </table>
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
				this.$router.push({ name: 'reservations' })
			}
			
		}, 
		
		checkDate : function(startDate, numberOfNight) {
			
			let currentDateObj = new Date();
			let currentDate =  moment(String(currentDateObj)).format('DD.MM.YYYY. HH:mm')
			console.log("Danasnji datum: " + currentDate)

			var momentObj = moment(startDate, 'DD.MM.YYYY. HH:mm');
			var momentString = momentObj.format('DD.MM.YYYY. HH:mm'); 
			console.log("Datum iz fajla koji zadovoljava uslov: " + momentString)

			// splitovanje datuma iz fajla
			var parts = momentString.split('.');
			
			var timeParts = parts[3].substring(1).split(':'); // " HH:mm"
					
			// pravljenje datuma za kraj rezervacije
			
			var myDateObj =  new Date(parts[2], parts[1] - 1, parts[0], timeParts[0], timeParts[1]); // inicijalno vazi do 10 ujutru, pa mozda ne treba drugi split
			var now = moment(myDateObj);
			
			var newDateObj = new Date(now.format("YYYY-MM-DDTHH:mm:ssZ"));
			
			newDateObj.setDate(newDateObj.getDate() + numberOfNight);
			let lastDay =  moment(String(newDateObj)).format('DD.MM.YYYY. HH:mm')
			console.log('Datum do kog vazi rezervacija: ' + lastDay)
					
			return true;
		} ,
		getDate()
        {
            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            
            if(currentDate.getDate() < 10)
                day = '0' + currentDate.getDate();
            
            if(currentDate.getMonth() + 1 < 10)
                month = '0' + (currentDate.getMonth()+1);
            
            if(currentDate.getMinutes() < 10)
                minutes = '0' + currentDate.getMinutes();
            
            if(currentDate.getHours() < 10)
                hours = '0' + currentDate.getHours();

            return day + '.' + month + '.' + currentDate.getFullYear() + '. ' + hours + ':' + minutes;
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
	mounted() {
		this.listOfReservations = null;
		
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
			}else{
				this.activeAdmin = false;
			}		
												
			if (this.activeUser.role === "domacin"){
				this.activeHost = true;
				axios.get('services/reservations/getAllReservationsForHost').then(response => {
					this.listOfReservations = response.data;
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