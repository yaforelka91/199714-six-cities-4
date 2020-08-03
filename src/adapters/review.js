const adaptReview = (review) => {
  return {
    id: review.id,
    user: {
      id: review.user.id,
      name: review.user.name,
      picture: review.user.avatar_url,
      isSuper: review.user.is_pro,
    },
    rating: review.rating,
    feedback: review.comment,
    visitTime: review.date,
  };
};

export default adaptReview;
