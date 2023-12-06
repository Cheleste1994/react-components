import icons from '../../assets/react.svg';
import styles from './logoLoad.module.scss';

export default function LogoLoad(): JSX.Element {
  return (
    <img
      src={icons.src}
      alt="loading"
      className={styles.logo}
      data-testid="logo-load"
    />
  );
}
