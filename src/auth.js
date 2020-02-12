export const getUser = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  } 
}

export const isLoggedIn = () => {
  return window.localStorage.getItem('user');
}

export const setUser = user => {
  if ( typeof window !== "undefined" ) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
}

export const logout = firebase => {
  return new Promise(resolve => {
    firebase.auth().signOut().then(function() {
      window.localStorage.removeItem('user');
      resolve();
    })
  })
}