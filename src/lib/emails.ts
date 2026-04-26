import { Resend } from "resend";

function getResend() { return new Resend(process.env.RESEND_API_KEY || "placeholder"); }

const FROM = process.env.RESEND_FROM_EMAIL || "contact@linsaem.fr";
const TO_TEAM = process.env.RESEND_TO_EMAIL || "contact@linsaem.fr";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.linsaem.fr";

// ============================================
// Email : Confirmation au client après contact
// ============================================
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  formule?: string;
  message?: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM <${FROM}>`,
    to: data.email,
    subject: "✅ Votre demande a bien été reçue — LINSAEM",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:40px 40px 32px;">
      <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:24px;">
        <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;">L</div>
        <span style="color:white;font-size:20px;font-weight:800;letter-spacing:1px;">LINSAEM</span>
      </div>
      <h1 style="color:white;font-size:26px;font-weight:700;margin:0;line-height:1.3;">Merci ${data.name} !<br>Votre demande est bien reçue. ✨</h1>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 24px;">
        Nous avons bien reçu votre demande et nous vous recontactons <strong>sous 24h</strong> avec une proposition personnalisée.
      </p>

      ${data.formule ? `
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="margin:0;color:#0369a1;font-size:14px;font-weight:600;">Formule souhaitée</p>
        <p style="margin:4px 0 0;color:#0c4a6e;font-size:18px;font-weight:700;">${data.formule}</p>
      </div>
      ` : ""}

      <div style="background:#fafafa;border-radius:12px;padding:20px;margin-bottom:32px;">
        <p style="margin:0 0 12px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">En attendant</p>
        <ul style="margin:0;padding:0 0 0 20px;color:#374151;font-size:15px;line-height:2;">
          <li>Consultez nos <a href="${APP_URL}/#realisations" style="color:#0ea5e9;">réalisations</a> pour vous inspirer</li>
          <li>Préparez vos contenus (textes, photos, logo)</li>
          <li>Notez vos couleurs préférées</li>
        </ul>
      </div>

      <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
        <p style="color:#6b7280;font-size:14px;margin:0 0 8px;">Des questions ? Contactez-nous directement :</p>
        <a href="mailto:contact@linsaem.fr" style="color:#0ea5e9;font-size:14px;text-decoration:none;">📧 contact@linsaem.fr</a>&nbsp;&nbsp;
        <a href="tel:+33189701526" style="color:#0ea5e9;font-size:14px;text-decoration:none;">📱 +33 1 89 70 15 26</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
        © 2025 LINSAEM · <a href="${APP_URL}" style="color:#9ca3af;">linsaem.fr</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Alerte interne nouveau lead
// ============================================
export async function sendLeadAlert(data: {
  name: string;
  email: string;
  phone?: string;
  formule?: string;
  message?: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM Alertes <${FROM}>`,
    to: TO_TEAM,
    subject: `🔔 Nouveau lead : ${data.name} — ${data.formule || "Non précisé"}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:500px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:2px solid #0ea5e9;">
    <div style="background:#0ea5e9;padding:20px 28px;">
      <h2 style="margin:0;color:white;font-size:18px;">🔔 Nouveau lead entrant</h2>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:120px;">Nom</td><td style="padding:8px 0;color:#111827;font-weight:600;">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#0ea5e9;">${data.email}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Téléphone</td><td style="padding:8px 0;"><a href="tel:${data.phone}" style="color:#0ea5e9;">${data.phone}</a></td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Formule</td><td style="padding:8px 0;"><strong style="background:#f0f9ff;color:#0369a1;padding:2px 10px;border-radius:20px;font-size:13px;">${data.formule || "Non précisé"}</strong></td></tr>
      </table>
      ${data.message ? `
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-top:16px;">
        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;">Message</p>
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${data.message}</p>
      </div>
      ` : ""}
      <div style="margin-top:24px;">
        <a href="mailto:${data.email}" style="background:#0ea5e9;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Répondre au client →</a>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Confirmation de commande (abonnement signé)
// ============================================
export async function sendOrderConfirmation(data: {
  name: string;
  email: string;
  formule: string;
  prix: number;
  dashboardUrl: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM <${FROM}>`,
    to: data.email,
    subject: `🎉 Bienvenue chez LINSAEM — Votre site ${data.formule} est en cours !`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    
    <div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:40px;">
      <div style="text-align:center;margin-bottom:20px;">
        <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">🎉</div>
      </div>
      <h1 style="color:white;font-size:28px;font-weight:700;margin:0;text-align:center;">Bienvenue ${data.name} !</h1>
      <p style="color:rgba(255,255,255,0.85);text-align:center;margin:8px 0 0;font-size:16px;">Votre abonnement ${data.formule} est activé</p>
    </div>

    <div style="padding:40px;">
      <div style="background:linear-gradient(135deg,#f0f9ff,#faf5ff);border-radius:12px;padding:24px;margin-bottom:32px;text-align:center;">
        <p style="margin:0 0 4px;color:#6b7280;font-size:14px;">Votre formule</p>
        <p style="margin:0;color:#111827;font-size:32px;font-weight:800;">${data.formule}</p>
        <p style="margin:4px 0 0;color:#0ea5e9;font-size:20px;font-weight:700;">${data.prix}€<span style="font-size:14px;color:#6b7280;">/mois</span></p>
      </div>

      <h3 style="color:#111827;font-size:16px;font-weight:700;margin:0 0 16px;">🚀 La suite :</h3>
      <div style="space-y:12px;">
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="width:28px;height:28px;background:#0ea5e9;border-radius:50%;color:white;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div>
          <p style="margin:0;color:#374151;font-size:15px;padding-top:4px;">Notre équipe vous contacte <strong>sous 24h</strong> pour recueillir vos contenus</p>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="width:28px;height:28px;background:#8b5cf6;border-radius:50%;color:white;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div>
          <p style="margin:0;color:#374151;font-size:15px;padding-top:4px;">Nous créons votre site en <strong>24-48h</strong> et vous envoyons un lien de prévisualisation</p>
        </div>
        <div style="display:flex;gap:12px;">
          <div style="width:28px;height:28px;background:#ec4899;border-radius:50%;color:white;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</div>
          <p style="margin:0;color:#374151;font-size:15px;padding-top:4px;">Après validation, votre site est <strong>en ligne</strong> !</p>
        </div>
      </div>

      <div style="margin-top:32px;text-align:center;">
        <a href="${data.dashboardUrl}" style="background:linear-gradient(135deg,#0ea5e9,#8b5cf6);color:white;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:15px;font-weight:700;display:inline-block;">Accéder à mon espace client →</a>
      </div>
    </div>

    <div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">© 2025 LINSAEM · contact@linsaem.fr · +33 1 89 70 15 26</p>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Bienvenue + lien création mot de passe
