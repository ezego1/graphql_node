import User from "../../model/User.model";
import { signAccessToken, verifyAccessToken } from "../../helpers/jwt_helper";
import { authSchema } from "../../helpers/validation_schema";
import createError from "http-errors";
import Bcrypt from "bcryptjs";

const people = {
  createUser: async ({ userInput }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated, access Denied!");
    // }
    const existingUser = await User.findOne({ username: userInput.username });
    if (existingUser) {
      throw new createError.Conflict("User exist already!");
    }

    const newUser = new User({
      username: userInput.username,
      password: userInput.password,
    });

    const createdUser = await newUser.save();
    return createdUser;
  },

  login: async ({ username, password }) => {
    try {

      const result = await authSchema.validateAsync({
        username,
        password,
      });
      const foundUser = await User.findOne({ username: result.username });
      if (!foundUser) throw new createError.NotFound("User not registered");
      const isMatch = await Bcrypt.compare(password, foundUser["password"]);
      if (!isMatch)
        throw new createError.Unauthorized("Username/Password not valid");

      const accessToken = await signAccessToken(
        foundUser["_id"],
        foundUser["username"]
      );

      return { userID: foundUser._id, token: accessToken, tokenExpiration: 1 };
    } catch (error) {
      if (error.isJoi === true)
        throw new createError.BadRequest("Invalid username/password");
      throw error;
    }
  },

  updateUser: async ({ username, newUsername, newPassword }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated, access Denied!");
    }
    const existingUser = User.findOne({ username })
    existingUser['username'] = newUsername
    existingUser['password'] = newPassword
    const saved = (await existingUser).save()

    return saved
    
  },

  removeUser: async ({ username }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated, access Denied!");
    }
    const deleted = await User.findOneAndDelete({ username })
    return deleted
  },
};

export default people;
