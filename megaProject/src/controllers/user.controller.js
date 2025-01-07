import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user data from frontend
  //check for data if null (validation)
  //check if user already exists (username, email)
  //check for image, avatar
  //upload to cloudinary(check avatar)
  //create user object (create entry in db)
  // remove password and refresh token in the response
  //check for user creation
  // return response

  //handling data only
  const { username, fullName, password, email } = req.body; //data send from form

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "") // checking if any field is empty
  ) {
    throw new apiError(400, "All fields are required");
  }

  //checking if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new apiError(409, "Email or username already exists");
  }

  //check for images

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath); //uploading avatar image
  const coverImage = await uploadOnCloudinary(coverImageLocalPath); //uploading cover image

  if (!avatar) {
    throw new apiError(400, "Avatar file is required !!!");
  }

  //Create user object on mongodb
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  //check for user creation and remove password and refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong !!!");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User register successfully!"));
});
export { registerUser };
