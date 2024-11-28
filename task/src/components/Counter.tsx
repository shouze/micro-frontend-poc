import { atomWithBroadcast } from '@micro-frontend/shared';
import { useAtom } from 'jotai';

const countAtom = atomWithBroadcast('count', { value: 0 });

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  console.log('count', count);

  return (
    <button
      onClick={() => {
        setCount((v) => ({ value: v.value + 1 }));
      }}
    >
      Count is :{count.value}
    </button>
  );
};
