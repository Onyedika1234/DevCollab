export const signUpDto = (body) => {
  return {
    name: body.name.trim(),
    username: body.username.trim().toLowerCase(),
    email: body.email.trim().toLowerCase(),
    password: body.password.trim(),
    idempotencyId: body.idempotencyId.trim(),
    bio: body.bio.trim(),
  };
};

export const logindto = (body) => {
  return {
    email: body.email.trim().toLowerCase(),
    password: body.password.trim(),
  };
};

export const biodto = (body) => {
  return { bio: body.bio.trim() };
};

export const followdto = (body) => {
  return {
    targetId: body.targetId.trim(),
    idempotencyId: body.idempotencyId.trim(),
  };
};

export const postdto = (body) => {
  return {
    title: body.title.trim(),
    content: body.content.trim(),
    tags: body.tags,
    language: body.language.trim(),
    idempotencyId: body.idempotencyId.trim(),
  };
};

export const commentsdto = (body) => {
  return {
    content: body.content.trim(),
    idempotencyId: body.idempotencyId.trim(),
  };
};

export const postOutputDto = (post) => {
  const newFormat = post.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags,
      language: post.language,
      author: {
        name: post.author.name,
        username: post.author.username,
        email: post.author.email,
        bio: post.author.bio,
      },
      likes: post.likes,
      comment: post.comments,
    };
  });

  return newFormat;
};

export const userProfileDto = (profile) => {
  return {
    name: profile.name,
    username: profile.username,
    email: profile.email,
    bio: profile.bio,
    followers: profile.followers,
    following: profile.following,
    posts: profile.posts,
  };
};
