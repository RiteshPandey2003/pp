import { User } from "../models/user.model.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const Signup = async(req, res) => {
  const { Name, email, password } = req.body;

  if ([Name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
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
     res.json(400, { message: "something wrong registration"});
  }

  return res
    .status(201)
    .json(200,{ message: "User registered Successfully"});
};

const Signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password)
  if (!email) {
    res.json(400, {message:"email is required"});
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.json(404, {messsage:"User does not exist"});
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res.json(401,{message: "Invalid user credentials"});
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
    .json(
        200,
       { message:
        "User logged In Successfully"}
      )
};



const logoutUser =async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(200, {message : "User logged Out"})
}

const Home= async(req,res)=>{
   res.json({message : "home route this is "})
}


export { Signup, Signin, logoutUser, Home};
