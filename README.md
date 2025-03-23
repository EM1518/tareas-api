# API de Gestión de Tareas

## Elisanna María Martínez Sánchez 
## 23-EISN-2-074 

## Descripción General

Esta API permite gestionar una lista de tareas, ofreciendo operaciones básicas como crear, leer, actualizar y eliminar tareas (CRUD). Ha sido desarrollada con Node.js y Express, y está desplegada en Vercel.

## URL Base

```
https://tareas-api-two.vercel.app
```

## Características principales

- Gestión de tareas (crear, listar, actualizar, eliminar)
- Límite máximo de 5 tareas
- Formato de respuestas en JSON
- Validación de datos de entrada

## Endpoints

### Página principal

- **URL**: `https://tareas-api-two.vercel.app/
`
- **Método**: `GET`
- **Descripción**: Muestra todas las tareas disponibles en el sistema.
- **Respuesta exitosa**:
  - **Código**: 200
  - **Contenido**: 
    ```json
    {
      "tasks": [
        { "id": 0, "name": "Tarea 1" },
        { "id": 1, "name": "Tarea 2" }
      ]
    }
    ```
  - Si no hay tareas:
    ```json
    {
      "message": "No hay tareas.",
      "tasks": []
    }
    ```

### 1. Agregar una tarea

- **URL**: `https://tareas-api-two.vercel.app/tasks`
- **Método**: `POST`
- **Descripción**: Agrega una nueva tarea a la lista.
- **Datos requeridos**:
  ```json
  {
    "task": "Nombre de la tarea"
  }
  ```
- **Respuesta exitosa**:
  - **Código**: 201
  - **Contenido**: 
    ```json
    {
      "message": "Tarea \"Nombre de la tarea\" agregada.",
      "tasks": ["Tarea 1", "Nombre de la tarea"]
    }
    ```
- **Respuestas de error**:
  - **Código**: 400 (Datos incorrectos)
    ```json
    { "error": "El nombre de la tarea es requerido" }
    ```
  - **Código**: 400 (Límite alcanzado)
    ```json
    { "error": "No puedes agregar más tareas. Límite alcanzado." }
    ```

### 2. Listar todas las tareas

- **URL**: `https://tareas-api-two.vercel.app/tasks`
- **Método**: `GET`
- **Descripción**: Obtiene todas las tareas disponibles en el sistema.
- **Respuesta exitosa**:
  - **Código**: 200
  - **Contenido**: 
    ```json
    {
      "tasks": [
        { "id": 0, "name": "Tarea 1" },
        { "id": 1, "name": "Tarea 2" }
      ]
    }
    ```
  - Si no hay tareas:
    ```json
    {
      "message": "No hay tareas.",
      "tasks": []
    }
    ```

### 3. Eliminar una tarea

- **URL**: `https://tareas-api-two.vercel.app/tasks/0`
- **Método**: `DELETE`
- **Descripción**: Elimina una tarea específica por su ID.
- **Parámetros URL**:
  - `id`: El índice/ID de la tarea a eliminar
- **Respuesta exitosa**:
  - **Código**: 200
  - **Contenido**: 
    ```json
    {
      "message": "Tarea \"Nombre de la tarea\" eliminada.",
      "tasks": ["Tarea 1"]
    }
    ```
- **Respuesta de error**:
  - **Código**: 400
  - **Contenido**: 
    ```json
    { "error": "Índice inválido." }
    ```

### 4. Actualizar una tarea

- **URL**: `https://tareas-api-two.vercel.app/tasks/1`
- **Método**: `PUT`
- **Descripción**: Actualiza el nombre de una tarea existente.
- **Parámetros URL**:
  - `id`: El índice/ID de la tarea a actualizar
- **Datos requeridos**:
  ```json
  {
    "task": "Nuevo nombre de la tarea"
  }
  ```
- **Respuesta exitosa**:
  - **Código**: 200
  - **Contenido**: 
    ```json
    {
      "message": "Tarea actualizada a \"Nuevo nombre de la tarea\"",
      "tasks": ["Tarea 1", "Nuevo nombre de la tarea"]
    }
    ```
- **Respuestas de error**:
  - **Código**: 400 (Datos incorrectos)
    ```json
    { "error": "El nombre de la tarea es requerido" }
    ```
  - **Código**: 400 (ID incorrecto)
    ```json
    { "error": "Índice inválido." }
    ```

## Limitaciones

- La API tiene un límite máximo de 5 tareas.
- Los datos se almacenan en memoria, por lo que se perderán si el servidor se reinicia.
