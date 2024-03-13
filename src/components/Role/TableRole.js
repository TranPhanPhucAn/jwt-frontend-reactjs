import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { deletetRole, fetchAllRole } from "../../services/roleService";
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {
  const [listRoles, setlistRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);
  useImperativeHandle(ref, () => ({
    fetchListRoleAgain() {
      getAllRoles();
    },
  }));
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.EC === 0) {
      setlistRoles(data.DT);
    }
  };
  const handleDeleteRoles = async (role) => {
    let data = await deletetRole(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRoles(item)}
                      >
                        <i className="fa fa-trash"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={4}>Not found roles</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});
export default TableRole;
