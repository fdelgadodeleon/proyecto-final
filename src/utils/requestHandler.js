import { runFetch } from "./fetchHandler";

export const requests = {
  get: url => runFetch({
    method: "GET",
    url: url
  }),
  post: (url, data) => runFetch({
    method: "POST",
    url: url,
    data: data,
  }),
  put: (url, data) => runFetch({
    method: "PUT",
    url: url,
    data: data,
  }),
  delete: url => runFetch({
    url: url,
    method: "DELETE",
  }),
}
