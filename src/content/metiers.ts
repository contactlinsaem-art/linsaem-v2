import type { QuestionReponse } from "./faq";
import { formatPrix, formules, prixMinimum } from "./offres";
import { estVisible } from "@/lib/brouillons";

type Point = { titre: string; texte: string };

export type Metier = {
  slug: string;
  /** Complète « Création de site internet pour … » */
  cible: string;
  metaTitre: string;
  metaDescription: string;
  intro: string;
  besoins: Point[];
  fonctionnalites: Point[];
  /** Modèle de design conseillé, et pourquoi. */
  modele: { slug: string; raison: string };
  /** Réalisation correspondante, si elle existe. */
  realisation?: string;
  faq: QuestionReponse[];
  /** Brouillon tant que false : visible en local et en preview seulement. */
  publie: boolean;
};

const prixMaximum = Math.max(...formules.map((f) => f.prixMensuelTTC));
const fraisMiseEnService = formules[0]?.fraisMiseEnServiceTTC ?? 0;
const desDe = `Dès ${formatPrix(prixMinimum)} TTC par mois`;

export const metiers: Metier[] = [
  {
    slug: "artisan",
    cible: "artisan",
    metaTitre: "Création de site internet pour artisan : devis, zone, urgences",
    metaDescription: `Site internet pour artisan du bâtiment : demandes de devis, zone d'intervention, numéro d'urgence cliquable et photos de chantiers. ${desDe}, hébergement inclus.`,
    intro:
      "Plombier, électricien, menuisier, couvreur ou maçon : vos clients vous cherchent souvent dans l'urgence, depuis leur téléphone, avec le nom de leur ville. Le site doit leur dire en quelques secondes ce que vous faites, où vous intervenez et comment vous joindre.",
    besoins: [
      {
        titre: "Être trouvé dans votre secteur",
        texte:
          "La plupart des recherches associent un métier et une ville : « plombier Antony », « électricien Massy ». Une page qui cite clairement vos communes d'intervention a plus de chances d'apparaître sur ces requêtes.",
      },
      {
        titre: "Être joint tout de suite",
        texte:
          "Un client face à une fuite ne remplit pas un long formulaire : il appelle. Le numéro doit être visible en haut de chaque page et lancer l'appel d'un simple toucher.",
      },
      {
        titre: "Recevoir des devis exploitables",
        texte:
          "Pour chiffrer un chantier, il faut connaître la nature des travaux, l'adresse et le délai souhaité. Un formulaire bien pensé évite les allers-retours avant le premier rendez-vous.",
      },
    ],
    fonctionnalites: [
      { titre: "Bouton d'appel fixe sur mobile", texte: "Toujours visible pendant le défilement, il compose votre numéro directement." },
      {
        titre: "Prestations détaillées",
        texte: "Une rubrique par type d'intervention (dépannage, installation, rénovation), avec ce qui est compris.",
      },
      { titre: "Zone d'intervention", texte: "Les communes et départements couverts, écrits en toutes lettres pour les moteurs de recherche." },
      {
        titre: "Formulaire de devis guidé",
        texte: "Nature des travaux, adresse, degré d'urgence et coordonnées : la demande arrive complète dans votre boîte mail.",
      },
      { titre: "Chantiers en photos", texte: "Quelques réalisations avant / après rassurent davantage qu'un long discours." },
      {
        titre: "Assurances et qualifications",
        texte: "Assurance décennale, qualifications RGE ou Qualibat : les afficher répond à une question que chaque client se pose.",
      },
    ],
    modele: {
      slug: "ferrand-plomberie",
      raison: "Numéro d'urgence en tête de page, prestations, zone d'intervention et demande de devis.",
    },
    faq: [
      {
        question: "Quelle formule choisir pour un site d'artisan ?",
        reponse:
          "La formule Starter suffit pour une page qui présente vos prestations, votre zone et vos coordonnées. La formule Pro, jusqu'à 3 pages, ajoute une galerie de chantiers et une carte : c'est la plus adaptée pour montrer vos réalisations.",
      },
      {
        question: "Puis-je modifier mes prestations ou mes tarifs ?",
        reponse:
          "Envoyez la modification par email : elle est faite sous 48 h ouvrées. Selon la formule, 1 ou 3 modifications par mois sont incluses, et les modifications mineures sont illimitées en formule Business.",
      },
      {
        question: "Le nom de domaine est-il à mon nom ?",
        reponse:
          "Oui. Il est enregistré à votre nom et vous reste en cas de résiliation. Le design et le code restent la propriété de LINSAEM, qui en assure l'hébergement et la maintenance pendant l'abonnement.",
      },
      {
        question: "En combien de temps le site est-il en ligne ?",
        reponse:
          "Un premier aperçu est envoyé sous 48 à 72 h ouvrées après réception de vos textes, photos et logo. Le site est mis en ligne dès le paiement.",
      },
    ],
    publie: false,
  },
  {
    slug: "estheticienne",
    cible: "esthéticienne",
    metaTitre: "Création de site internet pour esthéticienne et institut de beauté",
    metaDescription: `Site internet pour esthéticienne, en institut ou à domicile : carte des soins, tarifs, horaires et prise de rendez-vous en un clic. ${desDe}.`,
    intro:
      "Avant de réserver un soin, une cliente veut savoir ce que vous proposez, combien cela coûte et quand vous êtes disponible. Que vous receviez en institut, en cabinet ou à domicile, le site doit répondre à ces trois questions sans qu'elle ait à appeler pour les poser.",
    besoins: [
      {
        titre: "Une carte des soins lisible",
        texte:
          "Épilations, soins du visage et du corps, beauté des mains et des pieds, maquillage : une offre riche se présente par catégories, avec la durée et le prix de chaque prestation.",
      },
      {
        titre: "Préciser le lieu du soin",
        texte:
          "Si vous vous déplacez, indiquez pour chaque soin s'il se fait en institut, à domicile ou les deux, et jusqu'à quelle distance vous vous rendez.",
      },
      {
        titre: "Faciliter la prise de rendez-vous",
        texte:
          "Appel, SMS ou lien vers votre outil de réservation : le bouton de rendez-vous doit être présent sur chaque écran, sans avoir à le chercher.",
      },
    ],
    fonctionnalites: [
      { titre: "Grille tarifaire par catégorie", texte: "Facile à mettre à jour quand vos prix ou vos soins évoluent." },
      { titre: "Repère institut / domicile", texte: "Une étiquette sur chaque soin, et la zone de déplacement indiquée clairement." },
      {
        titre: "Bouton de rendez-vous",
        texte: "Vers votre téléphone, ou vers Planity, Treatwell ou l'outil de réservation que vous utilisez déjà.",
      },
      { titre: "Horaires et accès", texte: "Jours d'ouverture, adresse du cabinet et plan d'accès." },
      { titre: "Offres du moment", texte: "Une offre de bienvenue ou un forfait de saison mis en avant en haut de page." },
    ],
    modele: {
      slug: "cap-equilibre",
      raison: "Prestations avec tarifs et choix d'un créneau de rendez-vous, sur une mise en page douce et aérée.",
    },
    realisation: "aux-mille-et-une-beautes",
    faq: [
      {
        question: "Le site peut-il renvoyer vers mon outil de réservation en ligne ?",
        reponse:
          "Oui. Si vous utilisez déjà un outil de réservation, le bouton de rendez-vous y mène directement. Sinon, il compose votre numéro ou ouvre un SMS.",
      },
      {
        question: "Mes tarifs changent souvent, est-ce un problème ?",
        reponse:
          "Non. Envoyez la nouvelle grille par email, elle est en ligne sous 48 h ouvrées. Un changement de prix ou de soin compte comme une modification mineure.",
      },
      {
        question: "Je travaille uniquement à domicile, un site est-il utile ?",
        reponse:
          "D'autant plus : sans vitrine physique, le site est souvent le premier contact. Il présente vos soins, votre zone de déplacement et rassure sur votre sérieux (diplôme, hygiène du matériel).",
      },
      {
        question: "Quelle formule pour un institut ?",
        reponse:
          "La formule Pro, jusqu'à 3 pages, permet de séparer la carte des soins, la présentation de l'institut et le contact, avec une galerie photos et une carte Google Maps.",
      },
    ],
    publie: false,
  },
  {
    slug: "restaurant",
    cible: "restaurant",
    metaTitre: "Création de site internet pour restaurant : carte, horaires, réservation",
    metaDescription: `Site internet pour restaurant, bistrot ou pizzeria : carte lisible sur mobile, horaires à jour, photos des plats et réservation. ${desDe}.`,
    intro:
      "La plupart des clients découvrent un restaurant sur leur téléphone, quelques heures ou quelques minutes avant de passer à table. Ils veulent voir la carte, vérifier que vous êtes ouvert et réserver. Un PDF illisible ou des horaires périmés suffisent à les envoyer ailleurs.",
    besoins: [
      {
        titre: "Une carte consultable sur mobile",
        texte:
          "En texte plutôt qu'en PDF : elle se lit sans zoomer, se met à jour rapidement et peut être lue par les moteurs de recherche.",
      },
      {
        titre: "Des horaires fiables",
        texte:
          "Service du midi et du soir, jours de fermeture, congés annuels : une information fausse coûte une table, et parfois un avis négatif.",
      },
      {
        titre: "Donner envie",
        texte:
          "Quelques photos soignées de la salle et des assiettes font souvent plus pour la réservation qu'un long texte de présentation.",
      },
    ],
    fonctionnalites: [
      { titre: "Carte par onglets", texte: "Entrées, plats, desserts, boissons : chaque rubrique s'affiche sans recharger la page." },
      { titre: "Menus du moment", texte: "Le menu du midi ou la carte de saison dans une zone dédiée, simple à faire évoluer." },
      {
        titre: "Réservation",
        texte: "Un formulaire de demande, un bouton d'appel ou un lien vers votre outil de réservation (TheFork, Zenchef…).",
      },
      { titre: "Horaires et plan d'accès", texte: "Avec une carte Google Maps et les informations de stationnement." },
      { titre: "Allergènes", texte: "La présence des 14 allergènes majeurs peut être signalée plat par plat." },
    ],
    modele: {
      slug: "maison-olivette",
      raison: "Carte par onglets, histoire de la maison, horaires et formulaire de réservation.",
    },
    faq: [
      {
        question: "Faut-il un site si je suis déjà sur Google et TripAdvisor ?",
        reponse:
          "Ces plateformes affichent vos avis, mais vous n'y maîtrisez ni la présentation ni toutes les informations. Le site est la source officielle : votre carte, vos horaires, vos photos, et une adresse que vous pouvez indiquer partout.",
      },
      {
        question: "Puis-je changer la carte à chaque saison ?",
        reponse:
          "Oui. Envoyez la nouvelle carte par email, elle est en ligne sous 48 h ouvrées. Un changement de carte compte comme une modification.",
      },
      {
        question: "Le site peut-il prendre les réservations ?",
        reponse:
          "Il peut afficher un formulaire de demande de réservation qui vous parvient par email, ou renvoyer vers l'outil que vous utilisez déjà. Un système de réservation avec gestion des tables relève du développement sur mesure, sur devis.",
      },
      {
        question: "Dois-je fournir les photos ?",
        reponse:
          "Les photos de votre établissement et de vos plats donnent les meilleurs résultats. En attendant, des photos d'illustration libres de droits peuvent être utilisées.",
      },
    ],
    publie: false,
  },
  {
    slug: "entreprise-de-menage",
    cible: "entreprise de ménage",
    metaTitre: "Création de site internet pour entreprise de ménage et de nettoyage",
    metaDescription: `Site internet pour entreprise de ménage ou de nettoyage : prestations et tarifs, communes desservies, demande de devis et contact WhatsApp. ${desDe}.`,
    intro:
      "Ménage régulier chez des particuliers, grand nettoyage avant un état des lieux, entretien de bureaux ou de locations de courte durée : les demandes sont variées, et chaque client veut savoir rapidement si vous intervenez chez lui, à quel prix et à quelle fréquence.",
    besoins: [
      {
        titre: "Clarifier les prestations",
        texte:
          "Ménage régulier, ponctuel, grand nettoyage, entretien de bureaux : chaque prestation a son contenu et son mode de tarification, à l'heure, au forfait ou sur devis.",
      },
      {
        titre: "Montrer la zone desservie",
        texte:
          "Les clients cherchent un prestataire proche de chez eux. Lister les villes couvertes évite les demandes hors secteur et aide le référencement local.",
      },
      {
        titre: "Inspirer confiance",
        texte:
          "Le client vous ouvre sa porte : ponctualité, produits utilisés, assurance et déclaration de l'activité sont autant d'éléments à mettre en avant.",
      },
    ],
    fonctionnalites: [
      { titre: "Formules détaillées", texte: "Pour chacune, la liste des tâches incluses et la fréquence conseillée." },
      {
        titre: "Prix après crédit d'impôt",
        texte: "Si votre activité relève des services à la personne, le coût réel après crédit d'impôt peut être affiché à côté du tarif.",
      },
      { titre: "Communes desservies", texte: "Une liste claire, ville par ville, utile aux clients comme aux moteurs de recherche." },
      {
        titre: "Devis et WhatsApp",
        texte: "Un formulaire de devis (type de logement, surface, fréquence) et un bouton WhatsApp pour les échanges rapides.",
      },
      {
        titre: "Offre locations courte durée",
        texte: "Une rubrique pour les propriétaires Airbnb : remise en état entre deux séjours, linge, vérification du logement.",
      },
    ],
    modele: {
      slug: "ferrand-plomberie",
      raison: "Même logique d'intervention à domicile : prestations, zone desservie et demande de devis mises en avant.",
    },
    realisation: "fatuiali",
    faq: [
      {
        question: "Peut-on afficher les avis de mes clients ?",
        reponse:
          "Oui, s'ils sont authentiques : de vrais avis, publiés avec l'accord de leurs auteurs. Un lien vers votre fiche Google permet aussi de les consulter.",
      },
      {
        question: "Mon activité ouvre droit au crédit d'impôt : comment le présenter ?",
        reponse:
          "Le tarif peut être affiché avec, à côté, le coût réel après crédit d'impôt et une courte explication. Le libellé exact est à valider selon votre situation (déclaration ou agrément de services à la personne).",
      },
      {
        question: "Je travaille aussi pour des entreprises : faut-il deux sites ?",
        reponse:
          "Non. Une rubrique « Professionnels » présente l'entretien de bureaux ou de locaux commerciaux, avec son propre formulaire de devis. La formule Pro permet d'y consacrer une page entière.",
      },
      {
        question: "Combien coûte le site ?",
        reponse: `De ${formatPrix(prixMinimum)} à ${formatPrix(prixMaximum)} TTC par mois selon la formule, plus ${formatPrix(fraisMiseEnService)} TTC de frais de mise en service. Hébergement, nom de domaine et maintenance sont compris, sans engagement de durée.`,
      },
    ],
    publie: false,
  },
  {
    slug: "coach",
    cible: "coach",
    metaTitre: "Création de site internet pour coach : méthode, programmes, rendez-vous",
    metaDescription: `Site internet pour coach de vie, professionnel ou sportif : votre approche, vos programmes et tarifs, et la prise de rendez-vous pour une première séance. ${desDe}.`,
    intro:
      "Coaching de vie, professionnel, sportif ou bien-être : on choisit un coach autant pour sa méthode que pour sa personnalité. Le site doit expliquer votre approche, présenter clairement vos accompagnements et conduire le visiteur jusqu'à un premier rendez-vous.",
    besoins: [
      {
        titre: "Expliquer votre méthode",
        texte:
          "Les visiteurs comparent plusieurs coachs. Ce qui les décide : comprendre comment se déroule un accompagnement, combien de séances il compte et ce qu'ils peuvent en attendre.",
      },
      {
        titre: "Rendre l'offre lisible",
        texte:
          "Séance découverte, accompagnement sur plusieurs semaines, programme en groupe : des formules nommées, avec leur durée et leur prix, évitent les hésitations.",
      },
      {
        titre: "Simplifier le premier contact",
        texte:
          "Un premier appel offert, un créneau à choisir en quelques clics : plus la première étape est simple, plus elle est franchie.",
      },
    ],
    fonctionnalites: [
      { titre: "Section « Pour qui ? »", texte: "Les situations que vous accompagnez, décrites avec les mots de vos clients." },
      {
        titre: "Programmes avec tarifs",
        texte: "Chaque formule avec son nombre de séances, son format (cabinet, visio, extérieur) et son prix.",
      },
      { titre: "Méthode en étapes", texte: "Le déroulé d'un accompagnement, du premier échange au bilan." },
      {
        titre: "Prise de rendez-vous",
        texte: "Un lien vers votre agenda en ligne (Calendly, Google Agenda…) ou une demande de créneau par formulaire.",
      },
      { titre: "Blog", texte: "Des articles sur vos thèmes de prédilection, pour être trouvé sur des questions précises (formule Business)." },
    ],
    modele: {
      slug: "cap-equilibre",
      raison: "Programmes avec tarifs, méthode en étapes et choix d'un créneau de rendez-vous.",
    },
    faq: [
      {
        question: "Je fais mes séances en visio : le site peut-il le montrer ?",
        reponse:
          "Oui. Chaque programme peut indiquer son format (cabinet, visio, extérieur), et la zone géographique n'est précisée que pour les séances en présentiel.",
      },
      {
        question: "Puis-je publier des témoignages de clients ?",
        reponse:
          "Oui, s'ils sont réels et publiés avec l'accord de leurs auteurs. Un prénom et une initiale suffisent souvent à préserver la confidentialité de l'accompagnement.",
      },
      {
        question: "Quelle formule pour un coach ?",
        reponse:
          "La formule Pro, jusqu'à 3 pages, couvre l'essentiel : approche, programmes, contact. La formule Business ajoute un blog, utile pour attirer des visiteurs grâce à vos contenus.",
      },
      {
        question: "Puis-je vendre mes séances en ligne ?",
        reponse:
          "Le site vitrine présente vos offres et renvoie vers la prise de rendez-vous. Le paiement en ligne de séances ou de programmes relève du développement sur mesure, sur devis.",
      },
    ],
    publie: false,
  },
  {
    slug: "photographe",
    cible: "photographe",
    metaTitre: "Création de site internet pour photographe : portfolio et réservation",
    metaDescription: `Site internet pour photographe de mariage, de portrait ou d'entreprise : portfolio rapide en haute qualité, galeries par thème, prestations et demande de réservation. ${desDe}.`,
    intro:
      "Pour un photographe, le site est le portfolio. Les visiteurs jugent votre travail sur les images, en quelques secondes, souvent depuis un téléphone. Elles doivent s'afficher vite, en grand et sans perte de qualité, puis mener naturellement à une demande de date.",
    besoins: [
      {
        titre: "Montrer le travail en grand",
        texte: "Des images plein écran, bien cadrées, sans bandeau ni texte qui les recouvre.",
      },
      {
        titre: "Des pages qui se chargent vite",
        texte:
          "Une galerie lourde fait fuir sur mobile. Les images doivent être compressées et redimensionnées selon l'écran, sans dégrader le rendu.",
      },
      {
        titre: "Transformer l'intérêt en réservation",
        texte:
          "Après la galerie, le visiteur doit trouver vos prestations, un ordre de prix et un moyen simple de vérifier votre disponibilité.",
      },
    ],
    fonctionnalites: [
      { titre: "Galeries par thème", texte: "Mariage, portrait, famille, entreprise, événement : le visiteur filtre ce qui l'intéresse." },
      {
        titre: "Images optimisées automatiquement",
        texte: "Formats modernes (WebP, AVIF), chargement progressif et tailles adaptées à chaque écran.",
      },
      {
        titre: "Prestations et tarifs « à partir de »",
        texte: "Pour chaque type de séance : durée, nombre de photos livrées et prix de départ.",
      },
      { titre: "Demande de réservation", texte: "Date, lieu et type de séance : la demande arrive complète par email." },
      {
        titre: "Page « À propos »",
        texte: "Votre parcours et votre façon de travailler : pour un mariage, on choisit aussi une personne.",
      },
    ],
    modele: {
      slug: "atelier-grain",
      raison: "Galerie en mosaïque filtrable, prestations avec tarifs et demande de réservation, sur un fond sombre qui met les images en valeur.",
    },
    faq: [
      {
        question: "Combien de photos puis-je mettre en ligne ?",
        reponse:
          "Le nombre n'est pas limité par l'hébergement. Une sélection de 20 à 40 images par galerie reste plus efficace qu'une archive complète : le visiteur retient vos meilleures photos.",
      },
      {
        question: "Les images perdent-elles en qualité ?",
        reponse:
          "Elles sont recompressées pour le web avec un réglage qui préserve le rendu à l'écran. Les fichiers originaux, eux, ne sont jamais mis en ligne.",
      },
      {
        question: "Puis-je livrer les photos à mes clients via le site ?",
        reponse:
          "Le site vitrine n'inclut pas d'espace de livraison privé. Un service de galerie client protégée peut être relié depuis le site, ou un développement sur mesure envisagé.",
      },
      {
        question: "Quelle formule pour un photographe ?",
        reponse:
          "La formule Pro inclut une galerie ou un portfolio et jusqu'à 3 pages. La formule Business ajoute un blog, pratique pour raconter vos séances et être trouvé sur des recherches locales comme « photographe mariage » suivi de votre ville.",
      },
    ],
    publie: false,
  },
];

export const metiersVisibles = metiers.filter(estVisible);
export const metiersPublies = metiers.filter((m) => m.publie);

export function getMetier(slug: string): Metier | undefined {
  return metiersVisibles.find((m) => m.slug === slug);
}
