import { useEffect, useState } from "react";
import "./GroupRole.scss";
import { toast } from "react-toastify";
import {
  fetchAllRole,
  fetchRolesByGroup,
  assignRolesToGroup,
} from "../../services/roleService";
import { fetchGroup } from "../../services/userService";
import _ from "lodash";
const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRoles, setlistRoles] = useState([]);
  const [assignRole, setAssignRole] = useState([]);
  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.EC === 0) {
      setlistRoles(data.DT);
    }
  };
  const handelOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && +data.EC === 0) {
        let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
        setAssignRole(result);
        console.log(assignRole);
      }
    }
  };
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleSelectRole = (value) => {
    const _assignRole = _.cloneDeep(assignRole);
    let foundIndex = _assignRole.findIndex((item) => +item.id === +value);
    if (foundIndex > -1) {
      _assignRole[foundIndex].isAssigned = !_assignRole[foundIndex].isAssigned;
    }
    setAssignRole(_assignRole);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assignRole = _.cloneDeep(assignRole);
    result.groupId = selectGroup;
    let groupRoles = _assignRole.filter((item) => item.isAssigned === true);
    let finalGroupRoles = groupRoles.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    }
  };
  return (
    <div className="group-role-container">
      <div className="container">
        <h4>Group Role:</h4>
        <div className="assign-group-role">
          <div className="col-12 col-sm-6 form-group">
            <label>
              Select Group (<span className="red">*</span>):
            </label>
            <select
              className={"form-select"}
              type="text"
              onChange={(event) => handelOnChangeGroup(event.target.value)}
            >
              <option value="">Please select your group</option>
              {userGroups.length > 0 &&
                userGroups.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          {selectGroup && (
            <div className="roles">
              <h5>Assign Roles:</h5>
              {assignRole &&
                assignRole.length > 0 &&
                assignRole.map((item, index) => {
                  return (
                    <div class="form-check" key={`list-role-${index}`}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={`list-role-${index}`}
                        checked={item.isAssigned}
                        onChange={(event) =>
                          handleSelectRole(event.target.value)
                        }
                      />
                      <label
                        class="form-check-label"
                        for={`list-role-${index}`}
                      >
                        {item.url}
                      </label>
                    </div>
                  );
                })}
              <div className="mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GroupRole;
