import { runFetch } from "./fetchHandler";

export const requests = {
  get: url => runFetch({
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + url
  }),
  post: (url, data) => runFetch({
    method: "POST",
    url: process.env.REACT_APP_API_BASE_URL + url,
    data: data,
  }),
  put: (url, data) => runFetch({
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL + url,
    data: data,
  }),
  delete: url => runFetch({
    url: process.env.REACT_APP_API_BASE_URL + url,
    method: "DELETE",
  }),
}
