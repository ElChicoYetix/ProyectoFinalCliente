import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Ruta a los archivos de prueba
  timeout: 30000, // Tiempo de espera para cada prueba (en milisegundos)
  retries: 1, // Número de reintentos para las pruebas fallidas
  workers: 1, // Número de trabajadores que se ejecutarán en paralelo
  use: {
    // Configuración común para todas las pruebas
    headless: true, // Ejecutar las pruebas sin abrir el navegador (true = sin interfaz gráfica)
    screenshot: 'only-on-failure', // Tomar capturas de pantalla solo en caso de error
    video: 'retain-on-failure', // Grabar video solo en caso de error
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] }, // Ejecutar las pruebas en un navegador de escritorio
    },
  ],
});
