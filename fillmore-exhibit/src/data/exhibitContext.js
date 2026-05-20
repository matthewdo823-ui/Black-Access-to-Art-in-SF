export const EXHIBIT_CONTEXT_CARDS = [
  {
    label: 'Historical Zeitgeist',
    content:
      '1937–1968: The Federal Housing Administration\'s "Redlining" era, when residential areas were color-coded on maps to discourage lending in predominantly Black neighborhoods, followed by decades of disinvestment and demographic displacement. San Francisco\'s historically redlined neighborhoods: Mission District, Fillmore, and Bayview are areas where predominantly Black communities were systematically excluded from homeownership and investment. In the present day, historic oppression still continues to affect even the non-economic aspects of life; showing how inequality exists in many spheres of life.',
  },
  {
    label: 'Map Data Context',
    content:
      'The 1% art program in San Francisco (1985) required major land developments to allocate 1% of spending to public art builds. Built into the 1985 Downtown Plan, art investment tended to develop in wealthy (and non-Black) communities; if a building was more expensive, the art would follow. Further, communities such as Fillmore and Bayview are also systematically excluded from the plan in the first place. As the exhibit shows, art access is a part of broader inequality rather than being a separate tenet. The 1% art program aims to increase access to art. It is just one example, but it clearly shows that Black access to art (in addition to other privileges) is both unequal and unsolved.',
  },
  {
    label: 'Theory Connections',
    content: `Nature of space: As we continue to advance into the technical milieu, develop further into the arts, and progress towards things that benefit society, there is still a majority (policymakers and upper class) that disproportionately benefit from how space is used. Whether one's space can be aesthetic is still somewhat correlated to upbringing and race
Pruitt-Igoe: Pruitt-Igoe shows how even potentially honorable state policy can crumble if not well-maintained or revised. Just as the housing projects failed to serve the people that lived within them, modern access to art initiatives fail to serve communities that need it most.`,
  },
  {
    label: 'Key Statistics',
    content:
      'SoMa contains 11 civic art locations, Mission has 6, Fillmore has 2, and Bayview has only 1. This is a stark disparity that mirrors investment patterns and the ongoing erasure of Black cultural presence in these neighborhoods. While I could not get the data in map format, a disproportionate amount of art venues in Filmore/Black cultural communities closed down compared to the rest of San Francisco. Most notably, as well, is that not a single 1% art program build exists within previously redlined districts because the policy that created it is exclusionary towards them. The current population of Black San Franciscans sits at just around 5%, down from 13.4% in 1970, and their minority status makes cultural exclusion forgettable.',
  },
  {
    label: 'Contemporary Significance',
    content:
      'Art can be defined as cultural exhibits, paintings, public statues, and many forms of expression. Art is generally good, proven to improve health, safety, and well-being (UPenn). SF in particular holds a lot of cultural significance within America for many historical events and developments. Informally, art is regarded as a privilege–museums act as fun places to visit, and one might admire a statue in a park. Art is often taken for granted, and inequality in its access is rarely studied. Of course, health, economic status, and social treatment are significantly more important than art, but art contributes–and is a byproduct–-of all 3. Studying art can help broaden cross-disciplinary studies and tackle existing inequality in innovative ways.',
    large: true,
  },
  {
    label: 'Limitations',
    content:
      'Limitations of this research include a narrow scope within SF, a small amount of data points (due to fewer art exhibits than people or other metrics), and a lack of clear black population data relying on assumptions from previously redlined or historically black communities. Further research could broaden the scope both geographically and in data quality/breadth. Next steps could push towards an analysis on how art access directly influences quality of life, and this exhibit could have a two pronged impact of making San Fransiscan citizens more aware while simultaneously urging for policy transformation.',
    large: true,
  },
]

export const LAYER_CONTROLS = [
  {
    id: 'fullmappinginequality',
    label: 'Historically Redlined Districts',
    layerIds: ['fullmappinginequality', 'holc-redlined-outline'],
    defaultActive: true,
  },
  {
    id: 'one_percent_art',
    label: '1% Art Program Builds',
    layerIds: ['one_percent_art'],
    defaultActive: true,
  },
  {
    id: 'civic_art_collection',
    label: 'Civic Art Locations',
    layerIds: ['civic_art_collection'],
    defaultActive: false,
  },
  {
    id: 'cultural_districts',
    label: 'Cultural Districts',
    layerIds: ['cultural_districts'],
    defaultActive: false,
  },
]
