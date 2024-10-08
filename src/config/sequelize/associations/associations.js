import { Channel } from '../models/channel-model.js';
import { Message } from '../models/message-model.js';
import { Server } from '../models/server-model.js';
import { User } from '../models/user-model.js';
import { UserStatus } from '../models/user-status-model.js';
import { ServerOnBoarding } from '../models/server_onboarding-model.js';
import { UserFriendship } from '../models/user-friendship-model.js';

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

User.belongsTo(UserStatus, {
  foreignKey: 'status_id',
  as: 'status',
});

// UserStatus.hasMany(User, {
//   foreignKey: 'status_id',
//   as: 'user',
// });

User.belongsToMany(User, {
  as: 'friends',
  through: UserFriendship,
  foreignKey: 'user_id',
  otherKey: 'friend_id',
});

User.belongsToMany(User, {
  as: 'friendOf',
  through: UserFriendship,
  foreignKey: 'friend_id',
  otherKey: 'user_id',
});

UserFriendship.belongsTo(User, { foreignKey: 'friend_id', as: 'friend' });
UserFriendship.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

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
  UserStatus,
  UserFriendship,
};

export default models;
