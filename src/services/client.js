import axios from 'axios'

let client = axios.create({
  baseURL: 'http://localhost:4000',
})

export default client