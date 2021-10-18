<template>
    <div>
        <h1>register</h1>
        <form @submit.prevent="submitBtn">
            <input type="text" required v-model="email" placeholder="email"><br>
            <input type="password" required v-model="pass" placeholder="password"><br>
            <p>already a user? <router-link to="/login">login</router-link></p>
            <button>Submit</button>
        </form>
    </div>
</template>

<script>

export default({
    data() {
        return {
            email : '',
            pass : ''
        }
    },
    methods :{
        submitBtn(){
            const credentials = {
                email : this.email,
                pass : this.pass
            };
            console.log(credentials);
            //TODO : backend calls
        },
        redirect(){
            this.$router.push('/login');
        }
    }
})

</script>
