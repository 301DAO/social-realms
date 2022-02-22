import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// TODO
const InvalidInput: NextPage = () => {
  const router = useRouter();
  const [value, setValue] = React.useState<string | null>(null);

  // since we did a rewrite in the _middleware, url in browser stays the sames
  React.useEffect(() => {
    const v = window.location.href.split('/').pop();
    if (!v) return;
    setValue(v);
  }, []);

  return (
    <main className="mt-20">
      <section>
        <p className="text-2xl">{value} is not a valid ENS name / Ethereum address</p>
      </section>
    </main>
  );
};

export default InvalidInput;
