const jwt = require("jsonwebtoken");

export const generateToken = (
  id: number,
  username: string,
  type_id: number,
  active: number
) => {
  return new Promise((resolve, reject) => {
    let payload = { username, id, type_id, active };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "24h" },
      function (error: any, token: any) {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
