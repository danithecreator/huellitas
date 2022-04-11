import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {

    const config = {
        // Cambiar cuando se haga el deploy
        url: 'http://localhost:3000/login'
      }

    return new Promise((resolve, reject) => {
      auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['El correo no se encuentra registrado en Huellitas. Por favor intente de nuevo'];
        reject(err);
      })
    });
};
