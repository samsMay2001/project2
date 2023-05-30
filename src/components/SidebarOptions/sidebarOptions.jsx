import './sidebarOptions.css'

export const SidebarOption = ({active, text, Icon}) => {

    return (
        <div className={`sidebarOptions ${active && "sidebarOption--active"}`}>
            <Icon/>
            <h2>{text}</h2>
        </div>
    )
}