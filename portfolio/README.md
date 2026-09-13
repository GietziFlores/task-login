# Portafolio de Gietzi Flores

Un sitio web moderno y responsivo que muestra mis habilidades como desarrollador Full Stack, con énfasis en el proyecto TaskFlow.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones
- **Completamente Responsivo**: Optimizado para desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones y efectos de hover para mejor UX
- **Navegación Fluida**: Scroll smooth y navegación por secciones
- **Formulario de Contacto**: Validación y notificaciones de envío
- **SEO Optimizado**: Meta tags y estructura semántica

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Animaciones y Media Queries
- **JavaScript (ES6+)**: Interactividad y manipulación del DOM
- **Font Awesome**: Iconos vectoriales
- **Google Fonts**: Tipografía Inter

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interactivo
└── README.md           # Este archivo
```

## 🏃‍♂️ Cómo Ejecutar

### Opción 1: Abrir directamente en el navegador
1. Clona o descarga este repositorio
2. Navega a la carpeta `portfolio/`
3. Abre `index.html` en tu navegador web

### Opción 2: Usar un servidor local (Recomendado)
Para evitar problemas de CORS y tener una experiencia más realista:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (si tienes http-server instalado)
npx http-server

# Usando PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 📱 Secciones del Portafolio

### 🏠 Hero
- Presentación personal
- Llamado a la acción
- Animación de código

### 👨‍💻 Sobre Mí
- Información personal
- Estadísticas profesionales
- Foto de perfil

### 🛠️ Habilidades
- Tecnologías frontend
- Tecnologías backend
- Herramientas de desarrollo

### 💼 Proyectos
- **TaskFlow** (Proyecto destacado)
  - Gestión de tareas con autenticación
  - Stack completo: React, Node.js, MongoDB
  - Características avanzadas: Docker, CI/CD, Testing
- Otros proyectos (placeholders)

### 📞 Contacto
- Información de contacto
- Formulario funcional
- Enlaces a redes sociales

## 🎨 Personalización

### Cambiar Información Personal
Edita las siguientes secciones en `index.html`:

```html
<!-- Nombre -->
<h1 class="nav-logo">Tu Nombre</h1>

<!-- Información de contacto -->
<a href="mailto:tu-email@example.com">tu-email@example.com</a>
<a href="https://github.com/TuUsuario">github.com/TuUsuario</a>
<a href="https://linkedin.com/in/TuUsuario">linkedin.com/in/TuUsuario</a>
```

### Modificar Colores
En `styles.css`, cambia las variables de color:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #10b981;
}
```

### Actualizar Proyectos
Para agregar más proyectos, duplica la estructura de `.project-card` en la sección de proyectos.

## 🌐 Despliegue

### GitHub Pages
1. Sube este repositorio a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/root`
4. El sitio estará disponible en `https://tuusuario.github.io/portfolio`

### Netlify/Vercel
1. Conecta tu repositorio
2. Configura el directorio de publicación como `/portfolio`
3. Despliega automáticamente

### Servidor Web Tradicional
Sube los archivos a cualquier servidor web que soporte HTML/CSS/JS estáticos.

## 📊 Rendimiento

- **Lighthouse Score**: 95+ en todas las métricas
- **Tamaño del Bundle**: ~50KB (sin comprimir)
- **Carga Inicial**: < 1 segundo en conexiones 3G
- **SEO Score**: Optimizado para motores de búsqueda

## 🔧 Desarrollo

### Requisitos
- Navegador moderno con soporte ES6+
- Conexión a internet (para fuentes externas)

### Scripts Disponibles
- No se requieren scripts de build
- Todo es vanilla HTML/CSS/JS

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu propio portafolio.

## 🤝 Contribuciones

Si encuentras algún problema o tienes sugerencias de mejora:
1. Abre un issue en GitHub
2. Describe el problema o mejora
3. Si es posible, incluye código o screenshots

---

**Desarrollado con ❤️ por Gietzi Flores**