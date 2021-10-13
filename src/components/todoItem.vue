<template>
<div class="todo-item">
        <div>
            <div>
                <input type="text" v-if="!flag" placeholder="task" v-model="edittodo" @keyup.enter="editTodo(index)" :id="id" @blur="editTodo(index)" @keyup.esc="cancelEdit(index)">    
            </div> 
            <div class="todo-items">
                <div v-if="todo.flag" @change="toggleComplete(index)">
                    <input type="checkbox" :checked="todo.isComplete">  
                </div>
                <div v-if="flag" @click="enableTodo(index)" :class="{ complete : todo.isComplete }">
                    {{data}}
                </div>        
            </div> 
        </div>
        <div @click="removeTodo(index)" class="removeItemBtn">
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
        removeTodo(index){
            this.$emit('removedTodo' , index);
        },
        editTodo(index){
            this.$emit('editTodo',index,this.edittodo);
            if(this.edittodo.trim().length != 0) this.data = this.edittodo;
            this.flag = true;
            this.edittodo = '';
        },
        enableTodo(index){
            this.flag = false;
        },
        toggleComplete(index){
            this.$emit('toggleComplete',index);
        },
        cancelEdit(index){
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