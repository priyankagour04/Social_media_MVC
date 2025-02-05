import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5055");

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = "USER_ID"; // Replace with logged-in user's ID
    socket.emit("join", userId);

    // Listen for new notifications
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((n, index) => (
          <div key={index} className="notification">
            {n.message}
          </div>
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
}

export default Notifications;
