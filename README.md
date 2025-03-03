# musikos_client
### Sprint 3 - 03/03/2025 - Tarde - conecting searchForm with backend

## 2o SPRINT (FRONTEND)

### RESUMEN DE OBJETIVOS:

He creado todo lo necesario para el signin en el front, así como comprobado la funcionalidad con el back. He ajustado componentes para que sean más reutilizables.

1. Diseño del componente Signin.
    (Acceso a cuenta)
2. Diseño del componente RecoverPassModal.
    (Modal para reestablecer la contraseña)
3. Reajuste de componentes errorModal y succesModal.
    (Errores y respuestas de solicitudes http)
4. Revisión de lógica en la página "Login".
    (Gestión de "query params" y ventanas modales)
5. Creación de fichero "errorMessages" reutilizables.
    (Traducir errores provenientes de "query params")
6. Reajuste de "useFetch" para gestionar mejor los errores.
    (Errores provenientes del back, errores del navegador/conexión)
7. Aplicación de estilos.

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

Dependencias:

- npm create vite@latest 
- bandbros_client --template react
- npm install react-router-dom@latest
- npm install @lottiefiles/dotlottie-react

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