const jwt = require("jsonwebtoken");

  /*
    Calvin's note

    There's a ton of stuff you can put in the jwt. Here's their documentation on what's recommended to store in the JWT. They call it registered claims. Think of claim as something you can use within the jwt to better identify or restrict the token.

    Registered claims: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: 
      iss (issuer), - claim identifies the principal that issued the JWT.
      sub (subject), - claim identifies the principal that is the subject of the JWT.
      iat (issued at) - claim identifies the time at which the JWT was issued.
      aud (audience) - claim identifies the recipients that the JWT is intended for.
      exp (expiration time) - claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.
     
      https://jwt.io/introduction/
      https://tools.ietf.org/html/rfc7519#section-4.1

      Tabby we'll only use 3 claims, 1) issuer 2) subject 3) audience
  */
 const signToken = (user) => {
    return jwt.sign(
      {
        iss: "project_2_app", // Has to be the same as what passport is using to decrypt token
        sub: user.id, // I dont think is really needed to store user id here but figured i keep it aligned with what JWT.io says in their documentaion.
        aud: user.email
      },
      process.env.jwt_secret
    );
  };

  module.exports = signToken;