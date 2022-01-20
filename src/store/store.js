import { query } from '@firebase/firestore';
import { createStore } from 'vuex'
import { collection, getDoc , addDoc , setDoc ,doc , deleteDoc , updateDoc , getDocs} from 'firebase/firestore/lite';
import db from '../firebase'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  state : {
    //all the global var are kept here
    todoList : [],
    choice : 1, 
    user : null,
    token : null , 
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
    },
    isAuthenticated(state){
      return state.token != null;
    },
    getUser(state){
      return state.user;
    },
    getList(state){
      return state.todoList;  
    }
  },
  mutations : {
    intialiseUser(state , username){
      state.user = username;
      state.token = true;
    },
    intialiseTodo(state , list){
      state.token = true;
      list.forEach(todo => {
        state.todoList.push({
            id : todo.id,
            data : todo.data,
            isComplete : todo.isComplete,
            flag : todo.flag,
        }); 
      })
      console.log(state.todoList);
      console.log(state.token);
    },
    addTodo(state , todo){
      state.todoList.push(todo);
      // console.log(state.todoList);
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
    },
    logout(state){
      state.todoList = [];
      state.choice = 1;
      state.user = null;
      state.token = null;
    },
  },
  actions : {
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
      context.commit('addTodo' , todo);
      context.dispatch('updateItem' , todo);
    },
    deleteItem(context , obj){
      context.commit('deleteTodo',obj);
      // deleteDoc(doc(db, 'TodoList', `${obj.id}`)); gets the reference of document with id = obj.id
      context.dispatch('updateItem' , obj);
    },
    async updateItem({commit , getters} , obj){
      if(obj.isEdit) commit('editTodo' , obj);
      const user = getters.getUser;
      console.log(user);
      const docRef = doc(db, "User", `${user}`);// gets the reference of document with id = obj.id
      const temp = getters.getList;
      await updateDoc(docRef, {
        todo : temp,
      });
    },
    async Complete(context , obj){ // gets the reference of document with id = obj.id
      context.commit('toggleComplete',obj);
      context.dispatch('updateItem' , obj);
    },
    async login(context , user){
      const docRef = doc(db, "User", `${user.username}`);// gets the reference of document with id = obj.id
      // console.log(docRef);
      const querySnapshot = await getDoc(docRef);
      const credentials = querySnapshot.data();
      console.log(credentials);
      if(user.username === credentials.username && user.password === credentials.password){
        // context.commit('editTodo' , obj);
        const temp = credentials.todo;
        context.commit('intialiseUser' , credentials.username);
        context.commit('intialiseTodo',temp);
      }
      else{
        console.log('wrong id pass');
      }
    },
    register(context , user){
      setDoc(doc(db, "User" ,`${user.username}`), { 
        username : user.username ,
        password : user.password,
        email : user.email,
        todo : [],
      });
      context.dispatch('login' , user); 
    },
  }
})  