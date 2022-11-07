import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser } from "../../redux/userReducer";
import axios from "axios";
import "./Form.scss";

export default function Main() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    designation: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const user = users.find((user) => user._id === id);
      if (user) {
        setUser(user);
      }
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/update_user/${id}`, user)
        .then((res) => {
          alert(res.data.message);
          dispatch(updateUser({ _id: id, user: user }));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/create_user`, {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          company: user.company,
          designation: user.designation,
        })
        .then((res) => {
          dispatch(addUser(res.data.user));
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.error);
        });
    }
  };

  return (
    <div className="forms">
      <h1>Create User</h1>
      <div className="userform">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            type="number"
            name="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <br />
          <label>Address</label>
          <br />
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <br />
          <label>Company</label>
          <br />
          <input
            type="text"
            name="company"
            value={user.company}
            onChange={(e) => setUser({ ...user, company: e.target.value })}
          />
          <br />
          <label>Designation</label>
          <br />
          <input
            type="text"
            name="designation"
            value={user.designation}
            onChange={(e) => setUser({ ...user, designation: e.target.value })}
          />
          <br />
          <div className="formUtils">
            {isEdit ? (
              <button type="submit">Update</button>
            ) : (
              <button type="submit">Create User</button>
            )}
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
