# Proyecto web DUOC (Programación web)

## Descripción

Proyecto para la asignatura de programación web, en primera instancia se desarrollo una página web simple con HTML, CSS y BOOTSTRAP 4 para luego integrar JavaScript. Ahora este proyecto lo uniremos con Django.

## Tecnologías utilizadas

- HTML5
- CSS3
- BOOTSTRAP
- JAVASCRIPT
- DJANGO

## Instalación y configuración

```bash
Version de Django 3.0.6
```
<br>

### Pasos previos:
<hr>

1.- Asegúrate de tener Python instalado en tu sistema. Puedes descargarlo desde el sitio web oficial de Python (https://www.python.org) y seguir las instrucciones de instalación.

2.- Instala pip, el administrador de paquetes de Python. Normalmente, se instala automáticamente con Python, pero en caso de que no lo tengas, puedes seguir las instrucciones en el sitio web oficial de Python para instalarlo.

3.- Debes tener previamente instalado XAMPP, que sera el servidor a utilizar para la base de datos.

4.- Instala virtualenv para crear un entorno virtual aislado para tu proyecto Django. Abre la línea de comandos (Command Prompt en Windows o Terminal en macOS) y ejecuta el siguiente comando:

```bash
pip install virtualenv
```
<br>

### Pasos para clonar y trabajar con el repositorio en Windows:
<hr>

1.- Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/Compuelec/webDuocPasteleria.git
```
2.- Crea un entorno virtual para el proyecto (Este entorno virtual debe ir en la carpeta principal donde se almacenará el proyecto):
```bash
proyectosDuoc> python -m venv virtualWebDuoc
```
3.- Activa el entorno virtual:
```bash
proyectosDuoc\virtualWebDuoc\Scripts> ./activate
```
4.- Para instalar Django en tu entorno virtual, accede a la carpeta del entorno virtual y debes ingresar el siguiente comando:
```bash
proyectosDuoc\virtualWebDuoc> pip install Django==3.0.6
```
5.- Luego de instalar Django debes instalar las dependencias del proyecto con el siguiente comando:
```bash
proyectosDuoc\webDuocPasteleria> pip install -r requirements.txt
```
6.- Luego debes ingresar a Phpmyadmin en XAMPP para poder importar el archivo que contiene la base de datos: pasteleria.sql esta en la raiz del proyecto

7.- Luego de haber realizado todos los pasos podras ejecutar el servidor de desarrollo de Django, debes regresar a tu carpeta principal, ingresar a la caarpeta del proyecto y posteriormente ingresar el siguiente comando para la ejecucion del proyecto:
```bash
proyectosDuoc\webDuocPasteleria> python manage.py runserver
```
8.- Django iniciará el servidor en http://127.0.0.1:8000/ (localhost en el puerto 8000) de forma predeterminada. Puedes abrir tu navegador web y visitar esa dirección para ver el proyecto en funcionamiento.

<br>

### Pasos para clonar y trabajar con el repositorio en macOS:
<hr>

1.- Clona el repositorio ejecutando el siguiente comando:
```bash
git clone https://github.com/Compuelec/webDuocPasteleria.git
```
2.- Crea un entorno virtual para el proyecto:
```bash
virtualenv env
```
3.- Activa el entorno virtual:
```bash
source env/bin/activate
```
4.- Para ejecutar el servidor de desarrollo de Django, usa el siguiente comando:
```bash
python manage.py runserver
```
5.- Django iniciará el servidor en http://127.0.0.1:8000/ (localhost en el puerto 8000) de forma predeterminada. Puedes abrir tu navegador web y visitar esa dirección para ver el proyecto en funcionamiento

<br>

## Integrantes

- Paula Palma
- Oscar Santander
- Carlos Abarca


![Web_Duoc](https://github.com/Compuelec/proyecto_web_duoc/assets/105996405/914883d2-10f1-4a55-a889-16495736aab7)

<br>

## Sección de Admin

<br>

![webDuocPasteleria-admin](https://github.com/Compuelec/webDuocPasteleria/assets/105996405/1e58d10d-b3a8-45b9-a428-5b92db5872b3)
