import User from '../interfaces/user';

const adaptUser = (user): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  picture: user.avatar_url,
  isSuper: user.is_pro,
});

export default adaptUser;
