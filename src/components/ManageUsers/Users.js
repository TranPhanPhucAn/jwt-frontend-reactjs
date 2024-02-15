import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./Users.scss";
import { fetchAllUser } from "../../services/userService";
const Users = (props) => {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (!session) {
  //     navigate("/login");
  //   }
  // }, []);
  // return <div>user component</div>;
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      // console.log("check: ", response.data.DT);
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    // alert(event.selected);
    setCurrentPage(+event.selected + 1);
  };
  return (
    <div className="container">
      <div className="manage-users-container">
        <div className="user-header">
          <div className="title">
            <h3>Table Users</h3>
            <div className="actions">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
            </div>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">User name</th>
                <th scope="col">Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                        <td>
                          <button className="btn btn-warning">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not found users</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Users;
