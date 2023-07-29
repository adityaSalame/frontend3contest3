//console.log('test');
document.getElementById("continue").addEventListener("click",profileDisplay);
document.getElementById("logoutBtn").addEventListener("click", logout);
function profileDisplay(){
    let p1=document.getElementById("password-input").value;
    let p2=document.getElementById("confirm-password-input").value;
    let name=document.getElementById("name-input").value;
    let email=document.getElementById("email-input").value;
    console.log(p1,p2);
    if(p1==""||p2==""||name==""||email==""){
        document.getElementById("fields").style.visibility="visible";
        
    }
    else if(p1!=p2){
        alert("password does not match");
        return;
    }
    
    else if(p1==p2){
        display();
    }
}
function display(){
    

    let name=document.getElementById("name-input").value;
    let email=document.getElementById("email-input").value;
    
    let password=document.getElementById("confirm-password-input").value;
    const accessToken = generateAccessToken();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userDetails', JSON.stringify({ name, email, accessToken, password }));
    window.location.href="/profile.html";
    
}

function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 16;
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
}

function logout(){
    console.log(accessToken);
    localStorage.removeItem('accessToken');
  localStorage.removeItem('userDetails');

  // Redirect to the signup page
  window.location.href = '/index.html';
}

if (window.location.pathname.includes('profile.html')) {
    checkLoginStatus();
}

function checkLoginStatus() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Redirect to the signup page if not logged in
      window.location.href = '/index.html';
    } else {
      // Display user details on the profile page
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const profileData = document.getElementById('profile');
      profileData.innerHTML = `
        
            <div class="profile">Profile</div>
            <div class="head"><img src="./Vector.png"></div>
            <div class="body"><img src="./Vector (1).png"></div>
            <div id="name">
                <div id="nameget">Full Name : ${userDetails.name}</div>
            </div>
            <div id="email">
                <div id="emailget">Email : ${userDetails.email}</div>
            </div>
            <div id="token">
                <div id="tokenget">Token : ${userDetails.accessToken}</div>
            </div>
            <div id="password">
                <div id="passwordget">Password : ${userDetails.password}</div>
            </div>

      
      `;

    }
    


  }