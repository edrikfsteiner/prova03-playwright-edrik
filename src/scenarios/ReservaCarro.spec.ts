import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';
import { faker } from '@faker-js/faker';

test.describe('PHPTravels Formulário de Reserva de Hotel com ZeroStep', () => {
  const BASE_URL = 'https://phptravels.net/';

  const dadosReserva = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    guest1Country: 'Brazil',
    guest1FirstName: faker.person.firstName(),
    guest1LastName: faker.person.lastName(),
    guest2Title: 'Miss',
    guest2FirstName: faker.person.firstName(),
    guest2LastName: faker.person.lastName()
  };

  test('A partir da página inicial, deve selecionar um carro e preencher os dados da reserva (usando ZeroStep)', async ({page}) => {
    await page.goto(BASE_URL);

    await ai(`Click the first button with name 'Book Now'`, { page, test });

    await expect(page.getByLabel('First Name')).toBeVisible();

    await ai(
      `Fill in the field with label 'First Name' with "${dadosReserva.firstName}"`,
      { page, test }
    );

    await ai(
      `Fill in the field with label 'Last Name' with "${dadosReserva.lastName}"`,
      { page, test }
    );

    await ai(
      `Fill in the textbox with name 'Email' with "${dadosReserva.email}"`,
      { page, test }
    );

    await ai(
      `Fill in the textbox with name 'Phone' with "${dadosReserva.phone}"`,
      { page, test }
    );

    await ai(
      `Fill in the textbox with name 'Address' with "${dadosReserva.address}"`,
      { page, test }
    );

    await ai(
      `Fill in the input with name 'firstname_1' with "${dadosReserva.guest1FirstName}"`,
      { page, test }
    );

    await ai(
      `Fill in the input with name 'lastname_1' with "${dadosReserva.guest1LastName}"`,
      { page, test }
    );

    await ai(`Click the first combobox with name 'United States'`, {
      page,
      test
    });

    await ai(`Click the option '${dadosReserva.guest1Country}'`, {
      page,
      test
    });

    await ai(
      `Select '${dadosReserva.guest2Title}' from the dropdown with name 'title_2'`,
      { page, test }
    );

    await ai(
      `Fill in the input with name 'firstname_2' with "${dadosReserva.guest2FirstName}"`,
      { page, test }
    );

    await ai(
      `Fill in the input with name 'lastname_2' with "${dadosReserva.guest2LastName}"`,
      { page, test }
    );

    await ai(`Click the 'Pay Later' payment option`, { page, test });

    await ai(`Check the checkbox 'I agree to all Terms &'`, { page, test });

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
      page.getByRole('combobox', { name: dadosReserva.guest1Country })
    ).toBeVisible();

    await expect(
      page.getByRole('checkbox', { name: 'I agree to all Terms &' })
    ).toBeChecked();
  });
});
