import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)


var state={
    dialogFormVisible:false,
    id:{}
}
var mutations={
    changeName(state,dialogFormVisible){
       state.dialogFormVisible=dialogFormVisible
    },
    changeId(state,id){
        state.id = id
    }
}
var actions={
    changeName(context,dialogFormVisible){
       context.commit("changeName",dialogFormVisible)
    },
    changeId(context,id){
        context.commit("changeId",id)
    }
}

var getters = {
    id(state){        
        return state.id
    },
}

var store=new vuex.Store({
    state,
    actions,
    mutations,
    getters
})

export default  store