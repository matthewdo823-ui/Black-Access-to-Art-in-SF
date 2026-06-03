/** Archival imagery for Vox-style layered backgrounds (Wikimedia Commons). */
const WIKI = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

const IMAGES = {
  sfEarthquakeNyt: `${WIKI}/6/62/19060419_San_Francisco_Earthquake_-_The_New_York_Times.jpg/1280px-19060419_San_Francisco_Earthquake_-_The_New_York_Times.jpg`,
  sfCall1906: `${WIKI}/6/6c/The_San_Francisco_Call_1906_September_16_Front_Page.jpg/1280px-The_San_Francisco_Call_1906_September_16_Front_Page.jpg`,
  cityHall: `${WIKI}/e/e4/San_Francisco_City_Hall_2.jpg/1280px-San_Francisco_City_Hall_2.jpg`,
  cityHallPlaza: `${WIKI}/e/e2/San_Francisco_City_Hall_and_United_Nations_Plaza.jpg/1280px-San_Francisco_City_Hall_and_United_Nations_Plaza.jpg`,
  fillmoreStreet: `${WIKI}/5/5b/Fillmore_and_Pines_Streets_San_Francisco_%288543317321%29_%28cropped%29.jpg/1280px-Fillmore_and_Pines_Streets_San_Francisco_%288543317321%29_%28cropped%29.jpg`,
  pruittIgoe: `${WIKI}/1/1b/Pruitt-Igoe-collapses.jpg/1280px-Pruitt-Igoe-collapses.jpg`,
  holcSf: `${WIKI}/f/ff/Home_Owners%27_Loan_Corp._%28HOLC%29_Neighborhood_Redlining_Grade_in_San_Francisco%2C_California.png/1280px-Home_Owners%27_Loan_Corp._%28HOLC%29_Neighborhood_Redlining_Grade_in_San_Francisco%2C_California.png`,
}

export const EXHIBIT_ATMOSPHERE = {
  collection: [
    { id: 'paper-headlines', src: IMAGES.sfEarthquakeNyt, placement: 'newspaper-tr' },
    { id: 'civic-hall', src: IMAGES.cityHall, placement: 'building-bl' },
  ],
  exhibit1: [
    { id: 'sf-call', src: IMAGES.sfCall1906, placement: 'newspaper-tr' },
    { id: 'fillmore-street', src: IMAGES.fillmoreStreet, placement: 'building-bl' },
  ],
  exhibit2: [
    { id: 'renewal-paper', src: IMAGES.sfEarthquakeNyt, placement: 'newspaper-tr' },
    { id: 'demolition', src: IMAGES.pruittIgoe, placement: 'building-bl' },
  ],
  exhibit3: [
    { id: 'holc-map', src: IMAGES.holcSf, placement: 'newspaper-tr' },
    { id: 'city-hall', src: IMAGES.cityHallPlaza, placement: 'building-bl' },
  ],
}
