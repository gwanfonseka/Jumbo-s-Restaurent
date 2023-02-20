import { useSelector } from "react-redux";

const Notifiaction = () => {
    const notificationMessage = useSelector(state => state.notification)

    const showNotification = {
        display: 'block'
    }

    const hideNotification = {
        display: 'none'
    }

    const visibility = notificationMessage === '' ? hideNotification : showNotification

    return (
        <div style={visibility}>
            <span className="notification">{notificationMessage}</span>
        </div>
    )
}

export default Notifiaction