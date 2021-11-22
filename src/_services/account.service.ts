import { BehaviorSubject } from "rxjs";
import { config } from "../_shared/constants";
// import { User } from "../_shared/models/User";
import { fetchWrapper } from "../_helpers";

const userSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("user")!)
);

const baseUrl = `${config.apiUrl}`;

export const accountService = {
  signin,
  logout,
  refreshToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getById,
  create,
  update,
  setUser,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function setUser(user: string) {
  localStorage.setItem("user", JSON.stringify(user));
  userSubject.next(user);
}

function signin(email: string, password: string) {
  return fetchWrapper
    .post(`${baseUrl}/auth`, { email, password })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));

      userSubject.next(user);
      // startRefreshTokenTimer();
      return user;
    });
}

function logout() {
  // fetchWrapper.post(`${baseUrl}/revoke-token`, {});
  // stopRefreshTokenTimer();
  localStorage.removeItem("user");
  userSubject.next(null);
  return true;
}

function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {}).then((user) => {
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}

function register(body: any) {
  return fetchWrapper.post(`${baseUrl}/users`, body).then((user) => {
    localStorage.setItem("user", JSON.stringify(user));
    userSubject.next(user);
    // startRefreshTokenTimer();
    return user;
  });
}

function verifyEmail(token: string) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email: string) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token: string) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }: any) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id: string) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(body: any) {
  return fetchWrapper.post(baseUrl, body);
}

function update(id: string, body: any) {
  return fetchWrapper.put(`${baseUrl}/${id}`, body).then((user) => {
    // update stored user if the logged in user updated their own record
    if (userSubject.value && user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}

function _delete(id: string) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (userSubject.value && id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// helper functions

let refreshTokenTimeout: NodeJS.Timeout;

function startRefreshTokenTimer() {
  if (userSubject.value) {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(
      Buffer.from(userSubject.value.jwtToken.split(".")[1], "base64").toString()
    );

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
  }
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
