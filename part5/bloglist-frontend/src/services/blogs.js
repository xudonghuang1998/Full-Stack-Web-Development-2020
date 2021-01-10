import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const response = axios.put(`${ baseUrl }/${id}`, newObject)
    return response.data
}

const del = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response =await axios.delete(`${ baseUrl }/${id}`, config)
    return response.data
}

export default { getAll, create, update, del, setToken }