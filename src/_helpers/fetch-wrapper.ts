import { config } from "../_shared/constants";
import { accountService } from "../_services";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {"Access-Control-Allow-Origin": "*", ...authHeader(url)},
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    // credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions
function authHeader(url: string): HeadersInit {
  const user = accountService.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(config.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return {
      Authorization: `Bearer ${user.jwtToken}`,
    };
  } else {
    return {};
  }
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && accountService.userValue) {
        accountService.logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
