// csrUsers.js [simulated "user database"]
export const csrUsers = [
  {
    id: 1,
    username: 'user1@xyz.com',
    password: 'password123*', // TODO hash this
    name: 'Jane Doe',
  },
  {
    id: 2,
    username: 'user2@xyz.com',
    password: 'password456*', // TODO hash this
    name: 'John Smith',
  },
];

export const authenticateUser = (username, password) => {
  const user = csrUsers.find((u) => u.username === username && u.password === password);
  return user || null;
};
