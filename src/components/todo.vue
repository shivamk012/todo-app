<template> 
    <div class="header">
        <input type="text" placeholder="what needs to be done" class="inputField" @keyup.enter="addItem" v-model="newTodo">
        <todoItem
            v-for = "(item,i) in cachedTodoList"
            :key = "item.id"
            :todo = "item"
            :index = "i"
            @removedTodo = "removeItem"
            @editTodo = "editItem"
            @toggleComplete = "toogleComplete"
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
            editTodo : '',
            cur : 0, // stores the current add postion of element 
            todoList : [],
            choice : 1,
        }
    },
    computed :{
        itemRemaining(){
            return this.todoList.filter(todo => !todo.isComplete).length;
        },
        anyRemaining(){
            return this.itemRemaining == 0;
        },
        cachedTodoList(){
            if(this.choice == 1){
                return this.todoList;
            }
            else if(this.choice == 2){
                return this.todoList.filter(todo => !todo.isComplete);
            }
            else if(this.choice == 3){
                return this.todoList.filter(todo => todo.isComplete);
            }
            return this.todoList;
        }
    },
    methods :{
        addItem(){
            if(this.newTodo.trim().length === 0) {
                return;
            }
            this.todoList.push({
                id : this.cur, //unique id of element
                data : this.newTodo, //stores task name
                isComplete : false, // stores trye if task is completed
                flag : true //stores false if element is in edit mode else true 
            });
            this.newTodo = '';
            this.cur = this.cur+1;
        },
        removeItem(index){  
            this.todoList.splice(index,1);
        },
        editItem(index , edittodo){
            if(edittodo.trim().length === 0) {
                return;
            }
            this.todoList[index].data = edittodo;
            this.todoList[index].flag = true; 
            let temp = this.todoList[index].isComplete;
            this.todoList[index].isComplete = false; 
        },
        toogleComplete(index){
            this.todoList[index].isComplete = !this.todoList[index].isComplete;
        },
        toggleAll(){
            this.todoList.forEach((todo) => (
                todo.isComplete = event.target.checked
            ));
        },
        filterList(userList){
            this.choice = userList;
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