// const store = require('store');
//
// const MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
// const CHECK_INTERVAL = 1000 // in ms
// const STORE_KEY =  'lastAction';
//
// class AutoLogoutService {
//
//   get lastAction() {
//     return parseInt(store.get(STORE_KEY));
//   }
//   set lastAction(value) {
//     store.set(STORE_KEY, value);
//   }
//
//   constructor(authService) {
//     this.auth = authService;
//     this.check();
//     this.initListener();
//     this.initInterval();
//   }
//
//   initListener() {
//     document.body.addEventListener('click', () => this.reset());
//   }
//
//   reset() {
//     this.lastAction = Date.now();
//   }
//
//   initInterval() {
//     setInterval(() => {
//       this.check();
//     }, CHECK_INTERVAL);
//   }
//
//   check() {
//     const now = Date.now();
//     const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
//     const diff = timeleft - now;
//     const isTimeout = diff < 0;
//
//     if (isTimeout && this.auth.loggedIn) {
//       this.auth.logout();
//     }
//   }
// }
