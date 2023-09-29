import { setClient } from '../api/services/originalClient';

export default ({ app, store }) => {
  const apiURL = process?.env?.originalAPI
  app.$axios = app.$axios.create({
    headers: {
      apiKey: process?.env?.appKey,
      common: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      },
      Authorization: process.server ? '' : `Bearer ${localStorage.getItem('access_token')}`,
    }
  })

  // Set baseURL to something different
  app.$axios.setBaseURL(apiURL)
  setClient(app.$axios)
}