export const signUpDto = (body) => {
  return {
    name: body.name.trim(),
    username: body.username.trim(),
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
    tags,
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
