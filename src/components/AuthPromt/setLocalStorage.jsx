export function setLocalStorage( navigate,username, setLoggedUser, setUserLoggedIn, setHomeTab){
    const appKey = "my-key"; 
    setLoggedUser((oldVal)=> {
        const loggedUserCopy = {...oldVal}
        loggedUserCopy.username = username; 
        localStorage.setItem(appKey, JSON.stringify(loggedUserCopy))
        return loggedUserCopy
    })
    setUserLoggedIn(true)
    // if (signingIn){
    //     navigate('/bmwm4'); 
    // }
    // navigate('/bmwm4'); 
}