<template>
<div class="todo-item">
        <div>
            <div>
                <input type="text" v-if="!flag" placeholder="task" v-model="edittodo" @keyup.enter="editTodo(id)" :id="id" @blur="editTodo(id)" @keyup.esc="cancelEdit()">    
            </div> 
            <div class="todo-items">
                <div v-if="flag" @change="toggleComplete(id)">
                    <input type="checkbox" :checked="todo.isComplete">  
                </div>
                <div v-if="flag" @click="enableTodo(index)" :class="{ complete : todo.isComplete }">
                    {{data}}
                </div>        
            </div> 
        </div>
        <div @click="removeTodo(id)" class="removeItemBtn">
            &times;
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            id : this.todo.id,
            data : this.todo.data,
            isComplete : this.todo.isComplete,
            flag : this.todo.flag,
            edittodo : ''
        }
    },
    props :{
        todo : {
            type : Object ,
            required : true
        },
        index :{
            type : Number,
            required : true
        }
    },
    methods :{
        removeTodo(id){
            this.$store.dispatch('deleteItem',{
                id : id,
                index : this.index,
            });
        },
        editTodo(id){
            if(this.edittodo.trim().length === 0) {
                return;
            }
            this.$store.dispatch('updateItem',{
                id : id ,
                edit : this.edittodo,
                index : this.index,
            });
            
            this.data = this.edittodo;
            this.flag = true;
            this.edittodo = '';
        },
        enableTodo(){
            this.flag = false;
        },
        toggleComplete(id){
            this.$store.dispatch('Complete',{
                id : this.id ,
                index : this.index,
                isComplete : !this.isComplete, 
            });
            this.isComplete = !this.isComplete;
        },
        cancelEdit(id){
            if(this.edittodo.trim().length === 0) {
                return;
            }
            this.edittodo = '';
            this.flag = true;
        }
    }
}
</script>
  
<style scoped>
    .todo-item{
        display: flex;
        justify-content: space-around;
    }
    .removeItemBtn{
        cursor: pointer;;
    }

    .complete{
        text-decoration: line-through;
    }

    .todo-items{
        display: flex;
        justify-content: space-around;
    }

</style>