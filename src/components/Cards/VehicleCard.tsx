import React, { Component } from 'react';
import { ApiResponse, AppProps, Vehicle } from '../../types/interface';
import styles from '../Main/main.module.scss';

export default class VehicleCard extends Component<AppProps> {
  render() {
    return (
      <div className={this.props.isLoading ? styles.loading : ''}>
        {(this.props.dataResponse as ApiResponse<Vehicle>)?.results?.map(
          (el, index) => (
            <div key={`${new Date().getTime()}${index}${Math.random()}`}>
              <h3>{el.name}</h3>
              <span>Model: {el.model}</span>
              <span>Manufacturer: {el.manufacturer}</span>
              <span className={styles.films}>
                Film URL Resources that this starship has appeared in:
                <div>
                  {el.films?.map((film, index) => (
                    <div key={`film-${index}`}>
                      Film {index + 1}: <a href={film}>Link</a>
                    </div>
                  ))}
                </div>
              </span>
              <span>{el.created}</span>
            </div>
          )
        ) || 'Loading...'}
      </div>
    );
  }
}
