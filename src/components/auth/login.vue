<template>
    <div class="form-container">
        <div class="imageSection">
            <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg">
        </div>
        <div class="sign-in-form">
            <div class="title">
                <h2>Sign In</h2>
            </div>
            <div class="register-form">
                <form @submit.prevent="authenticate">
                    <div class="user-details">
                        <div class="input-box">
                            <label for="username">
                                <i class="giveSize fas fa-user"></i>
                            </label>
                            <input type="text" required v-model="username" placeholder="Username" name="username">
                        </div>
                        <div class="input-box">
                            <label for="password">
                                <i class="giveSize fas fa-lock"></i>
                            </label>
                            <input type="password" required v-model="pass" placeholder="Password" name="password">
                        </div>
                    </div>
                    <div class="from-group form-button">
                        <input type="submit" name="signin" id="signin" class="submit-btn" value="Log in">
                    </div>
                    <div class="account-link">
                        <p>Dont have an account? <router-link to="/">register</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default({  
    data() {
        return {
            username : '',
            pass : '',
        }
    },
    methods :{
        async authenticate(){
            const credentials = {
                username : this.username,
                password : this.pass
            };
            //TODO : backend calls
            await this.$store.dispatch('login' , credentials);
            console.log(this.$store.state.token);
            if(this.$store.state.token != null ) this.$router.push('/todo');
        },
    }
})

</script>

<style>
    .form-container{
        padding-top: 67px;
        padding-bottom: 87px;
        display : flex;
        justify-content: center;
        align-items: center;
        width: 900px;
        background: #fff;
        margin: 0 auto;
        box-shadow: 0 15px 16.83px 0.17px rgb(0 0 0 / 5%);
        border-radius: 20px;
    }

    .sign-in-form{
        margin-right: 90px;
        margin-left: 80px;
    }

    .title{
        margin-bottom: 33px;
    }

    .imageSection{
        margin-left: 110px;
        margin-right: 20px;
        margin-top: 10px;
    }

    form {
        display: block;
        margin-top: 0em;
    }

    .register-form {
        width: 100%;
    }

    .user-details{
        position: relative;
        margin-bottom: 25px;
        overflow: hidden;
    }

    .input-box{
        display: inline-block;
        position: relative;
        margin-bottom : 30px;
    }

    .giveSize{
        font-size: 15px;
        position : absolute;
        left : 2%;
        top : 25%;
    }

    input {
        width: 100%;
        display: block;
        border: none;
        border-bottom: 1px solid #999;
        padding: 6px 30px;
        font-family: 'Poppins', sans-serif; 
        box-sizing: border-box;
        outline: none;
    }

    .form-group:last-child {
        margin-bottom: 0;
    }
    
    .form-group {
        position: relative;
        margin-bottom: 25px;
        overflow: hidden;
    }

    .submit-btn{
        display: inline-block;
        background: #6dabe4;
        color: #fff;
        border-bottom: none;
        width: auto;
        padding: 15px 39px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        -o-border-radius: 5px;
        -ms-border-radius: 5px;
        margin-top: 25px;
        cursor: pointer;
    }

    .account-link{
        font-size: 14px;
        color: #222;
        display: block;
        text-align: center;
        margin-top : 60px;
    }
</style>