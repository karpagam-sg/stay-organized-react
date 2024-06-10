import { useEffect, useState } from "react";
import { getTaskByUser } from "../services/taskService";
import { useFetch } from "../services/useFetch";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Todostable from "./todostable";

export default function Viewtasks() {
  const [users, setUsers] = useState([]);
  const [userid, setuserID] = useState("");

  const usersApiUrl = "http://localhost:8083/api/users";

  const [usersData] = useFetch(usersApiUrl);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  function getSelecteduserID(e) {
    let user = e.target.value;
    console.log(user);
    setuserID(user);
  }
  useEffect(() => {
    if (userid) {
      setuserID(userid);
      console.log("userid from state", userid);
    }
  }, [userid]);

  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <div className="row margintop text-center">
              <div className="text-center" style={{ marginBottom: 30 }}>
                Please Select User Here :
                <select
                  id="userlList"
                  className="dropdown-toggle"
                  onChange={getSelecteduserID}
                >
                  <option value="">Select a User</option>
                  {users.length > 0 &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              <Todostable userID={userid}></Todostable>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
