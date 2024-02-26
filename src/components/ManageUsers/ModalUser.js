import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _, { set } from "lodash";
const ModalUser = (props) => {
  const { action, dataModalUser } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
      // setUserData(dataModalUser);
      console.log("check userdata:", userData);
      console.log("check data set: ", {
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);
  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);
  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.length > 0) {
        setUserData({ ...userData, group: res.DT[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };
  const handelOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidateInputs = () => {
    if (action === "UPDATE") return true;
    setValidInputs(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        check = false;
        toast.error(`Empty input ${arr[i]}`);
        break;
      }
    }
    return check;
  };
  const handleConfirmUser = async () => {
    let check = checkValidateInputs();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });
      if (res && res.EC === 0) {
        props.onHide();
        setUserData({
          ...defaultUserData,
          group: userGroups && userGroups.length > 0 ? userGroups[0].id : "",
        });
      } else {
        toast.error("Error create user");
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };
  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => handleCloseModalUser()}
        centered
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>):
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>):
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>User name:</label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>):
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handelOnChangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender:</label>
              <select
                className="form-select"
                type="text"
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                <option selected value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>):
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-control is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handelOnChangeInput(event.target.value, "group")
                }
                value={userData.group}
              >
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
