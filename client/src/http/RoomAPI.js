import {$authHost} from "./index";

export const createRoom = async (room) => {
    const {data} = await $authHost.post('api/room', room)
    return data
}

export const getAllRooms = async (name, typeId, page = 1, limit = 9) => {
    const {data} = await $authHost.get('api/room', {params: {
            name, typeId, page, limit
        }})
    return data
}

export const getRoomsCount = async (name, typeId) => {
    const {data} = await $authHost.get('api/room/count', {params: {
            name, typeId
        }})
    return data
}

export const getOneRoom = async (id) => {
    const {data} = await $authHost.get('api/room/' + id)
    return data
}

export const createContentType = async (name) => {
    const {data} = await $authHost.post('api/type', {name})
    return data
}

export const getContentTypes = async () => {
    const {data} = await $authHost.get('api/type')
    return data
}

export const getContent = async (id) => {
    const {data} = await $authHost.get(`api/content?id=${id}`)
    return data
}

export const getContentTypesCount = async (typeId) => {
    const {data} = await $authHost.get(`api/content/count?typeId=${typeId}`)
    return data
}

export const createChat = async (name) => {
    const {data} = await $authHost.post('api/chat', {name})
    return data
}

export const getChat = async (id) => {
    const {data} = await $authHost.get(`api/chat?id=${id}`)
    return data
}


export const getChatMessages = async (chatId) => {
    const {data} = await $authHost.get(`api/message?chatId=${chatId}`)
    return data
}