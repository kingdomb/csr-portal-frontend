// userSeed.js [simulated "user database"]
export const users = [
  {
    id: 1,
    username: 'user1@amp.com',
    password: 'password123*', // TODO hash this
    name: 'Jane Doe',
  },
  {
    id: 2,
    username: 'user2@amp.com',
    password: 'password456*', // TODO hash this
    name: 'John Smith',
  },
];

export const authenticateUser = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};
