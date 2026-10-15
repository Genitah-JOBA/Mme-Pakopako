// Maquette de démonstration pour le restaurant Pakopako, réalisée par Kreadis.
// ⚠️ Les plats, prix, horaires et photos sont des EXEMPLES à remplacer
// par les vrais contenus du restaurant (avec son accord).

const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const resto = {
  name: 'Pakopako',
  tagline: 'Un voyage culinaire entre Madagascar et l’Orient',
  intro: 'Des plats faits maison, un accueil chaleureux, une ambiance bord de mer.',
  slogan: 'Savourez, partagez, revenez.',
  city: 'Antananarivo, Madagascar',
  phone: '034 14 978 28',
  phoneLink: '+261341497828',
  whatsapp: '261341497828', // format international sans « + » pour wa.me
  email: 'madamepakopako@gmail.com',
  facebook: 'https://web.facebook.com/razanatsoasamimahabdallah',
  hours: [
    ['Lundi – Vendredi', '10h00 – 22h00'],
    ['Samedi – Dimanche', '09h00 – 23h00'],
  ],
}

export const heroImage = img('photo-1559339352-11d035aa65de', 1800)
export const aboutImages = [img('photo-1528712306091-ed0763094c98'), img('photo-1551218808-94e220e084d2', 700)]

export const categories = [
  {
    key: 'malagasy',
    label: 'Saveurs de Madagascar',
    dishes: [
      { name: 'Romazava', text: 'Bouillon de zébu aux brèdes mafana, servi avec du riz.', price: 15000, image: img('photo-1455619452474-d2be8b1e70cd') },
      { name: 'Ravitoto sy henakisoa', text: 'Feuilles de manioc pilées et porc fondant, une recette de famille.', price: 16000, image: img('photo-1585937421612-70a008356fbe') },
      { name: 'Mi sao aux crevettes', text: 'Nouilles sautées, légumes croquants et crevettes.', price: 14000, image: img('photo-1563379926898-05f4575a45d8') },
      { name: 'Masikita', text: 'Brochettes de zébu grillées au feu de bois.', price: 8000, image: img('photo-1599487488170-d11ec9c172f0') },
    ],
  },
  {
    key: 'orient',
    label: 'Saveurs d’Orient',
    dishes: [
      { name: 'Tajine de légumes', text: 'Légumes mijotés aux épices douces et pois chiches.', price: 18000, image: img('photo-1541518763669-27fef04b14ea') },
      { name: 'Poulet curry & naan', text: 'Curry crémeux, pain naan maison au fromage.', price: 17000, image: img('photo-1565557623262-b51c2513a641') },
      { name: 'Chawarma maison', text: 'Poulet mariné, crudités et sauce blanche dans un pain chaud.', price: 12000, image: img('photo-1529006557810-274b9b2fc783') },
      { name: 'Riz pilaf épicé', text: 'Riz parfumé aux épices, légumes et citron.', price: 13000, image: img('photo-1512058564366-18510be2db19') },
    ],
  },
  {
    key: 'snacks',
    label: 'Petites faims & douceurs',
    dishes: [
      { name: 'Sambos', text: 'Beignets croustillants farcis à la viande ou aux légumes (x5).', price: 5000, image: img('photo-1601050690597-df0568f70950') },
      { name: 'Grillades à partager', text: 'Assortiment de viandes grillées et sauces maison.', price: 35000, image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Verrines fruitées', text: 'Crème légère et fruits frais de saison.', price: 6000, image: img('photo-1488477181946-6428a0291777') },
      { name: 'Thé glacé maison', text: 'Thé infusé, citron vert et menthe fraîche.', price: 4000, image: img('photo-1556679343-c7306c1976bc') },
    ],
  },
]

export const gallery = [
  img('photo-1504674900247-0877df9cc836', 1000),
  img('photo-1414235077428-338989a2e8c0'),
  img('photo-1547592180-85f173990554'),
  img('photo-1507525428034-b723cf961d3e'),
  img('photo-1540914124281-342587941389'),
]

export const formatPrice = (n) => `${n.toLocaleString('fr-FR').replace(/ /g, ' ')} Ar`

// Lien WhatsApp avec un message déjà écrit
export const waLink = (text) => `https://wa.me/${resto.whatsapp}?text=${encodeURIComponent(text)}`
