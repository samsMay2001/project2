import { useAppContext } from "../../appContext/appContext"
import { AuthPrompt } from "../AuthPromt/authPrompt"
import { Feed } from "../Feed/feed"
import { SideBar } from "../Sidebar/sidebar"
import { Widgets } from "../Widgets/widgets"

export const Main = () => {
    const {setAppFocus} = useAppContext()
    function handleClick(e){
        e.stopPropagation(); 
        setAppFocus(true); 
        // console.log('app focus')
    }
    return (
        <div className="app" onClick={handleClick}>
            {/* <AuthPrompt/> */}
            <SideBar/>
            <Feed />
            <Widgets/>
        </div>
    )
}