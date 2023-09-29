import { setClient } from '../api/services/httpClient'

export default ({ app, store }) => {
  const apiURL = process?.env?.apiURL
  app.$axios = app.$axios.create({
    headers: {
      apiKey: process?.env?.appKey,
      common: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      }
    }
  })

  // Set baseURL to something different
  app.$axios.setBaseURL(apiURL)
  setClient(app.$axios)
}