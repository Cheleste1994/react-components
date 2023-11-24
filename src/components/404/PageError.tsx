import LogoLoad from '../LogoLoad/LogoLoad';
import mainStyles from '../../pages/Home.module.scss';
import Link from 'next/link';

export default function PageError(): JSX.Element {
  return (
    <>
      <main className={mainStyles.main} data-testid="page-404">
        <LogoLoad />
        <div>
          <span>Page not found!</span>
        </div>
        <Link href={'/'}>Home</Link>
      </main>
    </>
  );
}
