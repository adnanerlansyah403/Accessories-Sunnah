import authClient from '../services/authClient'

const signin = async (body) => authClient.post('/token?grant_type=password', body)
const refresh = async (body) => authClient.post('/token?grant_type=refresh_token', body)
const signup = async (body) => authClient.post('/signup', body)
const magiclink = async (body) => authClient.post('/magiclink', body)
const recover = async (body, token) => authClient.put('/user', body, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
const signout = async () => authClient.post('/logout')
const fetchMe = async () => authClient.get('/user')

export {
    signin,
    refresh,
    signup,
    magiclink,
    recover,
    signout,
    fetchMe,
}