<template> 
    <div class="header">
        <input type="text" placeholder="what needs to be done" class="inputField" @keyup.enter="addItem" v-model="newTodo">
        <todoItem
            v-for = "(item,i) in cachedTodoList"
            :key = "item.id"
            :todo = "item"
            :index = "i"
        > 
            
        </todoItem>
        <div class="itemsLeft">
            <div>
                <input type="checkbox" @change="toggleAll" :checked="anyRemaining">
                <label>Check All</label>
            </div>
            <div class="itemsLeft">
                <div>
                    <button @click="filterList(1)">all</button>
                </div>  
                <div @click="filterList(2)">
                    <button>active</button>
                </div>
                <div @click="filterList(3)">
                    <button>completed</button>
                </div>
            </div>
            <div class="itemsLeft">
                <div> {{ itemRemaining }} </div>
                <div> Items left  </div>
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
        }
    },
    methods :{
        addItem(){
            if(this.newTodo.trim().length === 0) {
                return;
            }
            let temp = {
                id : this.cur, //unique id of element
                data : this.newTodo, //stores task name
                isComplete : false, // stores trye if task is completed
                flag : true //stores false if element is in edit mode else true
            };
            this.$store.commit('addTodo',temp);
            this.newTodo = '';
            this.cur = this.cur+1;
        },
        toggleAll(){
            this.$store.state.todoList.forEach((todo) => (
                todo.isComplete = event.target.checked
            ));
        },
        filterList(userChoice){
            this.$store.commit('updateFilter',userChoice);
        }
    },
}
</script>

<style scoped>
    .header{
        width : 50%;
        padding-left : 25%;
    }

    .inputField{
        width : 100%;
        height : 40px;
        border: 0.5px solid black;
        border-radius: 4px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    .itemsLeft{
        display: flex;
        justify-content: space-between;
    }
</style>