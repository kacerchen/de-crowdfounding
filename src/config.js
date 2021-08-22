export default {
  apiUrl: 'http://joeylin.net/api/',
};
const siteConfig = {
  siteName: 'crowdfund.pago',
  siteIcon: 'ion-beer',
  footerText: 'Decentralized Crowdfund Platform ©2021 Created by Pago',
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: 'B2U28MOVQT',
  apiKey: '9a0e2fe501f01035813b4bb344f911ce',
};
const Auth0Config = {
  domain: '',
  clientID: '', //
  options: {
    auth: {
      autoParseHash: true,
      redirect: false,
    },
    languageDictionary: {
      title: 'crowdfund.pago',
      emailInputPlaceholder: 'demo@gmail.com',
      passwordInputPlaceholder: 'demodemo',
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: 'https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined,
        },
      },
    },
  },
};
const firebaseConfig = {
  apiKey: 'AIzaSyAZu4PAXMvrynZS59j_cds37bBnRQku3KE',
  authDomain: 'crowdfund-06072021.firebaseapp.com',
  databaseURL: '',
  projectId: 'crowdfund-06072021',
  storageBucket: 'crowdfund-06072021.appspot.com',
  messagingSenderId: '178550018499',
  appId: "1:178550018499:web:c3a01253713de04d626d76",
};
const googleConfig = {
  apiKey: '', //
};
const mapboxConfig = {
  tileLayer: '',
  maxZoom: '',
  defaultZoom: '',
  center: [],
};
const youtubeSearchApi = '';
export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
};
