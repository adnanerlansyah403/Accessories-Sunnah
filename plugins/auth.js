import { setClient } from '../api/services/authClient';

// const getAuthToken = localStorage.getItem('access_token')
export default ({ app, store }) => {
  const authApi = process?.env?.authURL
  app.$axios = app.$axios.create({
    headers: {
      apiKey: process?.env?.appKey,
      common: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
      Authorization: process.server ? '' : `Bearer ${localStorage.getItem('access_token')}`,
    }
  })

  // Set baseURL to something different
  app.$axios.setBaseURL(authApi)
  setClient(app.$axios)
}