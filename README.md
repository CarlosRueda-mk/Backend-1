

Ecommerce Backend
Descripción del Proyecto

Ecommerce Backend es una aplicación desarrollada con Node.js, Express, MongoDB y Handlebars que permite gestionar productos y carritos de compra mediante una API REST y una interfaz web renderizada en el servidor.

El sistema ofrece funcionalidades para administrar un catálogo de productos, consultar detalles de cada producto y realizar operaciones sobre carritos de compra y visualizarlos mediante vistas dinámicas.

Problema que Resuelve

Este proyecto busca resolver la necesidad de gestionar productos y carritos dentro de una plataforma de comercio electrónico.

Permite almacenar información de productos en una base de datos, consultar detalles de cada producto y realizar operaciones de compra mediante la gestión de carritos.

Público Objetivo

El sistema está orientado a:

Pequeños y medianos comercios que requieran una base para una tienda online.
Desarrolladores que necesiten una API REST para integrar funcionalidades de ecommerce.
Estudiantes interesados en el desarrollo backend con Node.js y MongoDB.
Tecnologías Utilizadas
Node.js
Express.js
MongoDB
Mongoose
Handlebars
Method Override
Dotenv
Arquitectura del Proyecto

El proyecto está organizado siguiendo una arquitectura por capas:

src/
├── controllers/
├── dao/
├── models/
├── routes/
├── views/
├── app.js
└── server.js
Descripción de Carpetas
controllers

Contienen la lógica de negocio de la aplicación.

dao

Implementan el patrón DAO (Data Access Object) para centralizar el acceso a los datos.

models

Definen los esquemas y modelos de MongoDB utilizando Mongoose.

routes

Gestionan las rutas y endpoints de la API.

views

Contienen las vistas desarrolladas con Handlebars.

Instalación
1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto:

MONGO_URI=tu_cadena_de_conexion
PORT=8080
4. Ejecutar el proyecto
npm start

o

node src/server.js
Base de Datos

Nombre de la base de datos:

ecommerce

Colecciones utilizadas:

products
carts
API de Productos
Obtener todos los productos
GET /api/products
Parámetros disponibles
Parámetro	Descripción
limit	Cantidad de resultados
page	Número de página
category	Filtrado por categoría
sort	Ordenamiento por precio
Ejemplos
GET /api/products?limit=5
GET /api/products?page=2
GET /api/products?category=Electronics
GET /api/products?sort=asc
GET /api/products?sort=desc
Formato de Respuesta
{
  "status": "success",
  "payload": [],
  "totalPages": 0,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
Obtener un producto por ID
GET /api/products/:id
Crear producto
POST /api/products
Body
{
  "title": "Mouse Gamer",
  "description": "Mouse RGB inalámbrico",
  "code": "MOU001",
  "price": 25000,
  "stock": 10,
  "category": "Perifericos"
}
Actualizar producto
PUT /api/products/:id
Eliminar producto
DELETE /api/products/:id
API de Carritos
Crear carrito
POST /api/carts
Obtener carrito por ID
GET /api/carts/:cid
Agregar producto al carrito
POST /api/carts/:cid/products/:pid

Si el producto ya existe en el carrito, se incrementa automáticamente la cantidad.

Actualizar carrito completo
PUT /api/carts/:cid
Actualizar cantidad de un producto
PUT /api/carts/:cid/products/:pid
Body
{
  "quantity": 5
}
Eliminar producto del carrito
DELETE /api/carts/:cid/products/:pid
Vaciar carrito
DELETE /api/carts/:cid
Vistas
Listado de Productos
/products

Muestra todos los productos disponibles y permite agregarlos al carrito.

Detalle de Producto
/products/:pid

Muestra información detallada de un producto específico.

Carrito
/carts/:cid

Permite visualizar los productos agregados al carrito, eliminar productos individuales y vaciar el carrito completo.

Funcionalidades Implementadas
CRUD completo de productos.
CRUD completo de carritos.
Persistencia con MongoDB.
Implementación de Mongoose.
Patrón DAO.
Paginación de productos.
Filtrado por categoría.
Ordenamiento por precio.
Vistas dinámicas con Handlebars.
Gestión de carritos de compra.
Integración entre productos y carritos mediante referencias de MongoDB.
Autor

Carlos Rueda

Proyecto desarrollado como práctica de Backend utilizando Node.js, Express, MongoDB y Handlebars.
