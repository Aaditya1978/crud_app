import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, deleteUser } from "../../redux/userReducer";
import axios from "axios";
import "./Home.scss";

export default function Main() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/get_users`)
      .then((res) => {
        dispatch(setUser(res.data.users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/delete_user/${id}`)
      .then((res) => {
        alert(res.data.message);
        dispatch(deleteUser(id));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  return (
    <div className="main">
      <div className="utils">
        <button onClick={() => navigate("/create")}>Create User</button>
      </div>
      <h1>User List</h1>
      <div className="userlist">
        {users.length > 0 &&
          users.map((user) => (
            <div className="user" key={user._id}>
              <p>Name - {user.name}</p>
              <p>Email - {user.email}</p>
              <p>Phone - {user.phone}</p>
              <p>Address - {user.address}</p>
              <p>Company - {user.company}</p>
              <p>Designation - {user.designation}</p>
              <div className="user-utils">
                <button onClick={() => navigate(`/edit/${user._id}`)}>
                    Edit
                </button>
                <button onClick={() => handleDelete(user._id)}>
                    Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
