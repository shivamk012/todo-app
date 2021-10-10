<template> 
    <div class="header">
        <input type="text" placeholder="what needs to be done" class="inputField" @keyup.enter="addItem" v-model="newTodo">
        <div
            v-for = "(item,index) in cachedTodoList"
            :key = "item.id"
            class = "todo-item"
        > 
            <div>
                <div>
                    <input type="text" v-if="!flag[index]" placeholder="task" v-model="editTodo" @keyup.enter="editItem(index)" :id="item.id" @blur="editItem(index)" @keyup.esc="cancelEdit(index)">    
                </div> 
                <div class="todo-items">
                    <div v-if="flag[index]" @click="toogleComplete(index)">
                        <input type="checkbox" :checked="item.isComplete">  
                    </div>
                    <div v-if="flag[index]" @click="enableItem(index)" :class="{ complete : item.isComplete }">
                        {{item.data}}
                    </div>        
                </div> 
            </div>
            <div @click="removeItem(index)" class="removeItemBtn">
                &times;
            </div>
        </div>
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
export default {
    name : 'todoApp',
    data() {
        return {
            newTodo : '',
            editTodo : '',
            cur : 0,
            flag : [],
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
                id : this.cur,
                data : this.newTodo,
                isComplete : false
            });
            this.flag[this.cur] = true;
            this.newTodo = '';
            this.cur = this.cur+1;
        },
        removeItem(index){  
            this.todoList.splice(index,1);
        },
        enableItem(index){
            this.flag[index] = false;
        },
        editItem(index){
            if(this.editTodo.trim().length === 0) {
                return;
            }
            this.todoList[index].data = this.editTodo;
            this.editTodo = '';
            this.flag[index] = true; 
            let temp = this.todoList[index].isComplete;
            this.todoList[index].isComplete = false; 
        },
        cancelEdit(index){
            if(this.editTodo.trim().length === 0) {
                return;
            }
            this.editTodo = '';
            this.flag[index] = true;
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

    .todo-item{
        display: flex;
        justify-content: space-around;
    }

    .removeItemBtn{
        cursor: pointer;;
    }

    .todo-items{
        display: flex;
        justify-content: space-around;
    }

    .complete{
        text-decoration: line-through;
    }

    .itemsLeft{
        display: flex;
        justify-content: space-between;
    }
</style>