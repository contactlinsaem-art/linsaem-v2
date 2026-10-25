import { expect, test } from "@playwright/test";

test.describe("Formulaire de contact", () => {
  test("une demande valide mène à la page de confirmation", async ({ page }) => {
    await page.goto("/contact?type=developpement");

    await expect(page.getByRole("radio", { name: "Développement sur mesure" })).toBeChecked();
    // La formule n'est proposée que pour un site vitrine.
    await expect(page.getByLabel("Formule envisagée")).toHaveCount(0);

    await page.getByLabel("Nom").fill("Personne Test");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Votre projet").fill("Une application de prise de rendez-vous pour mes clients.");
    await page.getByRole("button", { name: "Envoyer ma demande" }).click();

    await expect(page).toHaveURL(/\/merci$/);
    await expect(page.getByRole("heading", { level: 1, name: "Demande envoyée" })).toBeVisible();
  });

  test("le lien d'une formule préremplit le type et la formule", async ({ page }) => {
    await page.goto("/contact?type=vitrine&formule=pro");

    await expect(page.getByRole("radio", { name: "Site vitrine" })).toBeChecked();
    await expect(page.getByLabel("Formule envisagée")).toHaveValue("pro");
  });

  test("une saisie invalide affiche les erreurs sans quitter la page", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Nom").fill("A");
    await page.getByLabel("Email").fill("pas-un-email");
    await page.getByLabel("Votre activité et votre besoin").fill("court");
    await page.getByRole("button", { name: "Envoyer ma demande" }).click();

    await expect(page.getByRole("alert").filter({ hasText: "Certains champs sont à corriger" })).toBeVisible();
    await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Adresse email invalide.")).toBeVisible();
    // La saisie est conservée.
    await expect(page.getByLabel("Nom")).toHaveValue("A");
    await expect(page).toHaveURL(/\/contact/);
  });
});
