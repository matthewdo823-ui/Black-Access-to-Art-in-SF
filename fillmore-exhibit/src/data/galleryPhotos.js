/** Archival images — OpenSFHistory (Western Neighborhoods Project) & FoundSF. */
const OPENSF = 'https://opensfhistory.org/Download'
const FOUNDSF = 'https://www.foundsf.org/images'

export const GALLERY_PHOTOS = [
  {
    id: 'fillmore-1942',
    year: 1943,
    caption: 'Fillmore Street',
    title: 'Fillmore Street, Wartime Evening',
    photographer: 'Jack Tillmany Collection · OpenSFHistory',
    image: `${OPENSF}/wnp67.0459.jpg`,
    orientation: 'landscape',
    gridClass: 'gallery-card--wide',
    description:
      'During World War II, shipyard workers and servicemen lived in the Fillmore’s clubs and restaurants. Streetcar lines ran constantly, and neon signs for "supper clubs" and pool halls lit the corridor deep into the night.',
    related: 'In 1942, roughly 14 nightclubs and dance halls operated along Fillmore Street.',
  },
  {
    id: 'jackson-willis-1950',
    year: 1948,
    caption: 'Jackson Street at Fillmore',
    title: 'Jackson and Fillmore',
    photographer: 'Municipal Railway · OpenSFHistory',
    image: `${OPENSF}/wnp27.50294.jpg`,
    orientation: 'landscape',
    gridClass: 'gallery-card--wide',
    description:
      'The F-line and 22-Fillmore streetcars made the Fillmore one of San Francisco’s most transit-active neighborhoods. Corner groceries, barber shops, and record stores clustered around each stop. People could ride from the Bayview to Fillmore in under twenty minutes.',
    related: 'In 1950, the 22-Fillmore carried over 30,000 riders on weekend nights.',
  },
  {
    id: 'fillmore-washington-1943',
    year: 1944,
    caption: 'Fillmore Street at Washington',
    title: 'Fillmore & Washington',
    photographer: 'Private collector · OpenSFHistory',
    image: `${OPENSF}/wnp14.1770.jpg`,
    orientation: 'landscape',
    gridClass: 'gallery-card--wide',
    description:
      'Wartime decorations still lined Fillmore Street in 1944. The metal arches at each intersection were being dismantled for the scrap drive, marking the end of an era.',
    related: 'In 1943, the Fillmore’s Black population continued to grow as wartime jobs drew families west.',
  },
  {
    id: 'wesley-johnson-1962',
    year: 1950,
    caption: 'Entrance to Wesley Johnson’s Texas Playhouse (Club Flamingo)',
    title: 'Wesley Johnson’s Barbecue Pit',
    photographer: 'African American Historical & Cultural Society · FoundSF',
    image: `${FOUNDSF}/e/e6/TexasPlayhouseClubFlamingo.jpg`,
    orientation: 'portrait',
    gridClass: '',
    description:
      'Johnson’s pit smoked brisket for club-goers and shift workers alike. The restaurant doubled as an informal booking office for musicians. They ate on credit and were famous; everyone knew the kitchen.',
    related: 'In 1962, over 60 Black-owned businesses lined Fillmore and Geary.',
  },
]
