import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'
import { VueCookieNext } from 'vue-cookie-next'

VueCookieNext.config({ expire: '7d' })

const store = createStore({
    state () { 
        return {
            signedIn: 0 
        }
    },
    mutations: {
        signin (state) { 
            state.signedIn = 1;
        }, 
        signout (state) { 
            state.signedIn = 0;
        }
    },
    actions: {
        signin (context) { 
            context.commit("signin");
        }, 
        signout (context) { 
            context.commit("signout");
        }
    },
    getters: {
        getSignedIn: (state) => {
            return state.signedIn;
        }
    }
});

createApp(App).use(router).use(store).use(VueCookieNext).mount('#app')
