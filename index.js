import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

//nCrear la aplicación
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Routing
app.use('/auth', usuarioRoutes);


// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});