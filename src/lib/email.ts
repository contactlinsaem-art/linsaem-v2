import "server-only";
import type { ReactElement } from "react";
import { render, toPlainText } from "react-email";
import { Resend } from "resend";

let client: Resend | null = null;

function getResend(): Resend {
  if (client) return client;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY manquante");
  client = new Resend(key);
  return client;
}

type Envoi = { to: string; subject: string; email: ReactElement; replyTo?: string };

export async function envoyerEmail({ to, subject, email, replyTo }: Envoi): Promise<void> {
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error("CONTACT_FROM_EMAIL manquante");

  const html = await render(email);
  const { error } = await getResend().emails.send({
    from: `LINSAEM <${from}>`,
    to,
    subject,
    html,
    text: toPlainText(html),
    replyTo,
  });
  if (error) throw new Error(`Resend : ${error.message}`);
}
