import {makeAutoObservable} from "mobx";

export default class RoomStore {
    constructor() {
        this._rooms = []
        this._chats = []
        this._contents = []
        this._types = []
        this._selectedType = {}
        this._selectedContent = {}
        this._selectedRoom = {}
        this._selectedPage = 1
        this._selectedTypeId = null
        makeAutoObservable(this)
    }

    setRooms(rooms) {
        this._rooms = rooms
    }
    setChats(chats) {
        this._chats = chats
    }
    setContents(contents) {
        this._contents = contents
    }
    setTypes(types) {
        this._types = types
    }
    setSelectedType(type) {
        this._selectedType = type
        this._selectedTypeId = type.id
    }
    setSelectedContent(content) {
        this._selectedContent = content
    }
    setSelectedRoom(room) {
        this._selectedRoom = room
    }
    setSelectedPage(page) {
        this._selectedPage = page
    }
    setSelectedTypeId(id) {
        this._selectedTypeId = id
    }

    get rooms() {
        return this._rooms
    }
    get chats() {
        return this._chats
    }
    get contents() {
        return this._contents
    }
    get types() {
        return this._types
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedContent() {
        return this._selectedContent
    }
    get selectedRoom() {
        return this._selectedRoom
    }
    get selectedPage() {
        return this._selectedPage
    }
    get selectedTypeId() {
        return this._selectedTypeId
    }

    get chatId() {
        return this._selectedRoom.chatId
    }
}