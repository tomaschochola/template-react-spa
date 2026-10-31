import { expect, test } from '@playwright/test';
import { assertNoAxeViolations, assertStandardPage } from '@tomaschochola/tooling-playwright';
import { en } from '../../src/lang/en';

test('renders the home page', async ({ page }) => {
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

    await assertStandardPage(page, {
        heading: en['routes.index.h1'],
        title: en['routes.index.seo.title'],
        url: '/',
    });
    await expect(
        page.getByRole('heading', {
            level: 2,
            name: 'Ada Lovelace',
        }),
    ).toBeVisible();
    await assertNoAxeViolations(page);
});
