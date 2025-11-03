import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('PHPTravels Formulário de Reserva de Hotel', () => {
  const BASE_URL = 'https://phptravels.net/';

  const dadosReserva = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    country: 'Brazil',
    guest1FirstName: faker.person.firstName(),
    guest1LastName: faker.person.lastName(),
    guest2Title: 'Miss',
    guest2FirstName: faker.person.firstName(),
    guest2LastName: faker.person.lastName()
  };

  test('A partir da página inicial, deve selecionar um hotel e preencher os dados da reserva', async ({
    page
  }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'hotel-img' }).first().click();

    await expect(
      page.getByRole('button', { name: 'Book Now' }).first()
    ).toBeVisible();
    await page.getByRole('button', { name: 'Book Now' }).first().click();

    await expect(page.getByLabel('First Name')).toBeVisible();

    await page.getByLabel('First Name').fill(dadosReserva.firstName);

    await page.getByLabel('Last Name').fill(dadosReserva.lastName);

    await page.getByRole('textbox', { name: 'Email' }).fill(dadosReserva.email);

    await page.getByRole('textbox', { name: 'Phone' }).fill(dadosReserva.phone);

    await page
      .getByRole('textbox', { name: 'Address' })
      .fill(dadosReserva.address);

    await page
      .locator('input[name="firstname_1"]')
      .fill(dadosReserva.guest1FirstName);

    await page
      .locator('input[name="lastname_1"]')
      .fill(dadosReserva.guest1LastName);

    await page.getByRole('combobox', { name: 'United States' }).first().click();
    await page.getByRole('option', { name: dadosReserva.country }).click();

    await page
      .locator('select[name="title_2"]')
      .selectOption(dadosReserva.guest2Title);

    await page
      .locator('input[name="firstname_2"]')
      .fill(dadosReserva.guest2FirstName);
    await page

      .locator('input[name="lastname_2"]')
      .fill(dadosReserva.guest2LastName);

    await page.getByRole('combobox', { name: 'United States' }).click();
    await page.getByRole('option', { name: dadosReserva.country }).click();

    await expect(page.getByLabel('First Name')).toHaveValue(
      dadosReserva.firstName
    );

    await expect(page.getByLabel('Last Name')).toHaveValue(
      dadosReserva.lastName
    );

    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(
      dadosReserva.email
    );

    await expect(page.getByRole('textbox', { name: 'Phone' })).toHaveValue(
      dadosReserva.phone
    );

    await expect(page.getByRole('textbox', { name: 'Address' })).toHaveValue(
      dadosReserva.address
    );

    await expect(page.locator('input[name="firstname_1"]')).toHaveValue(
      dadosReserva.guest1FirstName
    );

    await expect(page.locator('input[name="lastname_1"]')).toHaveValue(
      dadosReserva.guest1LastName
    );

    await expect(page.locator('select[name="title_2"]')).toHaveValue(
      dadosReserva.guest2Title
    );

    await expect(page.locator('input[name="firstname_2"]')).toHaveValue(
      dadosReserva.guest2FirstName
    );

    await expect(page.locator('input[name="lastname_2"]')).toHaveValue(
      dadosReserva.guest2LastName
    );

    await expect(
      page.getByRole('combobox', { name: dadosReserva.country })
    ).toHaveCount(2);
  });
});
