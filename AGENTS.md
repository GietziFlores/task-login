# AGENTS.md - TaskFlow

> Lee este archivo antes de codificar. Sigue estas reglas al pie de la letra.

## 1. Estructura

- Trabaja solo en `server/` (Express 5 ESM) y `frontend/` (React 19 + Vite 7).
- Ignora `book-api/` y `portfolio/` salvo instrucción explícita.
- `server/app.js` monta middlewares → rutas; `server/server.js` conecta DB y monta `errorHandler` al final.

## 2. Setup

- Copia `server/.env.example` a `server/.env`. Define `PORT`, `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`.
- Nunca commitees `.env`, `server/uploads/`, `node_modules/`, `dist/`, `coverage/`.
- Usa `MONGODB_URI=mongodb://admin:password123@localhost:27017/taskflow_test` + `JWT_SECRET=test_jwt_secret_for_ci` para tests (como en `.github/workflows/ci-cd.yml`).

## 3. Comandos - ejecuta siempre desde subcarpeta correcta

- Backend: `cd server && npm install && npm run dev` (puerto 3000)
- Frontend: `cd frontend && npm install && npm run dev` (puerto 5173)
- Tests: `cd server && npm test` (Jest + mongodb-memory-server, 18 tests)
- Calidad: `cd server && npm run lint && npm run lint:fix && npm run format`
- Frontend build: `cd frontend && npm run build`
- Docker dev: `docker-compose -f docker-compose.dev.yml up -d` o `./docker/manage.sh dev`

## 4. Convenciones - Respeta sí o sí

- Usa ESM `import/export`. No uses `require()` — `server/package.json` es `"type":"module"`.
- Formatea con Prettier: `singleQuote`, `semi`, `tabWidth:2`, `printWidth:80`, `lf` (ver `/.prettierrc.json`).
- Respeta ESLint: `indent 2`, `quotes single`, `semi always` (ver `server/.eslintrc.json`).
- Modelos Mongoose con `timestamps:true` y hash bcrypt en `pre('save')` (ver `server/models/User.js`).
- Mantén mensajes de error API/UI en español.

## 5. Auth - Regla de oro

- Protege toda ruta `/api/tasks` y `/api/users` con `protect` (espera `Authorization: Bearer <token>` en `server/middleware/protect.js`).
- Restringe rutas admin con `authorize('admin')` (ver `server/middleware/authorize.js`).
- Roles válidos: `user` (default) y `admin` (ver `server/models/User.js`).
- Verifica JWT con `process.env.JWT_SECRET`.

## 6. Qué NO hacer

- No conviertas ESM a CJS.
- No hardcodees `JWT_SECRET` ni `MONGODB_URI`.
- No muevas `app.use(errorHandler)` antes de las rutas en `server/server.js`.
- No modifiques `.github/workflows/` ni `docker-compose.yml` sin pedirlo.
- No crees archivos `.md` nuevos sin autorización.

## 7. Verificación antes de PR

- Ejecuta `cd server && npm run lint && npm test`.
- Ejecuta `cd frontend && npm run lint && npm run build` si tocaste frontend.
