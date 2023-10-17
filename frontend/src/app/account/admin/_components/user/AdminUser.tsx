import { API_GET_USERS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { User } from "@/types/userTypes";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { handleDate } from "../../../../../utils/userUtils";
import "../admin.scss";
import styles from "./adminuser.module.scss";

function AdminUser() {
  const [users, setUsers] = useState<User[]>();

  useFetchData(setUsers, API_GET_USERS);

  return (
    <div className="admin_container">
      <h1>Liste des utilisateurs</h1>
      <table className="table">
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Date</th>
          <th>role</th>
          <th>Image</th>
        </tr>
        {users &&
          users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>{handleDate(user.date)}</td>
              <td>{user.role}</td>
              <td className="td_img">
                {user.imgUser ? (
                  <div className={styles.img_container}>
                    <Image src={user.imgUser!} alt={user.name} fill={true} />
                  </div>
                ) : (
                  <div className={styles.userWithoutImg_container}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default AdminUser;
