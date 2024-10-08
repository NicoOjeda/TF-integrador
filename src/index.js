import express, { json } from "express"
import dotenv from "dotenv"
import { router as v1ReclamosEstadoRouter } from "./v1/routes/reclamosEstadosRoutes.js"
import { router as v1UsuariosTipoRouter } from "./v1/routes/usuariosTipoRoutes.js"
import { router as v1NotificacionCorreo } from "./v1/routes/notificacionCorreoRoutes.js"
import { router as v1ReclamosTipoRouter } from "./v1/routes/reclamosTipoRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());

const puerto = process.env.PUERTO
app.listen(puerto, () => {
    console.log( `Server is running on port ${puerto}`);
});


// ======================= test =======================
app.get("/", (req, res) => {
    //res.status(200).send({ 'estado': true, 'mesage': "Hola Mundo!!" });
    res.json({ 'estado': true, 'mesage': "Hola Mundo!!" });
});
// ======================= fin test =======================


// ======================= Envio de correo =======================
app.use(express.json()); 
// ======================= Fin envio de correo =======================


app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter)
app.use('/api/v1/usuarios-tipo', v1UsuariosTipoRouter)

app.use('/api/v1/notificacion', v1NotificacionCorreo)
app.use('/api/v1/reclamos-tipo', v1ReclamosTipoRouter);