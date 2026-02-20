# 🖐 Control de Movimientos por Gestos con la Mano

Aplicación web que permite controlar movimientos mediante gestos de la mano usando la cámara de la computadora.  
Utiliza **visión artificial con MediaPipe Hands** para detectar la posición de los dedos en tiempo real y convertirlos en órdenes.

---

## 🚀 Características

- 📷 Activación de cámara con botón **Empezar**
- ✋ Detección de mano en tiempo real
- 🧠 Reconocimiento de gestos simples basados en:
  - Cantidad de dedos levantados
  - Dirección del pulgar
  - Orientación de la palma
- 🔄 Reinicio automático cuando se detecta movimiento
- ❌ Mensaje `"Orden no reconocida"` si no coincide con un gesto válido
- 🎨 Interfaz moderna con Bootstrap (Navbar, Cards y Footer)

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Async/Await)
- Bootstrap 5
- MediaPipe Hands (Google)

---

## ✋ Comandos Disponibles

| Movimiento | Gesto |
|------------|--------|
| Avanzar | ☝️ 1 dedo hacia arriba |
| Retroceder | ✌️ 2 dedos hacia arriba |
| Vuelta derecha | 🤟 3 dedos hacia arriba |
| Vuelta izquierda | 🖖 4 dedos hacia arriba |
| 90° derecha | 👍 Pulgar hacia la derecha |
| 90° izquierda | 👈 Pulgar hacia la izquierda |
| Detener | 👎 Pulgar hacia abajo |
| 360° derecha | 🖐 Palma visible |
| 360° izquierda | 🤚 Mano hacia atrás |

---

## ⚙️ ¿Cómo funciona?

1. El usuario presiona el botón **Empezar**.
2. Se activa la cámara.
3. MediaPipe detecta los puntos clave (landmarks) de la mano.
4. Se analiza:
   - Cantidad de dedos levantados.
   - Orientación del pulgar.
   - Dirección de la palma.
5. Se muestra en pantalla el movimiento correspondiente.

Si el gesto no coincide con ninguna regla: Orden no reconocida
