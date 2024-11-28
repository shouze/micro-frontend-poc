import { atomWithBroadcast } from '@micro-frontend/shared';
import { useAtom } from 'jotai';

const countAtom = atomWithBroadcast('count', { value: 0, sentAt: new Date() });

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  console.log('count', count);

  return (
    <button
      onClick={() => {
        setCount((v) => ({ value: v.value + 1, sentAt: new Date() }));
      }}
    >
      Count is :{count.value}
    </button>
  );
};
