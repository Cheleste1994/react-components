import React, { Component } from 'react';
import icons from '../../assets/react.svg';
import styles from './logoLoad.module.scss';

export default class LogoLoad extends Component {
  render() {
    return <img src={icons} alt="loading" className={styles.logo} />;
  }
}
