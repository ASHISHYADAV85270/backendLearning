import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
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
      "Something went wrong while generating referesh and accesstoken"
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const { userName, email, fullName, password } = data;

  // Step 1: Check for complete inputs
  if (
    [fullName, email, userName, password].some((field) => {
      field?.trim() === ""; // Check if any field is empty
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Step 2: Check for existing user
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or UserName already exists");
  }

  // Step 3: Check for images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath = "";
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is required");
  }

  // Step 4: Upload images to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar File is required");
  }

  // Step 5: Create user object
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName,
  });

  // Step 6: Remove password and refresh token from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  // Step 7: Return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName && !email) {
    throw new ApiError(400, "UserName or UserEmail is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isCorrect = await user.isPasswordCorrect(password);

  if (!isCorrect) {
    throw new ApiError(401, "User password is wrong ");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // no body can modify from front end .. only can be modified from backend
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accesstoken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { $set: { refreshToken: undefined } });
  // no body can modify from front end .. only can be modified from backend
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(200, {}, "User Logged Out Successfully");
});

export { registerUser, loginUser, logOutUser };
