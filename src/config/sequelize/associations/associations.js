import { Channel } from '../models/channel-model.js';
import { Message } from '../models/message-model.js';
import { Server } from '../models/server-model.js';
import { User } from '../models/user-model.js';
import { ServerOnBoarding } from '../models/server_onboarding-model.js';

Message.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
Message.belongsTo(Channel, {
  foreignKey: 'channel_id',
  as: 'channel',
});

Channel.belongsTo(User, {
  foreignKey: 'server_id',
  as: 'user',
});
Channel.hasMany(Message, {
  foreignKey: 'channel_id',
  as: 'message',
});

User.belongsToMany(Server, {
  foreignKey: 'server_id',
  as: 'server',
  through: ServerOnBoarding,
});
User.hasMany(Message, {
  foreignKey: 'user_id',
  as: 'message',
});

Server.hasMany(Channel, {
  foreignKey: 'server_id',
  as: 'channel',
});
Server.belongsToMany(User, {
  foreignKey: 'user_id',
  as: 'user',
  through: ServerOnBoarding,
});

const models = {
  User,
  Channel,
  Server,
  Message,
};

export default models;
