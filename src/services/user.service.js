import _api from "./api";

export const editUser = (data)=> _api.patch("/user/edit-profile",data)
