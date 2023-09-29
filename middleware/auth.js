export default async function ({ store, redirect, from }) {
    let user = store?.state?.auth?.user;
    let status = store?.state?.auth?.status;
    const pathName = from?.name;
    await store.dispatch('auth/me');
    
    status = store?.state?.auth?.status;
    if(status != 200) {
        await store.dispatch('auth/refreshToken', {
            'refresh_token': localStorage.getItem('refresh_token'),
        });
    }
    if(user == null) {
        user = store?.state?.auth.user;
        return redirect('/auth/signin');
    }  
}