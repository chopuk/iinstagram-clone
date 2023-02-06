import axios from "axios"
import { urlPrefix } from './environment'

export default axios.create({baseURL: urlPrefix})