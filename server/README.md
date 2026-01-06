# TaskFlow Backend

Backend para la aplicación TaskFlow, construido con Node.js, Express, MongoDB y JWT.

## Características

- Autenticación con JWT
- Control de acceso por roles (user/admin)
- CRUD de tareas con permisos
- CRUD de usuarios (solo admin)
- Manejo centralizado de errores
- Middlewares de seguridad (CORS, Helmet, Rate Limiting, etc.)

## Instalación

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Crea un archivo `.env` con las variables de entorno (ver `.env.example`)
4. Asegúrate de tener MongoDB corriendo
5. Ejecuta: `npm start`

## Variables de Entorno

- `NODE_ENV`: Entorno (development/production)
- `PORT`: Puerto del servidor (default 3000)
- `MONGO_URI`: URI de MongoDB
- `JWT_SECRET`: Clave secreta para JWT

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login

### Tareas (requiere autenticación)
- `GET /api/tasks` - Obtener tareas (user: propias, admin: todas)
- `GET /api/tasks/:id` - Obtener tarea por ID
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Usuarios (requiere admin)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar rol de usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Health Check
- `GET /health` - Verificar estado del servidor

## Pruebas

Usa REST Client (extensión de VS Code) con los archivos en `http/`.

## Estructura del Proyecto

```
server/
├── app.js
├── server.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Task.js
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── routes/
│   ├── auth.js
│   ├── task.js
│   └── user.js
├── middleware/
│   ├── protect.js
│   ├── authorize.js
│   └── error.js
├── http/
│   ├── auth.http
│   ├── tasks.http
│   └── users.http
└── .env
```

## Checklist Final

- [x] Servidor Express básico
- [x] Conexión a MongoDB
- [x] Modelo User con encriptación
- [x] Registro de usuario
- [x] Login con JWT
- [x] Middleware de protección
- [x] Middleware de autorización
- [x] CRUD de tareas con permisos
- [x] CRUD de usuarios (admin)
- [x] Manejo de errores
- [x] Variables de entorno
- [x] Middlewares de seguridad
- [x] Rate limiting
- [x] Logging
- [x] Compresión
- [x] CORS
- [x] Documentación básica

## Próximos pasos

- Agregar tests unitarios
- Implementar refresh tokens
- Agregar validación avanzada
- Documentación con Swagger
- Despliegue en producción