const adaptReview = (review) => {
  if (!review.id) {
    return review;
  }

  return {
    id: review.id,
    user: {
      id: review.user.id,
      name: review.user.name,
      picture: review.user.avatar_url,
      isSuper: review.user.isSuper,
    },
    rating: review.rating,
    feedback: review.comment,
    visitTime: review.date,
  };
};

export default adaptReview;
