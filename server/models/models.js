const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    owner_id: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
})

const Content = sequelize.define('content', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    departure_time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW,},
    text: {type: DataTypes.TEXT, allowNull: false},
    senderName: {type: DataTypes.STRING},
})

const AllowedUser = sequelize.define('allowed_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


Content.hasOne(Room)
Room.belongsTo(Content)

Chat.hasOne(Room)
Room.belongsTo(Chat)

Chat.hasMany(Message)
Message.belongsTo(Chat)

User.hasMany(Message)
Message.belongsTo(User)

Room.belongsToMany(User, {through: AllowedUser})
User.belongsToMany(Room, {through: AllowedUser})

User.hasMany(Room)
Room.belongsTo(User)

Type.hasMany(Content)
Content.belongsTo(Type)


module.exports = {
    User,
    Room,
    Content,
    Type,
    Chat,
    Message,
    AllowedUser,
}