import { query } from '@firebase/firestore';
import { createStore } from 'vuex'
import { getFirestore , collection, getDocs , setDoc ,doc} from 'firebase/firestore/lite';
import db from '../firebase'

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
    intialiseTodo(state , list){
      list.forEach(todo => {
        state.todoList.push({
            id : todo.index,
            data : todo.task,
            isComplete : todo.isComplete,
            flag : todo.flag,
        });
      })
    },
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
    },
    toggleComplete(state , id){
      state.todoList[id].isComplete = !state.todoList[id].isComplete;
    }
  },
  actions : {
    getTodo(context){
      
      const q = query(collection(db, "TodoList"));
      
      const querySnapshot = getDocs(q);
      querySnapshot.then(todos => { 
        let temp = [];
        todos.forEach(doc => {
          // console.log(doc); 
          let newObj = doc.data();
          temp.push(newObj);
        })
        context.commit('intialiseTodo',temp);
      });
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    },
    add(context , todo){
      setDoc(doc(db, "TodoList" ,`${todo.id}`), {
        index : todo.id,
        task : todo.data,
        isComplete : todo.isComplete,
        flag : todo.flag,
        time : new Date(),
      });
      context.commit('addTodo' , todo);
    }
  }
})  