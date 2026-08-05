/**
 * @file
 * @author Tomáš Chochola <tomaschochola@tomaschochola.cz>
 * @copyright © 2026 Tomáš Chochola <tomaschochola@tomaschochola.cz>
 *
 * @license CC-BY-ND-4.0
 *
 * @see {@link https://creativecommons.org/licenses/by-nd/4.0/} License
 * @see {@link https://github.com/tomaschochola} GitHub Profile
 * @see {@link https://github.com/sponsors/tomaschochola} GitHub Sponsors
 */

import { expect, test } from '@playwright/test';
import { en } from '../src/lang/en';
import { assertAxe, loadPage } from './test';

test('/', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
    await route.fulfill({
      json: [
        {
          email: 'ada@example.com',
          id: 1,
          name: 'Ada Lovelace',
          phone: '+44 20 0000 0000',
          username: 'ada',
          website: 'example.com',
        },
      ],
    });
  });

  await loadPage(page, '/');

  await expect(page).toHaveTitle(en['routes.index.seo.title']);
  await expect(page.getByRole('heading', {
    level: 2,
    name: 'Ada Lovelace',
  })).toBeVisible();

  await assertAxe(page);
});
