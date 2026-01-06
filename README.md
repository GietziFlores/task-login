# TaskFlow - Gestión de Tareas

Una aplicación web completa para la gestión de tareas con autenticación de usuarios, roles (admin/usuario), y asignación de tareas.

[![CI/CD Pipeline](https://github.com/GietziFlores/task-login/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/GietziFlores/task-login/actions/workflows/ci-cd.yml)
[![CodeQL Analysis](https://github.com/GietziFlores/task-login/actions/workflows/codeql.yml/badge.svg)](https://github.com/GietziFlores/task-login/actions/workflows/codeql.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green)](https://www.mongodb.com/)

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
- **Jest** y **Supertest** para testing
- **Docker** para contenerización

### Frontend
- **React** con **Vite**
- **React Router** para navegación
- **Axios** para API calls
- **Bootstrap** y **Font Awesome** para UI
- **Context API** para estado global
- **Docker** para contenerización

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

El proyecto incluye pipelines automatizados de CI/CD:

#### 🔄 **Continuous Integration**
- **Tests automáticos** en cada push/PR
- **Análisis de seguridad** con CodeQL
- **Auditoría de dependencias** con npm audit
- **Construcción de imágenes Docker**

#### 🚀 **Continuous Deployment**
- **Deploy automático** a staging (rama develop)
- **Deploy automático** a producción (rama main)
- **Actualizaciones de dependencias** con Dependabot

### Estados de los Workflows
- ✅ **Tests**: Ejecuta suite completa de 18 tests
- ✅ **Build**: Construye imágenes Docker para backend y frontend
- ✅ **Security**: Escaneo de vulnerabilidades
- ✅ **Deploy**: Despliegue automatizado

## 🛠️ Code Quality Tools

### Linting y Formateo
```bash
# Backend
cd server
npm run lint          # Verificar código con ESLint
npm run lint:fix      # Corregir problemas automáticamente
npm run format        # Formatear código con Prettier
npm run format:check  # Verificar formato
npm run build         # Ejecutar lint + format + tests
```

### Pre-commit Hooks (Futuro)
- ESLint para calidad de código
- Prettier para formato consistente
- Tests automáticos antes de commits

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

## 🐳 Docker Setup

### Prerrequisitos
- Docker y Docker Compose instalados

### Desarrollo
```bash
# Usando el script de gestión
./docker/manage.sh dev

# O directamente con docker-compose
docker-compose -f docker-compose.dev.yml up -d
```

### Producción
```bash
# Usando el script de gestión
./docker/manage.sh prod

# O directamente con docker-compose
docker-compose up -d
```

### Comandos Útiles
```bash
# Ver estado de servicios
./docker/manage.sh status

# Ver logs
./docker/manage.sh logs
./docker/manage.sh logs backend

# Ejecutar tests en contenedor
./docker/manage.sh test

# Acceder a shell de contenedor
./docker/manage.sh shell backend

# Detener servicios
./docker/manage.sh down

# Limpiar todo (contenedores, volúmenes, imágenes)
./docker/manage.sh clean
```

### Servicios
- **Frontend**: `http://localhost:5173` (dev) / `http://localhost` (prod)
- **Backend**: `http://localhost:3000`
- **MongoDB**: `localhost:27017`

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