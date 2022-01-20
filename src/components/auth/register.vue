<template>
    <div class="form-container">
        <div class="sign-in-form">
            <div class="title">
                <h2>Sign Up</h2>
            </div>
            <div class="register-form">
                <form @submit.prevent="submitBtn">
                    <div class="user-details">
                        <div class="input-box">
                            <label for="username">
                                <i class="giveSize fas fa-user"></i>
                            </label>
                            <input type="text" required v-model="username" placeholder="Username" name="username">
                        </div>
                        <div class="input-box">
                            <label for="email">
                                <i class="giveSize fas fa-envelope"></i>
                            </label>
                            <input type="text" required v-model="email" placeholder="Email" name="email">
                        </div>
                        <div class="input-box">
                            <label for="password">
                                <i class="giveSize fas fa-lock"></i>
                            </label>
                            <input type="password" required id="pass" v-model="password" placeholder="Password" name="password">
                            <label for="repeatPassword" @click="togglePassword('pass')">
                                <i class="visibility fas fa-eye"></i>
                            </label>
                        </div>
                        <div class="input-box">
                            <label for="repeatPassword">
                                <i class="giveSize fas fa-lock" style="color:grey;"></i>
                            </label>
                            <input type="password" required id="repeatPass" v-model="repeatPassword" placeholder="Repeat Password" name="repeatPassword">
                            <label for="repeatPassword" @click="togglePassword('repeatPass')">
                                <i class="visibility fas fa-eye"></i>
                            </label>
                        </div>
                        <div class="from-group form-button">
                            <input type="submit" name="signup" id="signup" class="submit-btn" value="Sign Up">
                        </div>
                        <div class="account-link">
                            <p>Dont have an account? <router-link to="/login">login</router-link></p>
                        </div>
                        </div>
                </form>
            </div>
        </div>
        <div class="imageSection">
            <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg">
        </div>
    </div>
</template>

<script>

export default({
    data() {
        return {
            email : '',
            password : '',
            username : '',
            repeatPassword : '',
        }
    },
    methods :{
        submitBtn(){
            const credentials = {
                username : this.username,
                password : this.password,
                email : this.email,
            };
            if(this.password != this.repeatPassword){
                this.password = '';
                this.repeatPassword = '';
                alert('password do not match');
                return;
            }  
            console.log(credentials);
            //TODO : backend calls
            this.$store.dispatch('register' , credentials);
            this.$router.push('/todo');
        },
        togglePassword(id){
            let x = document.getElementById(id);
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    }
})

</script>

<style scoped>

    .visibility{
        font-size: 15px;
        position : absolute;
        right : 0;
        top : 25%;
    }

</style>
