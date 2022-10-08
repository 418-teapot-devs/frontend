// A mock function to mimic making an async request for data
export const login = (username, password) => {
  return fetch("https://api.thecatapi.com/v1/images/search");
};
