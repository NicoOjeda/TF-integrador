import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalSrategy } from "passport-local";
import UsuariosService from "../services/usuarioServices.js";
import dotenv from 'dotenv';
dotenv.config();


// validacion de los usuarios

const estrategia = new LocalSrategy({
    usernameField: 'correoElectronico', 
    passwordField: 'contrasenia'
}, 
async (correoElectronico, contrasenia, done) => {
    try {

        const service = new UsuariosService(); 
        const usuario = await service.buscar(correoElectronico, contrasenia);//*lo buscamos en la base de datos 

        if (!usuario) {
            console.log("Login incorrecto");

            return done(null, false, { mensaje: 'Login incorrecto!' });
        }

        console.log("Login correcto");
        return done(null, usuario, { mensaje: 'Login correcto!' });
    } catch (exc) {
        done(exc);
    }
});


// defino cómo se validad el token
const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
    // ignoreExpiration: true //por defecto se evalúa el campo de expiración a menos que le diga que lo ignore
},
    async (jwtPayload, done) => {
        const service = new UsuariosService();
        const usuario = await service.buscarPorId(jwtPayload.idUsuario);
        if(!usuario){
            return done(null, false, { mensaje: 'Token incorrecto!'});
        }
        return done(null, usuario); //req.user 
    }    
)
export { estrategia, validacion };