# Gestor de contrasenas

## Configuracion local

1. Inicia **MySQL80** desde la aplicacion Servicios de Windows. Si Windows rechaza
   iniciar el servicio, abre Servicios como administrador o pide al administrador
   del equipo que lo inicie. MySQL debe escuchar en el puerto 3306.
2. En MySQL Workbench conecta a tu servidor local y ejecuta el contenido de
   `schema.sql` para crear la base `gestor_contrasena` y la tabla `baul`.
3. Abre PowerShell en esta carpeta y crea tu configuracion local:

   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```

   Sustituye `change_me` por la contrasena de tu usuario MySQL; ajusta tambien
   `DB_USER` si no usas `root`. Guarda el archivo. No compartas `.env`.
4. Inicia la API desde esta carpeta:

   ```powershell
   C:\Users\monic\AppData\Local\Programs\Python\Python314\python.exe app.py
   ```

   Deja esa ventana abierta. La API debe quedar disponible en
   `http://127.0.0.1:5000`.
5. Abre `frontend/index.html` en el navegador y prueba guardar un registro.

La API devuelve un error HTTP 503 con un mensaje claro si MySQL no esta disponible o
si la conexion/configuracion es incorrecta. Las claves se guardan como hashes bcrypt;
por ese motivo no se pueden recuperar ni mostrar posteriormente. Al editar, deja el
campo de clave vacio para conservar el hash actual o introduce una clave nueva para
reemplazarlo.
