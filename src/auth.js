export const getUser = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
  } 
}

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.email;
}

export const setUser = user => {
  if ( typeof window !== "undefined" ) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
}

export const logout = firebase => {
  return new Promise(resolve => {
    firebase.auth().signOut().then(function() {
      setUser({});
      resolve();
    })
  })
}