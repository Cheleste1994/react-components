import React, { Component, ReactNode } from 'react';
import styles from './Header.module.scss';

export default class Header extends Component {
  render(): ReactNode {
    return <header className={styles.header}>header</header>;
  }
}
