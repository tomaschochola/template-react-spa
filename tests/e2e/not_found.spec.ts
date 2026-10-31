import { test } from '@playwright/test';
import { assertStandardPage } from '@tomaschochola/tooling-playwright';
import { en } from '../../src/lang/en';

test('renders the not-found page', async ({ page }) => {
    await assertStandardPage(page, {
        heading: en['routes.not_found.h1'],
        title: en['routes.not_found.seo.title'],
        url: '/not_found',
    });
});
