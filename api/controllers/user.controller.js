import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while generating refresh and access token",
    });
  }
};

const Signup = asyncHandler(async (req, res) => {
  const { Name, email, password } = req.body;

  if ([Name, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(409)
      .json({ message: "User with email or username already exists" });
  }

  const user = await User.create({
    Name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(400)
      .json({ message: "Something went wrong during registration" });
  }

  return res.status(201).json({ message: "User registered Successfully" });
});
const Signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid user credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User logged In Successfully" });
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged Out" });
});
const Home = (req, res) => {
  res.json({ message: "Home route" });
};

export { Signup, Signin, logoutUser, Home };
