<script>
import axios from 'axios';

export default {
  setup() {
    function login() {
      var id = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      axios.post('http://localhost/api/member/' + id, {
          id : id,
          password : password,
          userName: "",
          email: "",
      }).then(response => {
            console.log(response);
          if (response.data) {
              localStorage.setItem('token', response.data);
              alert("로그인 성공")
          }
          else {
              alert("로그인 실패")
          }
      }).catch(error => {
          console.error('Error:', error);
      });
    }

    return {
      login
    };
  }
}
</script>
<template>
    <div id="container">
        <div class="login-container">
            <div class="logo">LOGIN</div>
            <form class="login-form">
                <div class="form-group">
                    <label for="username">ID</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">PASSWORD</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <button type="button" class="login-button" @click.prevent="login">LOGIN</button>
                </div>
                <!-- <GoogleLogin class="google-login-button"/> -->
            </form>
        </div>
    </div>
</template>
  
<style scoped>
#container {
    height: 60vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-50%);
    top: 50%;
    position: relative;
    transition: box-shadow 0.3s ease-in-out;
}

.login-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.logo {
    font-size: 36px;
    color: #3b854e;
    margin-bottom: 30px;
}

.login-form {
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 16px;
    transition: border-color 0.2s;
}

.form-group input:focus {
    outline: none;
    border-color: #5ea15d;
}

.login-button {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background-color: #5ea15d;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
    background-color: #3b854e;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

/* .google-login-button {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background-color: #695da1;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */
</style>
  