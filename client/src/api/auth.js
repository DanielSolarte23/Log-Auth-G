import axios from "./axios";

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

// export const logoutRequest = () => axios.get('/logout')

export const verifyEmailRequest = async (token) => {
    return await axios.get(`/api/verify-email/${token}`);
};

export const requestPasswordResetRequest = async email => await axios.post('/request-password-reset', {email})

export const resetPasswordRequest = async (token, password) => {
    return await axios.post(`/api/reset-password/${token}`, { password });
};