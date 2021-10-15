import { createStore } from 'vuex'

export const store = createStore({
  state : {
    //all the global var are kept here
    todoList : [],
    choice : 1,
  },
  getters :{
    //getters are the same as computed properties 
    //i.e. we can write computed property in getters
    itemRemaining(state){
      return state.todoList.filter(todo => !todo.isComplete).length;
    },
    anyRemaining(state , getters){
        return getters.itemRemaining == 0;
    },
    cachedTodoList(state){
        if(state.choice == 1){
            return state.todoList;
        }
        else if(state.choice == 2){
            return state.todoList.filter(todo => !todo.isComplete);
        }
        else if(state.choice == 3){
            return state.todoList.filter(todo => todo.isComplete);
        }
        return state.todoList;
    }
  },
  mutations : {
    addTodo(state , todo){
      state.todoList.push(todo);
    },
    deleteTodo(state,id){
      state.todoList.splice(id,1);
    },
    editTodo(state,obj){
      state.todoList[obj.id].data = obj.edit;
      state.todoList[obj.id].flag = true; 
      state.todoList[obj.id].isComplete = false; 
    },
    updateFilter(state , filter){
      state.choice = filter;
    }
  }
})  