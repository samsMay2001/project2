export function setLocalStorage(username, setLoggedUser, setUserLoggedIn, setUserTab, setHomeTab){
    const appKey = "my-key"; 
    setLoggedUser((oldVal)=> {
        const loggedUserCopy = {...oldVal}
        loggedUserCopy.username = username; 
        localStorage.setItem(appKey, JSON.stringify(loggedUserCopy))
        return loggedUserCopy
    })
    setUserLoggedIn(true)
    setUserTab(true); 
    setHomeTab(false)
}