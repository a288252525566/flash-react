import React from 'react';
import { ReactComponent as Logo } from 'images/logo.svg';
import styles from './header.module.scss';

const Header = () => {
  return (<div className={styles.header}>
    <Logo/>
  </div>);
}

export default Header;