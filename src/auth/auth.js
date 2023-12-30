

let userUuid = null;
let userId = null;

export const setUserUuid = (uuid) => {
  userUuid = uuid;
  localStorage.setItem('userUuid', uuid);
};

export const getUserUuid = () => {
  return userUuid || localStorage.getItem('userUuid');
};

export const setUserId = (id) => {
  userId = id;
  localStorage.setItem('id', id);
}

export const getUserId = () => {
  return userId || localStorage.getItem('id');
};
