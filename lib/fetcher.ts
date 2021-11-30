export async function fetcher(...args: any[]) {
  // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
  const res = await fetch(...args);
  return res.json();
}
