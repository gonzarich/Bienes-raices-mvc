import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from './config/db.js'

// Crear la aplicación
const app = express();

// Habilitar lectura de datos del formulario
app.use(express.urlencoded({ extended: true }));

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF
app.use(csrf({ cookie: true }));

// Crear conexión a la base de datos
try {
    await db.authenticate();
    await db.sync();
    console.log('Conexión correcta a la base de datos');
} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta Publica
app.use(express.static('public'))

// Routing
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);


// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});