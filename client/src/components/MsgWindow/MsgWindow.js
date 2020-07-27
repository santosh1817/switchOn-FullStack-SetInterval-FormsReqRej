import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MsgWindow = () => {
  const [notifications, setnotifications] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => !isLoading && getNotifications(), 3000);
    return () => clearInterval(interval);
  }, []);

  const getNotifications = () => {
    setLoading(true);
    axios
      .get('http://localhost:3005/notification/all', {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      })
      .then(res => {
        setnotifications(res.data.notification);
        setLoading(false);
      });
  };
  return (
    <div>
      {notifications.map((item, index) => (
        <div className="navxyz">
            <nav className="navbar navbar-expand-lg navbar-light bg-light"  >
                <ul className="nav navbar-nav"></ul>
                <div>{item.msg}</div> 
            </nav>
        </div>
        
      ))}
    </div>
  );
};
export default MsgWindow;
