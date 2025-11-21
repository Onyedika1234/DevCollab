export const validateSignUp = (req, res, next) => {
  let { name, username, email, password } = req.body;

  //This check for any empty fields
  if (!name || !username || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All inputs must be filled." });

  //This code ensures that all inputs are fields
  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return res.status(422).json({
      success: false,
      message: "Unprocessable entities, All inputs should be string",
    });

  //This code helps trim whitespaces
  name = name.trim();
  username = username.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  req.credentials = {
    name,
    username,
    email,
    password,
  };
  next();
};

export const validateLogin = (req, res, next) => {
  let { email, password } = req.body;

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

  //This code helps trim whitespaces
  email = email.trim().toLowerCase();
  password = password.trim();

  req.credentials = {
    email,
    password,
  };
  next();
};

export const validateBio = (req, res, next) => {
  const { bio } = req.body;

  if (typeof bio !== "string")
    return res
      .status(422)
      .json({ success: false, message: "Bio must be a string" });

  next();
};

export const validateFollow = (req, res, next) => {
  let { targetId } = req.body;

  if (typeof targetId !== "string")
    return res
      .status(422)
      .json({ success: false, message: "targetId must be a string" });

  targetId = targetId.trim();
  req.targetId = targetId;
  next();
};
