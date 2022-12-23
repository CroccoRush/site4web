import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (username, password) => {
    const {data} = await $host.post('api/user/registration', {username, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('role', data.role)
    return jwtDecode(data.token)
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('role', data.role)
    return jwtDecode(data.token)
}

export const oauth = async (code) => {
    const {data} = await $host.post('api/user/oauth', {code})
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('role', data.role)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const deleteUser = async (username) => {
    await $authHost.delete('api/user/delete',  {data : {username : username}})
}

export const changeRole = async (username, role) => {
    await $authHost.put('api/user/role', {username, role})
}