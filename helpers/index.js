import Propiedad from "../models/Propiedad.js";
import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";
import Usuario from "../models/Usuario.js";

Propiedad.belongsTo(Precio, { foreignKey: 'precioId' })
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId' })
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId' })

export {
    Propiedad,
    Categoria,
    Precio,
    Usuario
}
