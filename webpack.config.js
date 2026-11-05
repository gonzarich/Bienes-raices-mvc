import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        agregarImagen: './src/js/agregar-imagen.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve('public')
    }
}