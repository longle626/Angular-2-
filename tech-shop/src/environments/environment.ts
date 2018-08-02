// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
  	apiKey: "AIzaSyAcj0rl3CoYGctz-C3wSAnFrQaZ590aFdU",
    authDomain: "tech-shop-a6493.firebaseapp.com",
    databaseURL: "https://tech-shop-a6493.firebaseio.com",
    projectId: "tech-shop-a6493",
    storageBucket: "tech-shop-a6493.appspot.com",
    messagingSenderId: "143054107948"

  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
