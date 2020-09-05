Vue.component("comments", {
	data : function() {
		return {
			activeUser : null,
			activeAdmin : false,
			activeHost : false,
			activeGuest : false,
			listOfComments : null
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
	        <ul>
	            <li id="onlyHomePage"><a href="#">Početna</a></li>
	            <li v-if="activeHost"><a href="#/reviewApartments">Moji apartmani</a></li>
	            <li v-if="activeAdmin"><a href="#/amenitiesChange">Apartmani</a></li>
                <li v-if="activeHost || activeAdmin"><a href="#/reservations">Rezervacije</a></li>
                <li v-if="activeHost || activeAdmin"  class="active"><a href="#/comments">Komentari</a></li>   
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

    <div class="verticalLineReservation"></div>

    <div class="sideComponents">      
        <ul class="ulForSideComponentsHostReservation">
            <div><li class="active"><a href="#">PREGLED KOMENTARA</a></li></div><br/>         
        </ul>
    </div>
    
    <div class="titleForUserReservationSelectedA">
		<h1 id="nameOfApartment2">Pregled komentara</h1>
        <a @click="cancelChangesButton" class="previousInComments">Poništi izmene</a>
		<a v-if="!activeAdmin" @click="saveChangesButton" class="saveChangeInComments">Sačuvaj izmene</a>
    </div> 

    <div class="listOfApartments">
        <div class="table-wrapper-comments">
                <table class="fl-table">
                    <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th class="comments">Komentar</th>
                        <th>Ocena</th>
                        <th class="visiblityForComment">Vidljivost</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="c in listOfComments" >
                        <td class="serialNumber"></td>
                        <td>{{c.text}}</td>
                        <td>{{c.grade}}</td>
                        <td>
                            <select v-model=c.visibility id="statusID" name="statusName">
                                <option value="vidljiv">Vidljiv</option>
                                <option value="sakriven" selected>Sakriven</option>
                            </select>
                        </td>
                    </tr> 
                    <tbody>
                </table>
            </div>
    </div>
	
	</div>
	
	`
	,
	methods : {
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
		
		saveChangesButton : function()
		   {
			   if (confirm('Da li ste sigurni da želite da sačuvate sve izmene?') == true) {
				
					axios.post('services/comments/saveChangedComments', this.listOfComments).then(response => {
						if(response.status === 200)
						{
							toast("Komentar je uspešno izmenjen!");
						}
						else{
							
							this.listOfComments = this.listOfComments;
						}
					});
			   
			   }
		   },
		   
		   cancelChangesButton : function() {
				if (confirm('Da li ste sigurni da želite da poništite sve izmene?') == true) {
					this.$router.go();
//					this.listOfComments = this.listOfComments; //probaj
				}
				
		   }
	},
	
	mounted() {
		axios.get('services/users/getActiveUser').then(response => {
			this.activeUser = response.data;
			
			if (this.activeUser.role === "admin"){
				this.activeAdmin = true;
			}else{
				this.activeAdmin = false;
			}		
												
			if (this.activeUser.role === "domacin"){
				this.activeHost = true;
				axios.get('services/comments/getAllCommentsForHost').then(response => {
					this.listOfComments = response.data;
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