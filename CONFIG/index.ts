require("dotenv").config();

export default {
  jwtUserSecret: process.env.JWT_USER_AUTH || "trynewdndndnddndnd",
  jwtPasswordSecret: process.env.JWT_PASSWORD_AUTH || "trynewdndndnddndnd",
};
