let client

export function setClient (newclient) {
  client = newclient
}

// Request helpers
const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
]

let service = {}

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error('httpClient not installed')
    return client[method]?.apply(null, arguments)
  }
})

export default service