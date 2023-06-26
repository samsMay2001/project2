export function userFollowing(item, loggedUser){
    if (Object.keys(loggedUser).length !== 0 && loggedUser.username!== null){
        const condition1 = loggedUser.username.trim() === item.username.trim()
        const followIndex = loggedUser.following.findIndex(i => i===item.username)
        if ((followIndex > -1)){
            return true;
        }else{
            if(condition1){
                return true
            }else {
                return false
            }
        }
    }else {
        return true
    }
}