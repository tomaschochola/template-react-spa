import { test } from '@playwright/test';
import { assertStandardPage } from '@tomaschochola/tooling-playwright';
import { en } from '../../src/lang/en';

test('renders the home page', async ({ page }) => {
    await assertStandardPage(page, {
        heading: en['routes.index.h1'],
        title: en['routes.index.seo.title'],
        url: '/',
    });
});
