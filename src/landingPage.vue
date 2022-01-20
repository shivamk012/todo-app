<template>
    <div class="page">
        <!-- <h1 v-if="isLoggedIn">Welcome {{ user }}</h1>
        <ul class="bar">
            <li>home</li>
            <li v-if="!isLoggedIn" class="changeCursor"  @click="gotoRegister">register</li>
            <li v-if="!isLoggedIn" class="changeCursor"  @click="gotoLogin">login</li>
            <li v-if="isLoggedIn" class="changeCursor" @click="logout">logout</li>
            <li v-if="isLoggedIn" class="changeCursor"  @click="gotoTodo">todo</li>
        </ul>  -->
        <router-view></router-view>
    </div>
</template>

<script>
export default({
    data() {
        return {
            user : '',
        }
    },
    computed : {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        user(){
            if(this.isLoggedIn) return this.$store.getUser;
        },
    },
    methods :{
        logout(){
            this.$store.commit('logout');
            this.$router.push('/login');
        },
        gotoRegister(){
            this.$router.push('/');
        },
        gotoLogin(){
            this.$router.push('/login');
        },
        gotoTodo(){
            this.$router.push('/todo');
        },
    },
})
</script>

<style scoped>
    .page{
        height : 100vh;
        background-color : #f8f8f8;
        /* backdrop-filter: blur(5px); */
        /* background-size: contain;  */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* .bar{
        display: flex;
        justify-content :space-between;
        list-style: none;   
    }

    .changeCursor{
        cursor:grabbing;
    } */
</style>