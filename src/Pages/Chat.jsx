import Main from "../Components/Main/Main"
import Sidebar from "../Components/Sidebar/Sidebar"

const Chat = () => {
    return (
        <div className="flex w-screen " style={{ animation: 'fadeIn 1.5s' }}>
            <Sidebar />
            <Main />
        </div>
    )
}

export default Chat