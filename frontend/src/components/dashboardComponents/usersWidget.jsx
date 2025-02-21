import React from "react";
import AppContext from "../../appContext";


const UsersWidget = () => {
    const { data } = React.useContext(AppContext);
    
    return (
        <div className="row">
            <div className="col-sm-12 menuList" id="usersList">
                <div className="listTitle fs-5 p-2 text-body"> Users </div>
                <ul className="listItem"> 
                    {data.UserList && data.UserList.map((user) => (
                        <li key={user.id}>{user.first_name} {user.last_name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UsersWidget;