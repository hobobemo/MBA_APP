import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            auth: false,
            user: {
                displayName: null,
                email: null,
                photoUrl: null,
                uid: null,
                level: null,
                subscribedTeams: [],
            },   
        }
    },
    getters: {
        getAuth(state){
            return state.auth
        },
        getEmail(state){
            return state.user.email;
        },
        getFamilyName(state){
            return state.user.displayName;
        },
        getId(state){
            return state.user.uid;
        },
        getImageUrl(state){
            return state.user.photoUrl;
        },
        getLevel(state){
            return state.user.level;
        },
        getSubscriptions(state){
            return state.user.subscribedTeams;
        }
    },
    actions: {
        async login(user){
            this.user.displayName = await user.displayName;
            this.user.email = await user.email;
            if(user.photoUrl){
                this.user.photoUrl = await user.photoUrl;
            }
            if(user.photoURL){
                this.user.photoUrl = await user.photoURL;
            }
            this.user.uid = await user.uid;
            this.auth = true;
        },
        async setView(view){
            this.view = view;
        },
        async setLevel(level){
            this.user.level = await level;
        },
        async logout(){
            this.user.displayName = null;
            this.user.email = null
            this.user.photoUrl = null;
            this.user.uid = null;
            this.user.subscribedTeams = [];
            this.auth = false;
        },
        isSubscribed(teamId) {
            if (this.user.subscribedTeams.includes(teamId)) {
              return true;
            } else {
              return false;
            }
        },
        async toggleSubscription(teamId) {
            if (this.user.subscribedTeams.includes(teamId)) {
              this.user.subscribedTeams = this.user.subscribedTeams.filter(id => id !== teamId)
            } else {
              this.user.subscribedTeams.push(teamId)
            }
          }
    }
})