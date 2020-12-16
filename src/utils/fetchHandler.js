import axios from 'axios';
import { errorHandler } from './errorHanlder';

export const runFetch = (params) => {
  return axios(params)
    .catch(error => Promise.reject(errorHandler(error)))
}