import React from 'react';
import PropTypes from 'prop-types';
import './UserWithAvatar.css';

const UserWithAvatar = ({ user, orientation = 'vertical' }) => (
  <span className={`issue__user ${orientation}`}>
    <img className="issue__user__avatar" src={user.avatar_url} alt=""/>
  </span>
);

UserWithAvatar.propTypes = {
  user: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
    }).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};

export default UserWithAvatar;