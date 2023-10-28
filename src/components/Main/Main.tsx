import React, { Component, ReactNode } from 'react';
import {
  ApiResponse,
  AppProps,
  Film,
  People,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '../../types/interface';
import Paginations from '../Paginations/Paginations';
import styles from './Main.module.scss';

export default class Main extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render(): ReactNode {
    switch (this.props.selectValue) {
      case 'people':
        return (
          <main className={`${styles.main}`}>
            <div>
              {(this.props.dataResponse as ApiResponse<People>)?.results?.map(
                (el, index) => (
                  <div
                    key={`${new Date().getTime()}${index}${Math.random()}`}
                    className={this.props.isLoading ? styles.loading : ''}
                  >
                    <h3>{el.name}</h3>
                    <span className={styles.films}>
                      Film resource URLs that this person has been in:
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
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      case 'films':
        return (
          <main className={styles.main}>
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
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      case 'starships':
        return (
          <main className={styles.main}>
            <div className={this.props.isLoading ? styles.loading : ''}>
              {(this.props.dataResponse as ApiResponse<Starship>)?.results?.map(
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
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      case 'vehicles':
        return (
          <main className={styles.main}>
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
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      case 'species':
        return (
          <main className={styles.main}>
            <div className={this.props.isLoading ? styles.loading : ''}>
              {(this.props.dataResponse as ApiResponse<Species>)?.results?.map(
                (el, index) => (
                  <div key={`${new Date().getTime()}${index}${Math.random()}`}>
                    <h3>{el.name}</h3>
                    <span>Classification: {el.classification}</span>
                    <span>Designation: {el.designation}</span>
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
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      case 'planets':
        return (
          <main className={styles.main}>
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
              ) || 'Loading...'}
            </div>
            <Paginations
              handlePaginations={this.props.handlePaginations}
              dataResponse={this.props.dataResponse}
            />
          </main>
        );
        break;
      default:
        break;
    }

    return <main className={styles.main}></main>;
  }
}
