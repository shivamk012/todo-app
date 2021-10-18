import { query } from '@firebase/firestore';
import { createStore } from 'vuex'
import { getFirestore , collection, getDocs , addDoc , setDoc ,doc , deleteDoc , updateDoc} from 'firebase/firestore/lite';
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
    deleteTodo(state,obj){
      state.todoList.splice(obj.index,1);
    },
    editTodo(state,obj){
      state.todoList[obj.index].data = obj.edit;
      state.todoList[obj.index].flag = true; 
      state.todoList[obj.index].isComplete = false; 
    },
    updateFilter(state , filter){
      state.choice = filter;
    },
    toggleComplete(state , obj){
      state.todoList[obj.index].isComplete = !state.todoList[obj.index].isComplete;
    }
  },
  actions : {
    getTodo(context){
      
      const q = query(collection(db, "TodoList"));
      //getDocs returns a promise
      const querySnapshot = getDocs(q);
      querySnapshot.then(todos => { 
        let temp = [];
        todos.forEach(doc => {
          //data() is always defined for each doc , it contains the object  
          let newObj = doc.data();
          temp.push(newObj);
        })
        context.commit('intialiseTodo',temp);
      });
    },
    add(context , todo){
      //   addDoc gives a auto generated id to each document added
      //   const docRef = addDoc(collection(db, "TodoList"), {
      //   index : todo.id,
      //   task : todo.data,
      //   isComplete : todo.isComplete,
      //   flag : todo.flag,
      //   time : new Date(),
      // });

      //we have to provide a id to setDoc
      setDoc(doc(db, "TodoList" ,`${todo.id}`), { 
        index : todo.id,
        task : todo.data,
        isComplete : todo.isComplete,
        flag : todo.flag,
        time : new Date(),
      });
      context.commit('addTodo' , todo);
    },
    deleteItem(context , obj){
      deleteDoc(doc(db, 'TodoList', `${obj.id}`));// gets the reference of document with id = obj.id
      context.commit('deleteTodo',obj);
    },
    updateItem(context , obj){
      const docRef = doc(db, 'TodoList', `${obj.id}`);// gets the reference of document with id = obj.id

      updateDoc(docRef, {
        task : obj.edit,
      });
      context.commit('editTodo' , obj);
    },
    Complete(context , obj){
      const docRef = doc(db,'TodoList',`${obj.id}`); // gets the reference of document with id = obj.id
      
      updateDoc(docRef,{
        isComplete : obj.isComplete,
      });
      context.commit('toggleComplete',obj)
    }
  }
})  