// ============================================
export async function sendWelcomeEmail(data: {
  name: string;
  email: string;
  formule: string;
  setPasswordUrl: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM <${FROM}>`,
    to: data.email,
    subject: "🎉 Votre compte LINSAEM est prêt — Définissez votre mot de passe",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:40px;">
      <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:24px;">
        <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;">L</div>
        <span style="color:white;font-size:20px;font-weight:800;letter-spacing:1px;">LINSAEM</span>
      </div>
      <h1 style="color:white;font-size:26px;font-weight:700;margin:0;line-height:1.3;">🎉 Bienvenue ${data.name} !</h1>
    </div>
    <div style="padding:40px;">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 16px;">
        Votre abonnement <strong>${data.formule}</strong> est activé. Cliquez ci-dessous pour créer votre mot de passe et accéder à votre espace client.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${data.setPasswordUrl}" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:16px 36px;border-radius:100px;text-decoration:none;font-size:16px;font-weight:700;display:inline-block;">
          Créer mon mot de passe →
        </a>
      </div>
      <p style="color:#9ca3af;font-size:13px;text-align:center;margin:0;">
        Ce lien est valable <strong>7 jours</strong>. Passé ce délai, contactez-nous à 
        <a href="mailto:contact@linsaem.fr" style="color:#0ea5e9;">contact@linsaem.fr</a>.
      </p>
    </div>
    <div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">© 2025 LINSAEM · contact@linsaem.fr</p>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Site mis en ligne
// ============================================
export async function sendSiteOnlineEmail(data: {
  name: string;
  email: string;
  siteUrl: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM <${FROM}>`,
    to: data.email,
    subject: "🎉 Votre site est en ligne !",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:40px;text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">🎉</div>
      <h1 style="color:white;font-size:26px;font-weight:700;margin:0;">Votre site est en ligne !</h1>
    </div>
    <div style="padding:40px;text-align:center;">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 32px;">
        Bonjour <strong>${data.name}</strong>, votre site est maintenant accessible en ligne. Visitez-le dès maintenant !
      </p>
      <a href="${data.siteUrl}" style="background:linear-gradient(135deg,#0ea5e9,#8b5cf6);color:white;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:15px;font-weight:700;display:inline-block;">
        Visiter mon site →
      </a>
    </div>
    <div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">© 2025 LINSAEM · contact@linsaem.fr</p>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Alerte nouveau message client (admin)
// ============================================
export async function sendNewMessageAlert(data: {
  clientName: string;
  contenu: string;
  adminUrl: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM Alertes <${FROM}>`,
    to: TO_TEAM,
    subject: `💬 Nouveau message de ${data.clientName}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:500px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:2px solid #8b5cf6;">
    <div style="background:#8b5cf6;padding:20px 28px;">
      <h2 style="margin:0;color:white;font-size:18px;">💬 Nouveau message client</h2>
    </div>
    <div style="padding:28px;">
      <p style="color:#374151;margin:0 0 16px;"><strong>${data.clientName}</strong> vous a envoyé un message :</p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${data.contenu}</p>
      </div>
      <a href="${data.adminUrl}" style="background:#8b5cf6;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Répondre →</a>
    </div>
  </div>
</body>
</html>
    `,
  });
}

// ============================================
// Email : Notification message admin → client
// ============================================
export async function sendAdminMessageNotification(data: {
  clientName: string;
  clientEmail: string;
  contenu: string;
  dashboardUrl: string;
}) {
  return getResend().emails.send({
    from: `LINSAEM <${FROM}>`,
    to: data.clientEmail,
    subject: "💬 Nouveau message de l'équipe LINSAEM",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:32px 40px;">
      <h1 style="color:white;font-size:22px;font-weight:700;margin:0;">💬 Nouveau message de l'équipe</h1>
    </div>
    <div style="padding:40px;">
      <p style="color:#374151;font-size:16px;margin:0 0 16px;">Bonjour <strong>${data.clientName}</strong>,</p>
      <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:0 8px 8px 0;padding:16px;margin-bottom:24px;">
        <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${data.contenu}</p>
      </div>
      <a href="${data.dashboardUrl}" style="background:linear-gradient(135deg,#0ea5e9,#8b5cf6);color:white;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:15px;font-weight:700;display:inline-block;">
        Voir dans mon espace client →
      </a>
    </div>
    <div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">© 2025 LINSAEM · contact@linsaem.fr</p>
    </div>
  </div>
</body>
</html>
    `,
  });
}
