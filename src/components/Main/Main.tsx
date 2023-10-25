import React, { Component, ReactNode } from 'react';
import styles from './main.module.scss';

export default class Main extends Component {
  render(): ReactNode {
    return <main className={styles.main}>Main</main>;
  }
}
