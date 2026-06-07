/**
 * Blog seed script — inserts 5 categories + 9 SEO articles into Supabase.
 * Run: SEED_ADMIN_EMAIL=you@email.com SEED_ADMIN_PASSWORD=pass npx tsx scripts/seed-blog.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wawscgfibbbxnvpvkwas.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhd3NjZ2ZpYmJieG52cHZrd2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NDU5MTYsImV4cCI6MjA4MjUyMTkxNn0.xYwLw0RaYv8QMueOmnUGPdZ8Dk88AvtiLKAuZ0ZV7NU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars.");
    process.exit(1);
  }

  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) {
    console.error("Auth failed:", authError.message);
    process.exit(1);
  }
  console.log("Authenticated as", email);

  // ── Categories ────────────────────────────────────────────────────────────
  const categories = [
    { name: "Marketing Digital", slug: "marketing-digital" },
    { name: "SEO & Referencement", slug: "seo-referencement" },
    { name: "Reseaux Sociaux", slug: "reseaux-sociaux" },
    { name: "Developpement Web", slug: "developpement-web" },
    { name: "Strategie", slug: "strategie" },
  ];

  const { data: catData, error: catError } = await supabase
    .from("blog_categories")
    .upsert(categories, { onConflict: "slug" })
    .select("id, slug");

  if (catError) {
    console.error("Category upsert failed:", catError.message);
    process.exit(1);
  }

  const catMap = Object.fromEntries((catData ?? []).map((c: { id: string; slug: string }) => [c.slug, c.id]));
  console.log("Categories upserted:", Object.keys(catMap).join(", "));

  // ── Articles ──────────────────────────────────────────────────────────────
  const articles = [
    {
      slug: "generation-leads-abidjan",
      title: "Comment generer des leads qualifies a Abidjan",
      excerpt: "Strategies pratiques pour attirer des prospects qui ont vraiment l'intention d'acheter — adaptees au marche ivoirien.",
      category_id: catMap["marketing-digital"],
      content: `<h2>Pourquoi la generation de leads est differente a Abidjan</h2>
<p>La generation de leads en Cote d'Ivoire pose un defi specifique : le volume ne manque pas, c'est la qualite qui fait defaut. Des formulaires remplis sans intention, des appels qui n'aboutissent a rien, des contacts sans pouvoir de decision. Le probleme n'est pas le canal publicitaire — c'est la qualification en amont.</p>
<p>A Abidjan, le cycle de vente est souvent plus relationnel qu'en Europe. La confiance precede l'achat. Vos prospects veulent comprendre qui vous etes, pas seulement ce que vous vendez. La generation de leads efficace tient compte de ce contexte : elle construit de la confiance tout en filtrant les contacts non pertinents.</p>

<h2>Les canaux les plus efficaces pour generer des leads en Cote d'Ivoire</h2>
<p><strong>Meta Ads (Facebook & Instagram)</strong> : La penetration de Facebook en Cote d'Ivoire est parmi les plus elevees d'Afrique subsaharienne. Les formulaires de leads natifs (Lead Ads) sont particulierement efficaces car ils gardent l'utilisateur dans l'application. Les informations sont pre-remplies, le taux de completion est nettement superieur a une landing page externe.</p>
<p><strong>Google Ads</strong> : Pour capturer une intention de recherche active — quelqu'un qui cherche "agence marketing Abidjan" ou "creation site web Cote d'Ivoire". Ces leads sont souvent mieux qualifies car l'intention est explicite. Le volume est plus faible qu'avec Meta, mais le taux de conversion commercial est meilleur.</p>
<p><strong>WhatsApp comme canal de nurturing</strong> : Apres la capture initiale, WhatsApp est incontournable sur le marche ivoirien. Un premier contact par WhatsApp Business augmente significativement le taux de reponse compare a un email ou un appel a froid.</p>

<h2>Construire une landing page qui convertit</h2>
<p>Une landing page de generation de leads doit repondre a trois questions dans les premieres secondes : qu'est-ce que vous proposez, pourquoi c'est credible, et quelle action prendre maintenant. La majorite des pages ivoiriennes echouent sur l'une de ces trois dimensions.</p>
<p>Les elements de confiance sont particulierement importants sur ce marche : logo de l'entreprise visible, temoignages clients avec noms et secteurs, numero de telephone local cliquable, et mention du quartier ou de la localisation exacte pour les services en presentiel.</p>
<p>Le formulaire doit etre court. Nom, telephone, et une question de qualification (budget, delai, besoin). Chaque champ supplementaire reduit le taux de conversion. Recuperez les autres informations lors du premier appel.</p>

<h2>L'approche LGM pour la generation de leads</h2>
<p>Chez LGM, nous commenceons chaque mission de generation de leads par un cadrage marche : qui est le prospect ideal, quelles sont ses objections, sur quel canal il est actif, et quel message correspond a son niveau de maturite. Ce travail preliminary evite de bruler du budget sur des audiences non qualifiees.</p>
<p>Nous construisons ensuite un systeme complet : landing page, annonces, formulaire de qualification, integration CRM, alertes en temps reel et sequences de relance automatiques. Chaque semaine, vous recevez un rapport lisible avec le cout par lead, le volume et le taux de qualification.</p>

<h2>FAQ — Generation de leads a Abidjan</h2>
<h3>Quel budget prevoir pour commencer ?</h3>
<p>Nous recommandons un minimum de 150 000 FCFA par mois de budget media. Ce montant permet d'avoir suffisamment de donnees pour optimiser et de sortir des phases d'apprentissage des algorithmes publicitaires.</p>
<h3>En combien de temps verrai-je des resultats ?</h3>
<p>Les premiers leads arrivent generalement dans les 7 a 14 jours. La qualite et le volume s'ameliorent au fil des optimisations, avec un bon rythme constate entre 30 et 60 jours.</p>
<h3>Quelle est la difference entre un lead et un prospect ?</h3>
<p>Un lead est un contact qui a rempli un formulaire. Un prospect est un lead qualifie qui correspond a vos criteres d'achat : bon secteur, bon budget, bonne decision. Notre travail est de maximiser le nombre de prospects dans les leads generes.</p>

<p>Vous voulez structurer votre generation de leads avec methode ? <a href="/contact">Contactez LGM pour un premier echange.</a></p>`,
    },
    {
      slug: "seo-local-abidjan-cote-divoire",
      title: "SEO local a Abidjan : etre trouve sur Google en Cote d'Ivoire",
      excerpt: "Comment optimiser votre presence sur Google pour les recherches locales a Abidjan et dans toute la Cote d'Ivoire.",
      category_id: catMap["seo-referencement"],
      content: `<h2>Pourquoi le SEO local est une opportunite en Cote d'Ivoire</h2>
<p>Le SEO local en Cote d'Ivoire est encore sous-exploite. La competition sur les mots cles locaux est nettement moins intense qu'en Europe ou en Amerique du Nord. Une entreprise qui investit correctement aujourd'hui peut prendre des positions solides avec relativement peu d'efforts — et les maintenir pendant des annees. Cette fenetre ne restera pas ouverte indefiniment.</p>
<p>Etre visible sur Google a Abidjan, c'est etre present quand un prospect cherche activement votre type de service. Contrairement a la publicite payante qui s'arrete quand le budget s'arrete, le SEO construit des actifs durables : des pages bien positionnees qui continuent d'attirer du trafic des mois et des annees apres leur optimisation.</p>

<h2>Les trois dimensions du SEO moderne : SEO, AEO et GEO</h2>
<p><strong>SEO classique</strong> : L'optimisation pour les moteurs de recherche traditionnels (Google, Bing). Cela inclut le SEO technique (vitesse du site, indexation, structure), le SEO de contenu (articles, pages de services, FAQ) et le netlinking (liens entrants de qualite).</p>
<p><strong>AEO (Answer Engine Optimization)</strong> : L'optimisation pour les moteurs de reponse IA — ChatGPT, Perplexity, Google AI Overviews. Ces systemes lisent votre site pour synthetiser des reponses directes. Ils privilegient les contenus structures, les FAQ visibles dans le HTML et les schemas de donnees JSON-LD. Apparaitre dans ces reponses donne une visibilite croissante que les liens classiques ne donnent plus.</p>
<p><strong>GEO (Geographic SEO)</strong> : L'optimisation pour les recherches geographiques. Pages locales specifiques par ville, fiche Google Business optimisee, citations coherentes sur les annuaires locaux, avis clients. Le GEO est particulierement important pour les entreprises qui servent un territoire specifique.</p>

<h2>Google Business Profile : la base incontournable</h2>
<p>Pour toute entreprise physique ou locale a Abidjan, Google Business Profile est le premier levier a activer. Il determine votre apparition dans le "Pack Local" (les 3 entreprises qui apparaissent en haut des resultats avec la carte). Ce placement est souvent plus important que les positions organiques classiques.</p>
<p>L'optimisation d'une fiche Google Business comprend : des informations completes et precises, des photos de qualite de vos locaux et equipes, une description riche incluant vos services et votre zone de service, des produits ou services detailles, et une strategie active de collecte d'avis clients.</p>

<h2>Le contenu SEO adapte au marche ivoirien</h2>
<p>Les mots cles pertinents pour le marche ivoirien ont des specificites. Les recherches incluent souvent le nom de la ville ou du quartier, le secteur d'activite et parfois des termes en francais local. Comprendre ces nuances permet de creer du contenu qui repond exactement aux requetes reelles de vos prospects.</p>
<p>Les pages de services locales ("Generation de leads a Abidjan", "Creation site web Cote d'Ivoire") sont un levier puissant et souvent neglegie. Une page bien construite pour un terme specifique peut se positionner rapidement sur des requetes a forte intention commerciale.</p>

<h2>FAQ — SEO local en Cote d'Ivoire</h2>
<h3>Combien de temps pour voir des resultats en SEO ?</h3>
<p>Les premiers mouvements de positions apparaissent en 4 a 8 semaines pour les mots cles peu competitifs. Les resultats durables en trafic organique se consolident entre 3 et 6 mois. Le SEO local (Google Business, recherches geographiques) reagit souvent plus vite.</p>
<h3>Le SEO est-il utile pour une PME a Abidjan ?</h3>
<p>Oui, et c'est souvent plus rentable que la publicite payante sur le long terme. Une PME qui investit dans son SEO aujourd'hui construit un actif durable. Le cout d'acquisition par lead organique diminue avec le temps, contrairement au paid media qui reste constant.</p>
<h3>Qu'est-ce que l'AEO et pourquoi c'est important maintenant ?</h3>
<p>L'AEO (Answer Engine Optimization) est l'optimisation pour ChatGPT, Perplexity et Google AI Overviews. Ces systemes sont de plus en plus utilises pour des recherches commerciales. Apparaitre dans leurs reponses donne une visibilite croissante — et c'est encore peu concurrentiel sur le marche ivoirien.</p>

<p>Vous voulez ameliorer votre visibilite sur Google a Abidjan ? <a href="/contact">Demandez un audit SEO gratuit.</a></p>`,
    },
    {
      slug: "publicite-digitale-cote-divoire",
      title: "Google Ads & Meta Ads en Cote d'Ivoire : maximiser votre ROI",
      excerpt: "Comment gerer des campagnes publicitaires digitales efficaces sur le marche ivoirien avec des budgets mesures.",
      category_id: catMap["marketing-digital"],
      content: `<h2>La publicite digitale en Cote d'Ivoire en 2025</h2>
<p>Le paysage publicitaire digital ivoirien a muri rapidement. Les consommateurs sont plus exposes aux publicites, les audiences plus saturees, et les couts par resultat ont augmente. Gerer des campagnes Meta ou Google Ads en 2025 demande une methode rigoureuse — pas seulement un compte publicitaire actif et un budget mensuel.</p>
<p>La bonne nouvelle : la majorite des entreprises ivoiriennes gere encore ses campagnes avec peu de methode. Un tracking incomplet, des audiences trop larges, des creations jamais testees, des budgets non optimises. Un advertiser rigoureux prend immediatement un avantage competitif significatif.</p>

<h2>Google Ads vs Meta Ads : quand utiliser quoi</h2>
<p><strong>Google Ads</strong> est ideal pour capturer une demande existante. Quand un prospect cherche "agence communication Abidjan" ou "creation logo Cote d'Ivoire", il est en intention d'achat active. Google Ads lui presente votre offre au bon moment. Le volume de recherches est plus faible qu'en Europe, mais l'intention est reelle et le cout par clic reste competitif.</p>
<p><strong>Meta Ads</strong> est ideal pour creer la demande et atteindre des audiences qui ne cherchent pas encore. Vous pouvez cibler par secteur d'activite, comportement d'achat, localisation precise ou interet specifique. Meta Ads est aussi le canal le plus efficace pour le retargeting — recibler les visiteurs de votre site ou les engagements sur vos publications.</p>
<p>Les deux plateformes fonctionnent mieux en parallele qu'en standalone. Google capture l'intention, Meta cree et entretient la demande.</p>

<h2>Les erreurs les plus frequentes sur le marche ivoirien</h2>
<p>L'erreur la plus frequente est de mesurer uniquement le cout par clic ou le taux d'engagement, pas le cout par lead qualifie ou par client acquis. Un clic a 50 FCFA sur une audience large ne vaut rien s'il ne convertit pas. Un lead a 5 000 FCFA sur une audience precise peut etre tres rentable selon votre valeur client.</p>
<p>La deuxieme erreur est de ne jamais tester les creations. Le meme visuel et le meme texte durant des mois. La fatigue publicitaire s'installe rapidement sur Meta, surtout sur des audiences locales plus restreintes. Un calendrier editorial de creation est necessaire pour maintenir les performances.</p>

<h2>L'attribution : savoir ce qui fonctionne vraiment</h2>
<p>L'attribution est le point cle que la majorite des entreprises negligent. Savoir qu'une campagne a genere 50 leads ne suffit pas : il faut savoir lesquels ont ete contactes, lesquels ont ete closes, et a quel cout. Cette information transforme la gestion des budgets publicitaires.</p>
<p>Nous configurons un tracking complet : pixel Meta, Google Ads, Google Analytics 4 et, si possible, une integration avec votre CRM pour fermer la boucle sur les ventes reelles. C'est cela le vrai ROI — pas le cout par clic.</p>

<h2>FAQ — Publicite digitale en Cote d'Ivoire</h2>
<h3>Quel budget minimum pour commencer ?</h3>
<p>200 000 FCFA par mois de budget media minimum pour avoir suffisamment de donnees a optimiser. Ce budget s'ajoute aux honoraires de gestion. En dessous, les algorithmes n'ont pas assez de donnees pour sortir de la phase d'apprentissage.</p>
<h3>Combien de temps avant de voir des resultats ?</h3>
<p>Les premieres semaines sont une phase d'apprentissage. Les resultats s'ameliorent progressivement entre la 2eme et la 6eme semaine. Nous recommandons de juger une campagne sur 60 jours minimum avant de tirer des conclusions definitives.</p>
<h3>Pouvez-vous reprendre des campagnes deja lancees ?</h3>
<p>Oui. Nous faisons d'abord un audit des campagnes existantes pour identifier les points forts a conserver et les problemes a corriger. La transition est documentee pour assurer la continuite des performances.</p>

<p>Vous voulez des campagnes publicitaires qui servent vraiment vos objectifs commerciaux ? <a href="/contact">Parlez-nous de votre projet.</a></p>`,
    },
    {
      slug: "site-web-professionnel-abidjan",
      title: "Creer un site web professionnel a Abidjan",
      excerpt: "Ce qu'il faut savoir avant de commander un site web pour votre entreprise a Abidjan — couts, delais, technologies et pieges a eviter.",
      category_id: catMap["developpement-web"],
      content: `<h2>Pourquoi la majorite des sites web ivoiriens ne convertissent pas</h2>
<p>La majorite des sites d'entreprises ivoiriennes ont le meme probleme : ils existent, mais ils ne font rien. Un visiteur arrive, il ne comprend pas immediatement ce que l'entreprise fait, pourquoi lui faire confiance, ni quoi faire ensuite. Il repart. La concurrence a clique une fois de plus.</p>
<p>Ce n'est pas un probleme de design seul. C'est un probleme de structure et de message. Un bon site web repond a trois questions dans les premieres secondes : qu'est-ce que vous proposez exactement, pourquoi vous etes credibles, et quelle action prendre maintenant. Chaque element — titre, image, bouton — doit contribuer a ces trois reponses.</p>

<h2>Mobile-first : une necessite absolue en Afrique de l'Ouest</h2>
<p>En Cote d'Ivoire, plus de 80% du trafic web provient de telephones. Pas d'ordinateurs — des smartphones, souvent sur des connexions 3G ou 4G variables. Un site qui charge en 8 secondes sur mobile perd la majorite de ses visiteurs avant qu'ils voient la premiere ligne.</p>
<p>Mobile-first ne signifie pas "le site s'affiche sur mobile". Il signifie que chaque decision de design et de performance a ete prise en pensant d'abord a l'experience sur un ecran de 6 pouces avec une connexion variable. La vitesse de chargement, la lisibilite du texte, la taille des boutons et l'accessibilite des formulaires sont des variables critiques.</p>

<h2>Les elements indispensables d'un site professionnel a Abidjan</h2>
<p>Un site professionnel pour le marche ivoirien doit inclure : un numero de telephone local visible et cliquable (les appels directs restent le premier mode de contact), un lien WhatsApp Business, une adresse physique avec le quartier et l'arrondissement, des temoignages clients avec noms et secteurs, et des photos reelles de l'equipe ou des locaux (pas de stock photos generiques).</p>
<p>Ces elements de confiance sont particulierement importants sur le marche ivoirien. Ils signalent la legitimite de l'entreprise avant que le contenu de l'offre soit completement lu. Un logo clair, une orthographe impeccable et une mise en page professionnelle reduisent le taux de rebond de facon measurable.</p>

<h2>Quel budget pour un site web professionnel ?</h2>
<p>Les couts varient enormement selon la complexite. Une landing page de conversion simple (1 page, formulaire, tracking) coute entre 200 000 et 400 000 FCFA. Un site vitrine complet (5 a 8 pages, SEO de base, formulaire de contact) entre 500 000 et 1 200 000 FCFA. Un site e-commerce ou avec des fonctionnalites specifiques (espace client, devis automatique, paiement Mobile Money) entre 1 500 000 et 5 000 000 FCFA selon la complexite.</p>
<p>Attention aux offres tres basses (moins de 100 000 FCFA pour un "site complet") : elles livrent generalement des templates non optimises, sans suivi, avec un code difficile a faire evoluer et sans SEO integre.</p>

<h2>FAQ — Site web professionnel a Abidjan</h2>
<h3>Combien de temps pour livrer un site ?</h3>
<p>Une landing page est livree en 2 a 3 semaines. Un site vitrine complet en 4 a 6 semaines. Les projets avec fonctionnalites specifiques prennent 8 a 14 semaines selon la scope et la disponibilite du client pour les retours.</p>
<h3>Le SEO est-il inclus dans le prix ?</h3>
<p>Les bases SEO (structure HTML, metas, vitesse, sitemap) sont systematiquement integrees. Une strategie SEO de contenu (articles, pages locales, netlinking) est un service separe.</p>
<h3>Puis-je gerer le site moi-meme apres livraison ?</h3>
<p>Oui, nous configurons un systeme de gestion de contenu adapte et nous formons votre equipe. Selon la technologie, vous pouvez modifier les textes, ajouter des pages et publier des articles sans developpeur.</p>

<p>Vous voulez un site qui travaille pour votre entreprise ? <a href="/contact">Demandez un devis pour votre projet web.</a></p>`,
    },
    {
      slug: "marketing-automation-ia-afrique",
      title: "Marketing automation et IA pour les PME africaines",
      excerpt: "Comment les PME d'Abidjan et d'Afrique de l'Ouest peuvent utiliser l'automatisation et l'IA pour gagner en efficacite commerciale.",
      category_id: catMap["strategie"],
      content: `<h2>L'automatisation n'est plus reservee aux grandes entreprises</h2>
<p>Il y a cinq ans, l'automatisation marketing etait reservee aux entreprises avec des equipes IT et des budgets importants. Ce n'est plus le cas. Des outils comme Make, Zapier ou n8n permettent de connecter des dizaines d'applications sans code, pour des couts mensuels accessibles. Une PME abidjanaise peut aujourd'hui automatiser ses relances commerciales, ses notifications de leads et ses rapports hebdomadaires pour moins de 50 000 FCFA par mois d'abonnement.</p>
<p>La question n'est plus "pouvons-nous nous permettre l'automatisation ?" — c'est "pouvons-nous nous permettre de ne pas l'avoir ?" Chaque lead qui refroidit dans une boite mail parce que personne ne l'a relance a temps est une perte mesurable. Chaque rapport prepare manuellement chaque semaine est du temps pris sur des taches a valeur ajoutee.</p>

<h2>Les automatisations les plus impactantes pour une PME africaine</h2>
<p><strong>Notification et routage des leads</strong> : Quand un formulaire est soumis, le lead arrive instantanement dans le CRM, une notification WhatsApp est envoyee au commercial responsable, et un message de bienvenue automatique est envoye au prospect. Le tout en moins de 2 minutes, 24h/24.</p>
<p><strong>Sequences de relance</strong> : Un prospect qui ne repond pas au premier appel recoit une serie de messages automatiques sur plusieurs jours — email, SMS ou WhatsApp selon sa preference. Ces sequences peuvent etre adaptees selon le secteur, le service interesse et le niveau de qualification.</p>
<p><strong>Reporting automatique</strong> : Chaque semaine, un rapport consolide les donnees de vos differentes sources (Meta Ads, Google Analytics, CRM) et vous est envoye par email. Plus de collecte manuelle de chiffres depuis cinq plateformes differentes.</p>

<h2>L'IA au service des operations commerciales</h2>
<p>L'IA generative (ChatGPT, Claude, Gemini) peut etre integree dans vos workflows pour des taches specifiques : qualification automatique d'un lead depuis un formulaire, generation d'un premier message de reponse a une demande entrante, synthese d'une reunion, extraction d'informations depuis un document non structure.</p>
<p>Nous ne deployons pas de l'IA pour faire moderne. Nous l'utilisons uniquement quand elle reduit reellement une friction operationnelle. Un agent IA qui qualifie automatiquement 80% des leads entrants libere vos commerciaux pour les 20% qui meritent une attention immediate.</p>

<h2>Comment demarrer : les premiers pas pratiques</h2>
<p>Le premier pas n'est pas technique — c'est la cartographie. Identifier les trois ou quatre points de friction qui coutent le plus de temps ou de clients chaque mois. Une fois ces points identifies, nous pouvons construire des solutions specifiques, sans sur-ingenierie.</p>
<p>La plupart de nos clients commencent par une automatisation simple : la notification de lead et l'integration CRM. En deux a trois semaines, ce systeme est en place. Les resultats sont immediatement mesurables. Ensuite, nous ajoutons progressivement les couches : relances, scoring, rapports, agents IA.</p>

<h2>FAQ — Automatisation et IA pour PME africaines</h2>
<h3>Faut-il etre une grande entreprise pour automatiser ?</h3>
<p>Non. Les PME beneficient souvent plus rapidement de l'automatisation que les grandes entreprises, car leurs processus sont plus simples a automatiser et les gains sont immediatement visibles. Une equipe de 5 personnes peut gagner l'equivalent de 2 jours de travail par semaine avec des automatisations bien pensees.</p>
<h3>Quels outils utilisez-vous ?</h3>
<p>Principalement Make (ex-Integromat), n8n, Zapier et des integrations API directes. Pour l'IA, nous utilisons les API de Claude et GPT-4 selon le cas d'usage. Nous recommandons toujours l'outil le moins couteux qui repond au besoin reel.</p>
<h3>Est-ce que mes equipes peuvent apprendre a gerer les automatisations ?</h3>
<p>Oui. Nous livrons avec une documentation claire et une formation pratique. La majorite de nos clients peuvent modifier les workflows, ajouter des etapes et ajuster les messages sans nous appeler apres la formation initiale.</p>

<p>Vous voulez identifier les automatisations les plus impactantes pour votre entreprise ? <a href="/contact">Parlons-en lors d'un premier echange.</a></p>`,
    },
    {
      slug: "formation-marketing-digital-abidjan",
      title: "Formation marketing digital a Abidjan : ce qu'il faut vraiment apprendre",
      excerpt: "Quelles competences marketing digital sont vraiment utiles pour les equipes d'entreprises ivoiriennes en 2025.",
      category_id: catMap["strategie"],
      content: `<h2>Pourquoi la formation marketing digital est devenue critique</h2>
<p>Le marketing digital evolue rapidement. Les pratiques qui fonctionnaient en 2020 sont devenues obsoletes ou moins efficaces. Les entreprises ivoiriennes qui n'investissent pas dans la formation de leurs equipes prennent un retard croissant — pas seulement par rapport a l'international, mais par rapport a leurs concurrents locaux qui, eux, forment leurs equipes.</p>
<p>La formation n'est pas uniquement pour les equipes marketing. Les dirigeants qui comprennent les fondamentaux du digital prennent de meilleures decisions d'investissement et supervisent plus efficacement leurs agences et prestataires. Ne pas comprendre ce pour quoi vous payez, c'est s'exposer a des budgets gaspilles.</p>

<h2>Les competences les plus demandees a Abidjan</h2>
<p><strong>Publicite sur Meta (Facebook & Instagram)</strong> : La gestion et la lecture des resultats des campagnes Meta Ads est la competence la plus demandee. Comprendre le Gestionnaire de publicites, les audiences, les objectifs de campagne et les metriques cles permet de superviser intelligemment une agence ou de piloter des campagnes en interne.</p>
<p><strong>Google Ads et Google Analytics</strong> : La publicite sur Google et l'analyse du trafic web sont des competences essentielles pour les equipes marketing. Google Analytics 4, en particulier, a completement change : une formation sur la nouvelle interface et les evenements est necessaire pour les equipes qui l'utilisaient avant 2023.</p>
<p><strong>SEO et AEO</strong> : Comprendre comment Google classe les pages, comment optimiser son contenu et comment apparaitre dans les reponses des IA (AEO) est une competence de plus en plus differenciante. La demande de formation SEO a fortement augmente depuis 2024.</p>

<h2>Notre methode de formation : pratique avant tout</h2>
<p>Nos formations ne sont pas des presentations generiques. Elles sont construites autour de votre secteur, vos chiffres et vos outils. Les exercices portent sur vos campagnes reelles, vos donnees Google Analytics, votre compte Meta Ads. Les participants repartent avec des actions specifiques applicables le lendemain.</p>
<p>Le format est dense et court. Nous privilegions des modules de 3 a 4 heures avec une pause pratique, plutot que des journees entieres de presentation. L'apprentissage est meilleur, la retention aussi, et l'impact sur l'agenda de vos equipes est moindre.</p>

<h2>Formation en entreprise ou webinaire : quoi choisir ?</h2>
<p>La formation en entreprise (sur site ou en visioconference) est adaptee quand vous avez une equipe de 4 a 12 personnes avec des enjeux specifiques a votre secteur. Elle inclut un brief personnalise, des exercices sur vos donnees et un plan d'action specifique a votre contexte.</p>
<p>Le webinaire est adapte pour un dirigeant ou une equipe reduite qui veut une mise a niveau rapide sur un sujet precis — "comment lire mes rapports Meta Ads", "comprendre le SEO en 3 heures" — sans le cout d'une formation sur mesure. Les webinaires sont enregistres et disponibles en replay.</p>

<h2>FAQ — Formation marketing digital a Abidjan</h2>
<h3>Peut-on commander une formation sans autre service LGM ?</h3>
<p>Absolument. Nos formations sont disponibles independamment de toute prestation de conseil ou de gestion de campagnes. Nous formons aussi des equipes qui travaillent avec d'autres agences.</p>
<h3>Les formations sont-elles en presentiel ou en ligne ?</h3>
<p>Les deux. En presentiel a Abidjan pour les formations en entreprise locales, en visioconference pour les equipes hors de Cote d'Ivoire ou les collaborateurs en remote.</p>
<h3>Delivrez-vous une attestation de formation ?</h3>
<p>Oui, une attestation de formation avec programme, duree et competences travaillees est delivree a chaque participant.</p>

<p>Vous voulez former votre equipe au marketing digital ? <a href="/contact">Demandez notre programme de formations.</a></p>`,
    },
    {
      slug: "facebook-ads-cote-divoire",
      title: "Facebook Ads en Cote d'Ivoire : cibler vos clients locaux",
      excerpt: "Comment construire des campagnes Facebook et Instagram efficaces sur le marche ivoirien avec un budget maitrise.",
      category_id: catMap["reseaux-sociaux"],
      content: `<h2>Facebook et Instagram en Cote d'Ivoire : l'etat du marche</h2>
<p>La Cote d'Ivoire compte parmi les marches africains avec la plus forte penetration de Facebook. Des millions d'Ivoiriens utilisent Facebook et Instagram quotidiennement, principalement depuis leur smartphone. Pour une entreprise locale, c'est une opportunite publicitaire significative — si elle est activee avec la bonne methode.</p>
<p>Mais le marche a change. Les audiences sont plus saturees qu'il y a trois ans. Les utilisateurs ivoiriens sont plus habitues aux publicites et y font moins confiance automatiquement. La qualite de la creation publicitaire — le visuel, le texte, le message — est devenue determinante. Un bon ciblage avec une creation mediocre ne performe plus.</p>

<h2>Ciblage Meta Ads pour le marche ivoirien</h2>
<p>Les options de ciblage disponibles en Cote d'Ivoire sont moins granulaires qu'en Europe — certains ciblages par comportement d'achat ou secteur professionnel ne sont pas disponibles. Cela ne signifie pas que le ciblage est moins efficace : cela demande une approche differente, basee sur des audiences larges bien configurees et des signaux d'intention implicites.</p>
<p>Les audiences personnalisees (Custom Audiences) et similaires (Lookalike Audiences) sont particulierement puissantes sur ce marche. Si vous avez une base de clients existants, vous pouvez creer des audiences similaires et toucher des profils comparables avec une precision remarquable.</p>

<h2>La creation publicitaire qui fonctionne localement</h2>
<p>Les codes visuels et les messages qui fonctionnent en Cote d'Ivoire ont des specificites. Les visuels avec des personnes reelles (pas des stock photos generiques) et des contextes locaux reconnaissables genent une confiance superieure. Le texte en francais standard est efficace, mais les references a des realites locales (quartiers, occasions, codes culturels) augmentent l'engagement.</p>
<p>WhatsApp est central dans le parcours d'achat ivoirien. Meme si un prospect clique sur une publicite Facebook, il va souvent vouloir contacter via WhatsApp avant d'acheter ou de remplir un formulaire. Integrer un lien click-to-WhatsApp dans vos campagnes n'est pas optionnel — c'est une facon de rencontrer le prospect la ou il est le plus a l'aise.</p>

<h2>Les formulaires leads Facebook : pourquoi ils fonctionnent bien en Cote d'Ivoire</h2>
<p>Les formulaires leads natifs Facebook (Lead Ads) sont particulierement efficaces sur le marche ivoirien pour deux raisons specifiques. D'abord, l'experience reste entierement dans l'application, sans redirection vers un site externe — ce qui reduit la friction et les abandons, surtout sur les connexions lentes. Ensuite, les informations sont pre-remplies depuis le profil Meta, ce qui augmente significativement le taux de completion.</p>
<p>La contrepartie : les leads generes par formulaire natif ont parfois une qualite plus variable que ceux generes par une landing page externe. La qualification au premier contact est plus importante. Nous testons les deux formats et orientons selon les resultats obtenus sur votre offre specifique.</p>

<h2>FAQ — Facebook Ads en Cote d'Ivoire</h2>
<h3>Quel budget minimum pour des resultats ?</h3>
<p>150 000 FCFA par mois de budget media minimum. Ce montant permet d'avoir suffisamment de volume pour que l'algorithme Meta optimise correctement. Pour un retargeting et des tests creatifs serieux, 300 000 FCFA et plus est plus adapte.</p>
<h3>Vos campagnes integrent-elles Instagram ?</h3>
<p>Oui, systematiquement. Les placements Meta incluent Facebook et Instagram. Selon votre audience, Instagram peut etre plus performant sur certains segments (15-35 ans, marques de mode, services premium). Nous ajustons les placements selon les resultats.</p>
<h3>Comment mesurez-vous les resultats de mes campagnes ?</h3>
<p>Nous configurons le pixel Meta correctement, nous definissons les evenements de conversion (formulaire, appel, achat) et nous suivons le cout par resultat reel — pas seulement les impressions ou les clics. Chaque semaine, vous recevez un rapport avec les chiffres cles et les actions menees.</p>

<p>Vous voulez des campagnes Facebook adaptees au marche ivoirien ? <a href="/contact">Parlez-nous de vos objectifs.</a></p>`,
    },
    {
      slug: "identite-visuelle-logo-abidjan",
      title: "Identite visuelle et logo a Abidjan : investir dans votre image",
      excerpt: "Pourquoi l'identite visuelle est un levier commercial concret pour les entreprises ivoiriennes, et comment bien aborder ce projet.",
      category_id: catMap["strategie"],
      content: `<h2>L'identite visuelle comme signal de credibilite</h2>
<p>Avant qu'un prospect lise votre offre, il a deja forme une opinion sur votre entreprise. Le logo qu'il voit sur votre carte de visite, la mise en page de votre site, la coherence de vos visuels Instagram — tous ces elements envoient un signal sur votre niveau de serieux et de qualite. Ce signal precede et conditionne l'evaluation de votre offre.</p>
<p>Sur le marche ivoirien, cette realite est encore plus marquee. Dans un contexte ou la confiance est fondamentale dans la decision d'achat, l'apparence visuelle d'une entreprise est souvent utilisee comme raccourci pour evaluer sa legitimite. Une entreprise avec une identite visuelle professionnelle inspire confiance avant meme le premier echange.</p>

<h2>Logo vs identite visuelle : quelle difference ?</h2>
<p>Un logo est un symbole ou un logotype — un fichier image qui represente visuellement votre marque. Une identite visuelle est un systeme : le logo, ses variations, une palette de couleurs, des typographies, des regles d'application et des templates de supports. C'est ce systeme qui permet a votre marque d'etre reconnaissable et coherente sur tous les points de contact.</p>
<p>Un logo sans systeme autour peut rapidement devenir incoherent : couleur differente selon le support, typographie qui change selon qui prepare le document, taille aleatoire selon le contexte. Le resultat est une image qui manque de professionnalisme, meme si le logo initial etait bien concu.</p>

<h2>Ce qu'inclut une identite visuelle complete</h2>
<p>Une identite visuelle professionnelle comprend : le logo principal et ses variantes (horizontal, vertical, icone seule, fond clair et fond fonce, monochrome), une palette de couleurs primaire et secondaire avec les codes hex/RVB/CMJN, les typographies validees (fonte principale et secondaire), des exemples d'application sur les supports principaux, et un guide d'utilisation pour votre equipe.</p>
<p>Les formats livres couvrent le web (PNG transparent, SVG) et l'impression (EPS, PDF vectoriel). Ces fichiers vous appartiennent completement — vous pouvez les utiliser avec n'importe quel autre prestataire present ou futur.</p>

<h2>Le processus de creation chez LGM</h2>
<p>Notre processus commence par un brief approfondi : votre positionnement, votre marche cible, vos references visuelles, le niveau de premium attendu, et les supports principaux sur lesquels l'identite sera utilisee. Un cabinet de conseil ne doit pas avoir le meme vocabulaire visuel qu'une marque de grande consommation populaire.</p>
<p>Nous presentons ensuite 2 a 3 pistes creatives differentes, avec un argumentaire pour chaque direction. Une fois la direction choisie, nous affinons sur 2 cycles de retours. La livraison finale inclut tous les fichiers et le guide d'application.</p>

<h2>FAQ — Identite visuelle et logo a Abidjan</h2>
<h3>Combien coute la creation d'un logo et d'une identite visuelle ?</h3>
<p>Un logo avec charte simple (palette + typographie + mini-guide) commence a 300 000 FCFA. Une identite visuelle complete avec templates de supports et guide d'application detaille est entre 600 000 et 1 200 000 FCFA selon la complexite. Ce sont des investissements durables — une bonne identite visuelle reste pertinente 5 a 10 ans.</p>
<h3>Combien de temps prend la creation ?</h3>
<p>Un logo simple prend 3 a 4 semaines. Une identite visuelle complete avec plusieurs supports prend 5 a 8 semaines selon la complexite du brief et la reactivite du client pour les retours.</p>
<h3>Est-ce que je possede les fichiers apres la livraison ?</h3>
<p>Oui, completement. Vous etes proprietaire de tous les fichiers livres et de l'identite visuelle creee. Vous pouvez les utiliser avec n'importe quel autre prestataire sans restriction.</p>

<p>Vous voulez une identite visuelle qui reflete vraiment le niveau de votre entreprise ? <a href="/contact">Parlons de votre projet de branding.</a></p>`,
    },
    {
      slug: "logiciel-sur-mesure-abidjan",
      title: "Logiciel sur mesure a Abidjan : quand investir dans un outil metier",
      excerpt: "Comment savoir si un developpement logiciel sur mesure est pertinent pour votre entreprise, et ce que ca implique vraiment.",
      category_id: catMap["developpement-web"],
      content: `<h2>Quand un logiciel sur mesure devient necessaire</h2>
<p>La decision d'investir dans un logiciel sur mesure n'est pas evidente. Les outils generiques — CRM standard, tableurs, outils no-code — couvrent 80% des besoins de la majorite des entreprises. Mais quand vos equipes commencent a contourner l'outil plutot que de l'utiliser, quand vos donnees sont dispersees dans cinq endroits differents, quand vous avez des regles metier que les solutions standard ne peuvent pas implementer — c'est le signal que le developpement sur mesure devient pertinent.</p>
<p>Le test le plus simple : si votre equipe passe plus de 30 minutes par jour a faire des taches repetitives qu'un outil devrait faire automatiquement, un logiciel sur mesure peut etre rentabilise en quelques mois. Le retour sur investissement est mesurable : temps economise × valeur horaire × nombre de personnes × 12 mois.</p>

<h2>Ce que nous developpons le plus souvent</h2>
<p><strong>CRM metier</strong> : Un CRM construit pour votre cycle de vente specifique, avec vos etapes, vos champs et votre logique de qualification. Pas un CRM generique ou vous avez configure 200 champs dont vous utilisez 12.</p>
<p><strong>Portails clients</strong> : Un espace en ligne ou vos clients suivent leurs commandes, acces leurs documents, soumettent des demandes et consultent leur historique. Professionnel, securise et aux couleurs de votre marque.</p>
<p><strong>Dashboards de pilotage</strong> : Une vue centralisee qui consolide les donnees de vos differentes sources (comptabilite, CRM, logistique, publicite) et affiche les indicateurs cles en temps reel. Plus de rapports Excel prepares manuellement.</p>
<p><strong>Outils d'automatisation interne</strong> : Applications qui automatisent les taches repetitives — generation de documents, calcul de devis, envoi de notifications, mise a jour de bases de donnees — selon vos regles metier specifiques.</p>

<h2>La propriete du code : un point non-negociable</h2>
<p>Contrairement aux abonnements SaaS, un logiciel sur mesure que nous developpons vous appartient completement. Nous livrons le code source, la documentation technique et les acces a l'infrastructure. Vous pouvez confier la maintenance et les evolutions a n'importe quel autre developpeur. Il n'y a aucune dependance a notre structure apres la livraison.</p>
<p>Cette propriete est importante sur le long terme. Vos processus changent, votre entreprise grandit, vos besoins evoluent. Un outil que vous possedez peut etre adapte a ces evolutions. Un abonnement SaaS vous expose aux decisions de son editeur — changements de prix, fonctionnalites supprimees, fermeture de service.</p>

<h2>Comment se passe un projet de developpement chez LGM</h2>
<p>Nous commencons par une cartographie des flux actuels — pas par des specifications techniques. Qui fait quoi ? Quelles donnees circulent ? Quels sont les irritants quotidiens ? Cette phase prend 1 a 2 semaines et permet de concevoir un outil qui correspond a la realite operationnelle, pas a un ideal theorique.</p>
<p>Nous developpons ensuite par increments. Les premieres fonctionnalites sont utilisables bien avant la fin du projet. Nous collectons les retours des premiers utilisateurs et nous integrons les ajustements necessaires en cours de developpement. Un outil non utilise n'a aucune valeur — l'adoption est notre critere de succes, pas la livraison.</p>

<h2>FAQ — Logiciel sur mesure a Abidjan</h2>
<h3>Quel est le budget minimum pour un logiciel sur mesure ?</h3>
<p>Un outil simple (formulaire avec base de donnees, tableau de bord de suivi, portail avec authentification) demarre a 800 000 FCFA. Un CRM complet ou une plateforme multi-utilisateurs avec logique metier complexe est entre 3 000 000 et 10 000 000 FCFA selon la scope.</p>
<h3>Combien de temps prend le developpement ?</h3>
<p>Un outil simple : 6 a 10 semaines. Un projet complexe : 3 a 6 mois. Nous livrons par increments — les premieres fonctionnalites sont utilisables avant la fin du projet.</p>
<h3>Puis-je faire evoluer l'outil apres la livraison ?</h3>
<p>Oui. Vous possedez le code source et pouvez le confier a n'importe quel developpeur. Nous proposons un contrat de maintenance optionnel pour les evolutions et corrections, mais ce n'est pas obligatoire.</p>

<p>Vous pensez qu'un outil sur mesure pourrait transformer vos operations ? <a href="/contact">Parlons de votre projet lors d'un premier echange.</a></p>`,
    },
  ];

  let inserted = 0;
  let failed = 0;

  for (const article of articles) {
    const { error } = await supabase.from("blog_posts").upsert(
      {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category_id: article.category_id,
        published: true,
        published_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );

    if (error) {
      console.error(`FAILED ${article.slug}:`, error.message);
      failed++;
    } else {
      console.log(`OK ${article.slug}`);
      inserted++;
    }
  }

  console.log(`\nDone: ${inserted} inserted/updated, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
