export const EXHIBIT_CONTEXT_CARDS = [
  {
    label: 'Historical Zeitgeist',
    content:
      '1937–1968 marked the Federal Housing Administration\'s "Redlining" era, when residential areas were color-coded on maps to discourage lending in predominantly Black neighborhoods. This was followed by decades of disinvestment and demographic displacement. San Francisco\'s historically redlined neighborhoods: the Mission District, Fillmore, and Bayview were areas where predominantly Black communities were systematically excluded from homeownership and investment. In the present day, historic oppression continues to affect even the non-economic aspects of life, showing how inequality exists in many spheres.',
  },
  {
    label: 'Map Data Context',
    content:
      'The "Percent for Art" program in San Francisco (1985) required major land developments to allocate 1% of spending to public art builds. Built into the 1985 Downtown Plan, art investment tended to develop in wealthy (and non-Black) communities; if a building was more expensive, the art would follow. Further, communities such as Fillmore and Bayview are also systematically excluded from the plan in the first place. As the exhibit shows, art access is a part of broader inequality rather than being a separate tenet. The 1% Art Program aims to increase access to art. It is just one example, but it clearly shows that Black access to art (in addition to other privileges) is both unequal and unresolved. The dissonance in the exhibit exists because SF is so culturally vibrant: ranked 5th for its culture and historic legacy. For such a discrepancy to occur is shocking, and it shows how only a percent of us can truly experience art.',
  },
  {
    label: 'Theory Connections',
    content: `Nature of space: As we continue to advance into the technical milieu, develop further into the arts, and progress toward things that benefit society, there is still a majority (policymakers and the upper class) that disproportionately benefits from how space is used. Whether one\'s space can be aesthetic is still somewhat correlated with upbringing and race. The map also reveals how Santos\’ theory of flows (money, ideas, culture) gets tangibly calcified into unequal fixities through the establishment of real estate. Culture disproportionately flows to SoMa and downtown.

The crux of Santos\' theory, however, is the tendency for technical objects to be unevenly distributed across a space as they become developed and society advances. The original work was concerned with São Paulo and global landscapes, but a strikingly similar trend occurs through a cultural lens in San Francisco. Seemingly, regardless of the scope, the lens, the criteria, or the city, intra-urban inequality consistently prevails, and space is never equally used.

Pruitt-Igoe: Pruitt-Igoe shows how even potentially honorable state policy can crumble if not well-maintained or revised. Just as the housing projects failed to serve the people who lived within them, modern access-to-art initiatives fail to serve the communities that need them most. Further, urban renewal programs shown in Exhibit II reflect a similarity to Pruitt-Igoe. The difference, however, is that Black citizens couldn\’t get back into state housing and were instead pushed out of SF, which enabled repression of the now-Black minority economically, socially, and, as this exhibit shows, culturally.`},
  {
    label: 'Key Statistics',
    content:
      'SoMa contains 11 civic art locations, Mission has 6, Fillmore has 2, and Bayview has only 1. This is a stark disparity that mirrors investment patterns and the ongoing erasure of Black cultural presence in these neighborhoods. While I could not get the data in map format, a disproportionate number of art venues in Fillmore and other Black cultural communities closed down compared to the rest of San Francisco. Notably, not a single 1% Art Program build exists within previously redlined districts because the policy that created it is exclusionary toward them. The current population of Black San Franciscans sits at just around 5%, down from 13.4% in 1970, and their minority status makes cultural exclusion forgettable.',
  },
  {
    label: 'Contemporary Significance',
    content:
      `Art can be defined as cultural exhibits, paintings, public statues, and many forms of expression. Art is generally good and is proven to improve health, safety, and well-being (UPenn). SF in particular holds a lot of cultural significance within America for many historical events and developments. Informally, art is regarded as a privilege; museums act as fun places to visit, and one might admire a statue in a park. Art is often taken for granted, and inequality in its access is rarely studied. Of course, health, economic status, and social treatment are significantly more important than art, but art contributes to and is a byproduct of all three. Studying art can help broaden cross-disciplinary studies and tackle existing inequality in innovative ways. 

I chose this topic because I felt that rather than being a high-impact issue, art access is an underrepresented one in research. It’s apparent and true that income inequality exists for Black Americans, but studying byproducts of this fact can help break into more productive and specific change. I also personally enjoy art a lot, and feel privileged to have the opportunity to go to museums or jazz shows; such a simple thing shouldn’t be restricted based on the color of one’s skin. Finally, when researching the “Percent for Art” program, the data between the redlined districts and established art venues was so apparent that I felt it was imperative to document. 
`,
    large: true,
  },
  {
    label: 'Limitations',
    content:
      `Limitations of this research include a narrow scope within SF, a small number of data points (due to fewer art exhibits than people or other metrics), and a lack of clear Black population data, relying on assumptions from previously redlined or historically Black communities. Further research could broaden the scope both geographically and in data quality and breadth. I could synthesize/clean more comprehensive data from SF OpenData or other institutions or design multiple visuals to contribute to one story. Next steps/revisions could push toward an analysis of how art access directly influences quality of life, and this exhibit could have a two-pronged impact of making San Franciscan citizens more aware while simultaneously urging policy transformation. Another limitation is the rushed design and lack of tangible storytelling. I struggled to combine data with effective visualizations while also maintaining a consistent (and comprehensive) narrative. While the narrative tells a clear story of injustice in SF, it is worth noting that the speed at which it was built means it does not tell the whole story. Improving this design could look like opening more exhibits or writing more contextualization, which was a main goal for the final version coming out of the midpoint review.

A second limitation is human bias; I wanted to create a project that had a “shocking statistic,” which means I omitted improvements such as the Model Cities Program. While a longer, more nuanced project should include a comprehensive look at history, I found that it reduced clarity due to its concise nature and chose to remove it. I believe this was the right choice, but it does pose the limitation of the project being less holistic in telling the true history.

Finally, similar to the first limitation, is that the story is not completely comprehensive. Jazz clubs and art venues are not the same thing, but I grouped them under “culture” because art venues in the 1950s were too inaccessible and hardly impactful. The trends of the exhibits are true and persist, but the medium by which they were articulated is slightly off due to time constraints. 
`,
    large: true,
  },
]

export const EXHIBIT_PROCESS_CARD = {
  label: 'Making This Exhibit',
  content: 'Making this exhibit was a lot of fun. I\'m currently learning more about web dev, but I\'ve spent a lot of time on backend and systems, so this was a great opportunity to focus on design and UI. This was also a struggle, though. Spending a lot of time trying to make sure boxes were aligned meant I couldn\'t fully tell the stories I wanted to. The exhibits are somewhat sparse for a website because, by the time I integrated a graph, I ran out of time to find more data. Still, I think it taught me the power of simplicity and minimalism. As long as the narrative gets across and the proper emotions are felt, I would deem this project a success.',
}

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
