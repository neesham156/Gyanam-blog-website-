import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import dbConnect from "/database/database";
import Author from "../../../models/Author"
var bcrypt = require("bcryptjs");

export default NextAuth({
  
  providers: [
    CredentialProvider({
      name: "credentials",
      // id: "user-login",
//       credentials: {   username: {
//  label: "Email",
//           type: "email",
//           placeholder: "johndoe@test.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
      authorize: async (credentials) => {
        const {username,password}=credentials;
        await dbConnect();

        const admin = await Author.findOne({   email: credentials.username,}).catch((e) => console.log(e));
        console.log(admin)
        if (admin) {
          const isValidated = await bcrypt.compare(    credentials.password,
            admin.password
          );
          if (isValidated) {
            return {
              id: admin._id,
              name: admin.name,
              email: admin.email,
              type: "admin",
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {

    jwt: ({ token, user }) => {
   
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token, user }) => {
     
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
      }
      // console.log("session", session);
      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: false,
  },
  session: {
    jwt: true,
    
  },

  database: process.env.DATABASE_CONNECTION,
  debug: true,
});
