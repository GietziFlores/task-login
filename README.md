# TaskFlow - Gestión de Tareas

Una aplicación web completa para la gestión de tareas con autenticación de usuarios, roles (admin/usuario), y asignación de tareas.

## 🚀 Características

- **Autenticación JWT**: Login y registro seguro
- **Roles de usuario**: Admin y usuario regular
- **Gestión de tareas**: Crear, editar, eliminar y marcar como completadas
- **Asignación de tareas**: Admins pueden asignar tareas a usuarios
- **Perfiles de usuario**: Personalización con área de trabajo, foto de perfil y descripción
- **Interfaz moderna**: Diseño responsive con Bootstrap y Font Awesome
- **API REST**: Backend robusto con Express.js y MongoDB

## 🛠️ Tecnologías

### Backend
- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación
- **Multer** para subida de archivos
- **bcryptjs** para hashing de contraseñas
- **Helmet, CORS, Rate Limiting** para seguridad

### Frontend
- **React** con **Vite**
- **React Router** para navegación
- **Axios** para API calls
- **Bootstrap** y **Font Awesome** para UI
- **Context API** para estado global

## 📦 Instalación

### Prerrequisitos
- Node.js (v16+)
- MongoDB
- npm o yarn

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno
Crear `.env` en la carpeta `server`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=tu_jwt_secret_aqui
```

## 🚀 Uso

1. Registrar un usuario o iniciar sesión
2. Como usuario: Crear y gestionar tus tareas
3. Como admin: Ver todas las tareas, asignar a usuarios, gestionar usuarios
4. Personalizar perfil en la sección "Perfil"

## 📁 Estructura del proyecto

```
taskflow/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── public/
└── README.md
```

## 🔒 API Endpoints

### Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual
- `PUT /api/auth/profile` - Actualizar perfil

### Tasks
- `GET /api/tasks` - Obtener tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Users (Admin only)
- `GET /api/users` - Obtener usuarios
- `PUT /api/users/:id` - Actualizar rol de usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre** - [Tu GitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- Bootstrap por los componentes UI
- Font Awesome por los iconos
- La comunidad de React y Node.js