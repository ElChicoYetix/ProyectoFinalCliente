import { test, expect } from '@playwright/test';

test('Login test', async ({ page }) => {
  // Navega a la página de inicio de sesión
  await page.goto('http://localhost:4200/login');

  // Rellenar los campos de email y contraseña
  await page.fill('input[id="email"]', 'salamaleco@hotmail.com');
  await page.fill('input[id="password"]', 'Hola12345');

  // Hacer clic en el botón de login
  await page.click('button[type="submit"]');

  // Esperar a que la navegación ocurra después del login
  await page.waitForNavigation();

  // Verificar que la página redirige correctamente al home (o cualquier otra comprobación)
  await expect(page).toHaveURL('http://localhost:4200/home');
});
