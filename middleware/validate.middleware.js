import {
  signUpDto,
  logindto,
  followdto,
  commentsdto,
  postdto,
} from "../utils/dtos.js";
export const validateSignUp = (req, res, next) => {
  let { name, username, email, password, bio, idempotencyId } = signUpDto(
    req.body
  );

  //This check for any empty fields
  if (!name || !username || !email || !password || !idempotencyId || !bio)
    return res
      .status(400)
      .json({ success: false, message: "All inputs must be filled." });

  //This code ensures that all inputs are fields are of the correct data types
  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof idempotencyId !== "string" ||
    typeof bio !== "string"
  )
    return res.status(422).json({
      success: false,
      message: "Unprocessable entities, All inputs should be string",
    });

  req.credentials = {
    name,
    username: `@${username}`,
    email,
    password,
    bio,
    idempotencyId,
  };
  next();
};

export const validateLogin = (req, res, next) => {
  let { email, password } = logindto(req.body);

  //This check for any empty fields
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All inputs must be filled." });

  //This code ensures that all inputs are fields
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(422).json({
      success: false,
      message: "Unprocessable entities, All inputs should be string",
    });

  req.credentials = {
    email,
    password,
  };
  next();
};

export const validateBio = (req, res, next) => {
  const { bio } = biodto(req.body);

  if (!bio)
    return res
      .status(400)
      .json({ success: false, message: "Bio not found, Please input bio" });
  if (typeof bio !== "string")
    return res
      .status(422)
      .json({ success: false, message: "Bio must be a string" });

  next();
};

export const validateFollow = (req, res, next) => {
  // let { targetId, idempotencyId } = followdto(req.body);
  let targetId = followdto(req.body).targetId;

  if (!targetId)
    return res.status(400).json({
      success: false,
      message: "TargetId not found, Please input the targetId!!!",
    });

  if (typeof targetId !== "string")
    return res
      .status(422)
      .json({ success: false, message: "targetId must be a string" });

  targetId = targetId.trim();
  req.targetId = targetId;
  next();
};

export const validatePost = (req, res, next) => {
  const { title, content, tags, language, idempotencyId } = postdto(req.body);

  if (!title || !content || !tags || !language || !idempotencyId)
    return res.status(400).json({
      success: false,
      message: "All creditenals are to be filled to  create post",
    });

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    Array.isArray(tags) === false ||
    typeof language !== "string" ||
    typeof idempotencyId !== "string"
  )
    return res.status(429).json({
      success: false,
      message: "All inputs but be in required format",
    });

  next();
};

export const validateComment = (req, res, next) => {
  const { content, idempotencyId } = postdto(req.body);
  const { postId } = req.params;

  if (!postId || !content || !idempotencyId)
    return res.status(400).json({
      success: false,
      message: "PostId and contents must be provided.",
    });
  if (
    typeof postId !== "string" ||
    typeof content !== "string" ||
    typeof idempotencyId !== "string"
  )
    return res.status(429).json({
      success: false,
      message: "postId, content, and idempotencyId must be strings",
    });

  req.comment = { content, idempotencyId, postId };

  next();
};
