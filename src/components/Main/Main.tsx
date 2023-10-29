import React, { Component, ReactNode } from 'react';
import { AppProps } from '../../types/interface';
import FilmCard from '../Cards/FilmCard';
import PeopleCard from '../Cards/PeopleCard';
import PlanetCard from '../Cards/PlanetCard';
import SpeciesCard from '../Cards/SpeciesCard';
import StarshipCard from '../Cards/StarshipCard';
import VehicleCard from '../Cards/VehicleCard';
import Paginations from '../Paginations/Paginations';
import styles from './Main.module.scss';

export default class Main extends Component<AppProps> {
  renderCardBySelectValue(): ReactNode {
    const { selectValue, dataResponse, isLoading } = this.props;

    switch (selectValue) {
      case 'people':
        return (
          <PeopleCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      case 'films':
        return (
          <FilmCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      case 'starships':
        return (
          <StarshipCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      case 'vehicles':
        return (
          <VehicleCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      case 'species':
        return (
          <SpeciesCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      case 'planets':
        return (
          <PlanetCard
            dataRoot={null}
            dataResponse={dataResponse}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  }

  render(): ReactNode {
    const card = this.renderCardBySelectValue();

    return (
      <main className={styles.main}>
        {card}
        {!this.props.dataResponse ||
        this.props.dataResponse.count <=
          this.props.dataResponse.results.length ? (
          ''
        ) : (
          <Paginations
            handlePaginations={this.props.handlePaginations}
            dataResponse={this.props.dataResponse}
          />
        )}
      </main>
    );
  }
}
