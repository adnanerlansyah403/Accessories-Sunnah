export default async function ({ store, redirect, from }) {
    let user = store.state.auth.user;
    let isLoggedIn = store.state.auth.isLoggedIn;

    if(user) {
        await store.dispatch('auth/me');
        user = store.state.auth.user;
        return redirect('/');
    }  
}