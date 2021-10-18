<template>
    <div>
        <h2>login</h2>
        <form @submit.prevent="authenticate">
            <input type="text" required v-model="email" placeholder="email"><br>
            <input type="password" required v-model="pass" placeholder="password"><br>
            <p>Dont have an account? <router-link to="/">register</router-link></p>
            <button>Submit</button>
        </form>
    </div>
</template>

<script>

export default({
    data() {
        return {
            email : '',
            pass : '',
        }
    },
    methods :{
        async authenticate(){
            const credentials = {
                email : this.email,
                pass : this.pass
            };
            console.log(credentials);
            //TODO : backend calls
        },
    }
})

</script>