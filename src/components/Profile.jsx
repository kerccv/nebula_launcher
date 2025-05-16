const React = require('react');

const Profile = ({ user }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Профиль</h2>
      <p>Ваш ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

module.exports = { default: Profile };