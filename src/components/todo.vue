<template> 
    <div class="container">
        <h1 class="heading"> {{date}} </h1>
        <div class="input-container">
            <input type="text" placeholder="what needs to be done" class="input-field"  @keyup.enter="addItem" v-model="newTodo">
            <button @click="addItem" class="input-button">Add</button>
        </div>
        <!-- <hr style="width : 75%; color:rgba(175, 47, 47, 0.15);"> -->
        <div class="todo">
            <todoItem
                v-for = "(item,i) in cachedTodoList"
                :key = "item.id"
                :todo = "item"
                :index = "i"
            > 
                
            </todoItem>
        </div>
        <div class="checkAll-btn">
            <div class="btn">
                <div>
                    <input class="todoItem-checkbox" name="checkAll" type="checkbox" @change="toggleAll" :checked="anyRemaining" style="padding : auto 10px;">
                </div>
                <div>Check All</div>
            </div>
            <div class="itemsLeft">
                <div style="margin:0px 5px;"> {{ itemRemaining }} </div>
                <div> items left </div>
            </div>
        </div>  
        <div class="button-grp">            
            <div class="all-btn">
                <div>
                    <button class="input-button" @click="filterList(1)" style="margin-left : 10px;margin-right:10px; border-radius : 10px;">all</button>
                </div>  
                <div @click="filterList(2)">
                    <button class="input-button" style="border-radius : 10px;margin-right : 10px;">active</button>
                </div>
                <div @click="filterList(3)">
                    <button class="input-button" style="border-radius : 10px;">completed</button>
                </div>
            </div>
        </div>
    </div>     
</template> 

<script>
import todoItem from './todoItem.vue'

export default {
    name : 'todoApp',
    components :{
        todoItem,
    },
    data() {
        return {
            newTodo : '',
            cur : 0, // stores the current add postion of element 
        }
    },
    computed :{
        itemRemaining(){
            return this.$store.getters.itemRemaining;
        },
        anyRemaining(){
            return this.$store.getters.anyRemaining;
        },
        cachedTodoList(){
            return this.$store.getters.cachedTodoList;
        },
        date(){
            const today = new Date();
            const num = today.getDay()+1;
            return this.dayList(num)+ " " + today.getDate();
        },
    },
    methods :{
        dayList(num){
            console.log(num);
            const map1 = new Map();
            map1.set(1, "Sunday" );  
            map1.set(2 ,"Monday");  
            map1.set(3 , "Tuesday");  
            map1.set(4,"Wednesday");  
            map1.set(5 , "Thursday" );  
            map1.set(6 , "Friday");  
            map1.set(7 , "Saturday"); 
            console.log(map1.get(num)); 
            return map1.get(num);
        },
        addItem(){
            if(this.newTodo.trim().length === 0) {
                return;
            }
            let temp = {
                id : this.cur, //unique id of element
                
                data : this.newTodo, //stores task name
                isComplete : false, // stores trye if task is completed
                flag : true, //stores false if element is in edit mode else true
                isEdit : false,
            };
            this.$store.dispatch('add',temp); // calling addTodo function in mutations
            this.newTodo = '';
            this.cur = this.cur+1;
        },
        toggleAll(){
            this.$store.todoList.forEach(todo => {
                todo.isComplete = event.target.checked;
                this.$store.dispatch('Complete' , {
                    id : todo.id,
                    isComplete : event.target.checked,
                })
            });
        },
        filterList(userChoice){
            this.$store.commit('updateFilter',userChoice); // calling updateFilter function in mutations
        }
    },
}
</script>

<style scoped>
    
    input[type="checkbox"] {
        background-color: initial;
        cursor: default;
        appearance: auto;
        box-sizing: border-box;
        /* margin: 3px 3px 3px 4px; */
        padding: initial;
        border: initial;
    }

    .todoItem-checkbox{
        position: relative;
        margin-right: 30px;
        display: inline-block;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
    }
    
    .container{
        padding-top: 47px;
        padding-bottom: 87px;
        width: 900px;
        background: #fff;
        margin: 0 auto;
        box-shadow: 0 15px 16.83px 0.17px rgb(0 0 0 / 5%);
        border-radius: 20px;
    }

    .heading {
        /* font-size: 100px;
        text-align: center;
        color: rgba(175, 47, 47, 0.15); */
        /* -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility; */
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        margin-top : -5px;
        font-size: 80px;
    }

    .input-container {
        /* width : 75%; */
        /* display:flex; */
        
        /* This bit draws the box around it */

        /* I've used padding so you can see the edges of the elements. */
        /* margin : auto; */
            width: 75%;
    -webkit-box-shadow: 0 5px 40px 10px rgb(0 0 0 / 10%);
    box-shadow: 0 5px 40px 10px rgb(0 0 0 / 10%);
    overflow: hidden;
    border-radius: 8px;
    margin : auto;
    /* display: -webkit-box; */
    /* display: -ms-flexbox; */
    display: flex;
    }
          
    /* input {
        margin: 0px;
        padding: 0px;
        width: 100%;
        outline: none;
        height: 30px;
        border-radius: 5px;
    } */
        
    .input-button {
        /* cursor: pointer;
        background: #007bff;
        color: white;
        height: 50px;
        border: 2px solid rgb(230, 219, 219);
        border-radius: 5px;
        border-left: none;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        box-sizing: border-box;
        box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
        margin: auto auto 15px auto;
        padding: 8px;
        outline: none; */
            display: inline-block;
            background : #007bff;
            color : white;
        border: none;
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        text-transform: uppercase;
        cursor : pointer;
    }

    .input-field{
        /* border: none; */
        /* height: 50px;
        padding: 8px;
        margin: auto auto 15px auto;
        border: 2px solid rgb(230, 219, 219);
        border-radius: 5px;
        outline: none;
        box-sizing: border-box;
        box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
        border-right: none;
        border-top-right-radius: 0px;   
        border-bottom-right-radius: 0px; */
                height: 50px;
    border: none;
    font-family: inherit;
    padding: 20px;
    font-size: 18px;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    }

    .input-field:focus{
        border-color: dodgerblue;
        box-shadow: 0 0 2px 0 dodgerblue;
    }

    .todo {
        /* background: #e8e8e8; */
        /* box-shadow: 0 15px 16.83px 0.17px rgb(0 0 0 / 5%); */
        /* background: #f8f8f8;
        border-radius: 4px;
        max-width : 75%;
        margin : 0 auto;
        padding: 5px; */

        border-radius: 8px;
        width : 75%;
    margin: 20px auto;
    -webkit-box-shadow: 0 5px 40px 10px rgb(0 0 0 / 10%);
    box-shadow: 0 5px 40px 10px rgb(0 0 0 / 10%);
    overflow: hidden;
    }

    .checkAll-btn{
        margin:auto;
        width : 75%;
        font-size:15px;
        display : flex;
        justify-content: space-between;
    }

    .btn{
        display : -webkit-box;
        left:0px;
    }

    .itemsLeft{
        display : -webkit-box
    }

    .all-btn{
        width : 75%;
        display : -webkit-box;
        margin : auto;
    }
</style>