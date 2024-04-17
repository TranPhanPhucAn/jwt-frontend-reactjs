import axios from "../setup/axios";
const createRoles = (roles) => {
  return axios.post("/api/role/create", [...roles]);
};
const fetchAllRole = (page, limit) => {
  return axios.get(`/api/role/read`);
};
const deletetRole = (role) => {
  return axios.delete(`/api/role/delete`, {
    data: { id: role.id },
  });
};
const fetchRolesByGroup = (groupId) => {
  return axios.get(`/api/role/by-group/${groupId}`);
};
const assignRolesToGroup = (data) => {
  return axios.post(`/api/role/assign-to-group`, { data });
};
export {
  createRoles,
  fetchAllRole,
  deletetRole,
  fetchRolesByGroup,
  assignRolesToGroup,
};
