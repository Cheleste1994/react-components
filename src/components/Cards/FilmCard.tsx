import React, { Component } from 'react';
import { ApiResponse, AppProps, Film } from '../../types/interface';
import styles from '../Main/main.module.scss';

export default class FilmCard extends Component<AppProps> {
  render() {
    return (
      <div className={this.props.isLoading ? styles.loading : ''}>
        {(this.props.dataResponse as ApiResponse<Film>)?.results?.map(
          (el, index) => (
            <div key={`${new Date().getTime()}${index}${Math.random()}`}>
              <h3>{el.title}</h3>
              <span>Director: {el.director}</span>
              <span>Producer: {el.producer}</span>
              <span className={styles.films}>
                Planet resource URLs that are in this film:
                <div>
                  {el.planets?.map((planet, index) => (
                    <div key={`planet-${index}`}>
                      Planet {index + 1}: <a href={planet}>Link</a>
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
