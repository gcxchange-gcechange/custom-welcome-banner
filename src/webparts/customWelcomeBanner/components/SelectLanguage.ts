import * as strings from 'CustomWelcomeBannerWebPartStrings';

const english = require('../loc/en-us');
const french = require('../loc/fr-fr');


export function SelectLanguage(lang:string):ICustomWelcomeBannerWebPartStrings {
  switch(lang) {
    case "en-us": {
      return english;
    }
    case "fr-fr": {
      return french;
    }
    default: {
      return strings;
    }
 }
}
