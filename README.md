# musikos_client
### Sprint 2 - 25/02/2025 - Tarde - testing signup and signin 

Dependencias:

- npm create vite@latest bandbros_client --template react
- npm install react-router-dom@latest
- npm install @lottiefiles/dotlottie-react

## 1er SPRINT (FRONTEND)

### RESUMEN DE OBJETIVOS:

Al igual que en el back, en el primer sprint del front me he centrado en configuraciones y disposiciones globales que agilizarán mucho los siguientes sprints, realizando solo la funcionalidad de signUp, que queda operativa y sincronizada con el back.

1. Inicialización del proyecto (react/vite).
2. Diseño de estética general (colores, logo, tipografía...)
3. Disposición incial de las páginas y componentes reutilizables.
4. Función de signUp sincronizada con backend.
5. Diseño de ErrorModal (componente) reutilizable.
6. Diseño de SuccessModal (componente) reutilizable.
7. Diseño de LegalModal (componente) para mostrar los términos y la política de privacidad.
8. Creación de useFetch para las peticiones.
9. Creación de customFetch para peticiones desde js puro.
10. Creación de fichero validate.js para validaciones.
11. Diseño y creación de spinner de carga (img + modal).


---------- NOTAS ----------

* Crear el esqueleto del frontend
    - Proyecto de React con Vite
    - Organización inicial de carpetas (components / pages)
    - Disposición con grid de header-main-footer
    - Selección y configuración de tipografía principal

* Creación inicial de pages
    - Home
    - Login
    - Dashboard
    - SearchMusician

* Creación del header (brand + navbar)
    - Selección de logo e iconos

* Creación de la página "Login" (SignUp Form + SignIn Form)
    - Creación de componentes inputs reutilizables
    - Creación de utils y custom hooks

* Pruebas con el back de signUp
    - Validaciones
    - Envío correcto de datos