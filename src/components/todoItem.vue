<template>
<div class="todo-item">
        <div class="">
            <div>
                <input type="text" v-if="!flag" placeholder="task" v-model="edittodo" @keyup.enter="editTodo(id)" :id="id" @blur="editTodo(id)" @keyup.esc="cancelEdit()">    
            </div> 
            <div class="todo-items">
                <div v-if="flag">
                    <input type="checkbox" :checked="todo.isComplete" @change="toggleComplete(id)" class="todoItem-checkbox">
                </div>
                <div v-if="flag" @click="enableTodo(index)" :class="{ complete : todo.isComplete }">
                    <p>{{data}}</p>
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
                isEdit : false,
            });
            this.$store.dispatch('',)
        },
        editTodo(id){
            if(this.edittodo.trim().length === 0) {
                return;
            }
            this.$store.dispatch('updateItem',{
                id : id ,
                edit : this.edittodo,
                index : this.index,
                isEdit : true,
            });
            
            this.data = this.edittodo;
            this.flag = true;
            this.edittodo = '';
        },
        enableTodo(){
            this.flag = false;
        },
        toggleComplete(id){
            console.log(id);
            this.$store.dispatch('Complete',{
                id : this.id ,
                index : this.index,
                isComplete : !this.isComplete, 
                isEdit : false,
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
        /* border : 2px solid #000;
        background-color : #f8f8f8;
        margin : 0px auto;
        width : 75%;
        display: flex;
        justify-content: space-between; */
        height : 40px; 
        align-items: center;
        background: #fff;
        border-radius: 3px;
        /* box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15); */
        box-shadow: 0 15px 16.83px 0.17px rgb(0 0 0 / 5%);
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 3px 10px;
    }
    
    .removeItemBtn{
        cursor: pointer;;
    }

    input[type="checkbox"] {
        background-color: initial;
        cursor: default;
        appearance: auto;
        box-sizing: border-box;
        /* margin: 3px 3px 3px 4px; */
        padding: initial;
        border: initial;
    }

    .complete{
        text-decoration: line-through;
    }

    .todo-items{
        display: flex;
        justify-content: space-evenly;
    }

    p{
        margin : 0;
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

    .todoItem-checkbox::before{
        content: "";
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        position: absolute;
        top: -11px;
        left: -4px;
        z-index: 5;
    }

    .todoItem-checkbox::after{
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: none;
        position: absolute;
        top: -10px;
        left: -3px;
        z-index: 10;
        -webkit-transition: background 0s;
        transition: background 0s;
    }


</style>