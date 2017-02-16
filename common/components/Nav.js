import React from 'react';
import NavLink from './NavLink';
import { AppConstants } from '../constants';

const Nav = () => (
  <div>
    {
    AppConstants.links.map(link =>
      <NavLink key={link.link} link={link.link} title={link.title} />,
    )}
  </div>
);

export default Nav;
