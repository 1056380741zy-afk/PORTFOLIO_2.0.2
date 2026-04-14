import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {
  // Add a small delay for animations to finish
  const waitForAnimations = async (page: any) => {
    await page.waitForTimeout(1500); 
  };

  test('Home Page Visual Baseline', async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05, // Allow 5% difference for dynamic content like spinning compass
    });
  });

  test('Journey Page Visual Baseline', async ({ page }) => {
    await page.goto('/journey');
    await waitForAnimations(page);
    await expect(page).toHaveScreenshot('journey-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('Projects Page Visual Baseline', async ({ page }) => {
    await page.goto('/projects');
    await waitForAnimations(page);
    await expect(page).toHaveScreenshot('projects-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
