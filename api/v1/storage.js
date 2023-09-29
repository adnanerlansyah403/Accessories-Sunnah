import originalClient from '../services/originalClient'

const upload = async (path, body) => originalClient.post(`/storage/v1/object/${path}`, body)
const remove = async (path) => originalClient.delete(`/storage/v1/object/${path}`)
const getFile = async (path) => originalClient.delete(`/storage/v1/object/${path}`)
const listFile = async (bucket, body) => originalClient.post(`/storage/v1/object/list/${bucket}`, body);

export {
    upload,
    remove,
    getFile,
    listFile
}