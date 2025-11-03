import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('PHPTravels Formulário de Cadastro', () => {
  const BASE_URL = 'https://phptravels.net/';

  const fakeUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    country: 'Brazil +55',
    phone: faker.string.numeric(10),
    email: faker.internet.email({ provider: 'e2etest.com' }),
    password: faker.internet.password({ length: 12, prefix: 'aB1!' })
  };

  test('A partir da página inicial, deve entrar na tela de cadastro e apenas preencher os campos de cadastro', async ({
    page
  }) => {
    await page.goto(BASE_URL);

    await page.getByRole('button', { name: 'Customer' }).click();
    await page.getByRole('link', { name: 'Signup' }).click();

    await expect(page.getByPlaceholder('Enter your first name')).toBeVisible();

    await page
      .getByPlaceholder('Enter your first name')
      .fill(fakeUser.firstName);

    await page.getByPlaceholder('Enter your last name').fill(fakeUser.lastName);

    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByRole('option', { name: fakeUser.country }).click();

    await page.getByPlaceholder('Enter your phone number').fill(fakeUser.phone);

    await page
      .getByPlaceholder('Enter your email address')
      .fill(fakeUser.email);

    await page
      .getByPlaceholder('Create a strong password')
      .fill(fakeUser.password);

    await expect(page.getByPlaceholder('Enter your first name')).toHaveValue(
      fakeUser.firstName
    );
    await expect(page.getByPlaceholder('Enter your last name')).toHaveValue(
      fakeUser.lastName
    );
    await expect(page.getByPlaceholder('Enter your phone number')).toHaveValue(
      fakeUser.phone
    );
    await expect(page.getByPlaceholder('Enter your email address')).toHaveValue(
      fakeUser.email
    );
    await expect(page.getByPlaceholder('Create a strong password')).toHaveValue(
      fakeUser.password
    );
    await expect(
      page.getByRole('combobox', { name: fakeUser.country })
    ).toBeVisible();
  });
});
