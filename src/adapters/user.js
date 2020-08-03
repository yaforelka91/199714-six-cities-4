const adaptUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.avatar_url,
    isSuper: user.is_pro,
  };
};

export default adaptUser;
