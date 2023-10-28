import React, { Component } from 'react';
import {
  ApiResponse,
  Film,
  People,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '../../types/interface';
import styles from './Paginations.module.scss';

export default class Paginations extends Component<{
  handlePaginations?: (value: string) => void;
  dataResponse?: ApiResponse<
    People | Film | Starship | Vehicle | Species | Planet
  >;
}> {
  render() {
    return (
      <div className={styles.paginations}>
        <button
          onClick={() =>
            this.props.handlePaginations?.(
              this.props.dataResponse?.previous || ''
            )
          }
          disabled={!this.props.dataResponse?.previous}
        >
          Prev
        </button>
        <button
          onClick={() =>
            this.props.handlePaginations?.(this.props.dataResponse?.next || '')
          }
          disabled={!this.props.dataResponse?.next}
        >
          Next
        </button>
      </div>
    );
  }
}
