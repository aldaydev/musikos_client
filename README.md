# musikos_client
### Sprint 5 - 10/03/2025 - Tarde - trying to upload images

## 5o SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

Mi intención en este sprint es tener las funcionalidades mínimas que se piden en el trabajo, para asegurar así cumplir todos los puntos.

1. Realización de pruebas con cypress para el login.
2. Realización de pruebas con selenium para el buscador.
3. DashboadComms.jsx (componente)
    - Nos permite acceder y mostrar los comunicados al usuario

## 4o SPRINT (FRONTEND)

### RESUMEN DE OBJETIVOS:

He creado la página de Dashboard, donde el usuario podrá modificar sus datos. Debido a la falta de tiempo, he decidido poner solo algunas funciones básicas e intentar optimizar para cumplir con los objetivos que se piden en el trabajo, dejando funcionalidades para la versión 2.

1. Diseño de Dashboard.jsx (página)
    * Contenedor para DashboardAccount y DashboardProfile.
    * Al cargarse el la página, recibirá los datos del usuario.
2. DashboardAccount.jsx (componente)
    * Aquí se podrán modificar los datos de la cuenta como tal (email y contraseña)
3. DashboardProfile.jsx (componente)
    * Aquí se podrán modificar los datos del perfil de músico. De momento solo he implementado actualizar el "username" por lo indicado en el resumen.

## 3er SPRINT (FRONTEND)

### RESUMEN DE OBJETIVOS:

He pre diseñado la página de búsqueda de músicos (Search.jsx). Se divide en dos componentes: SearchForm y SearchList.

1. Pre diseño de Search.jsx (página)
    * Contenedor para SearchForm y SearchList.
    * Se apoya en un contexto (searchContext) utilizado tanto para obtener los listados generales de instrumentos, estilos, provincias... que se usarán para los inputs como para gestionar el listado final de usuario encontrados o posibles errores.
2. Pre diseño SearchForm.jsx 
    * Incluye inputs totalmente creados por mí con css y acordes a la estética general de la aplicación.
    * Se puede filtrar por instrumentos, estilos, provincia, ciudad, edad mínima y máxima y nombre.
    * Custom hook useSearch utilizado para manejar la información de dichos filtros y finalmente conformar el query param final que se incluye en el fetch para obtener los datos del back.
3. Pre diseño de SearchList.jsx
    * Nada más cargarse el componente solicita al back un listado completo (sin filtrar), que es lo que aparece en la búsqueda. Este listado se guarda en sessionStorage para no hacer la búsqueda cada vez que se actualiza la página.
    * Mostrará un listado con los siguientes datos por usuario: username, nombre, edad, estilos, instrumentos, provincia y ciudad (si la hay).
4. Queda pendiente: Pulir los estilos de todos los componentes y elementos, así como posiblemente añadir el dato "género" del usuario si finalmente lo pongo.

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
- npm install --save-dev cypress
    (npx cypress open)
- npm install eslint-plugin-cypress --save-dev
    (npx cypress run --spec "cypress/e2e/login.cy.js")
- npm install selenium-webdriver chromedriver geckodriver
    (node selenium/search_musicians.test.js)


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