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
export { createRoles, fetchAllRole, deletetRole };
