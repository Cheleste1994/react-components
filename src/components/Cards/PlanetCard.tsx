import React, { Component } from 'react';
import { ApiResponse, AppProps, Planet } from '../../types/interface';
import LogoLoad from '../LogoLoad/LogoLoad';
import styles from '../Main/main.module.scss';

export default class PlanetCard extends Component<AppProps> {
  render() {
    return (
      <div className={this.props.isLoading ? styles.loading : ''}>
        {(this.props.dataResponse as ApiResponse<Planet>)?.results?.map(
          (el, index) => (
            <div key={`${new Date().getTime()}${index}${Math.random()}`}>
              <h3>{el.name}</h3>
              <span>Diameter: {el.diameter}</span>
              <span>Gravity: {el.gravity}</span>
              <span>
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
        ) || <LogoLoad />}
      </div>
    );
  }
}
