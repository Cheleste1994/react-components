import { useRouter } from 'next/router';
import styles from './Paginations.module.scss';

export default function Paginations(): JSX.Element {
  const router = useRouter();
  const page = Number(router.query?.page) || 1;

  const handleClickBtn = (value: string): void => {
    const limit = Number(router.query?.limit) || 10;

    const params = new URLSearchParams();

    if (value === 'prev') {
      params.set('page', `${page - 1}`);
    } else {
      params.set('page', `${page + 1}`);
    }

    const skip = (Number(params.get('page')) - 1) * limit;

    params.set('skip', `${skip}`);
    params.set('limit', `${limit}`);
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className={`paginations ${styles.paginations}`}
      data-testid="paginations"
    >
      <button
        onClick={() => handleClickBtn('prev')}
        disabled={page === 1}
        data-testid="prev-page"
      >
        Prev
      </button>
      <span data-testid="page-display">{page}</span>
      <button onClick={() => handleClickBtn('next')} data-testid="next-page">
        Next
      </button>
    </div>
  );
}
