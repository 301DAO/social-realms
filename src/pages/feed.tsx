import * as React from "react";
import type { NextPage } from "next";
import { favorite } from "@/lib/mutations";
import { LoadingTransaction } from "@/components";
import { queryClient, alchemyWSS } from "@/lib/clients";
import { getTransactionsForAddress } from "@/lib/wrappers";
import { useIsMounted, useFollowings, useFavorites, useUser } from "@/hooks";
import { DownArrow, RedHeart, TransparentHeart } from "@/components/icons";

import { useMutation, useQuery } from "react-query";

/**
 * this will get past transactions for followed addresses
 * to help populate the feed on load
 */
const getPastTransactions = async (addresses: string[]) => {
	const responses = await Promise.all(
		addresses.map(async address => {
			const transactions = await getTransactionsForAddress({
				address,
				limit: 3,
			});
			return transactions;
		})
	);
	const successResponses = responses.filter(response => response.error === false);
	const allTransactionsMerged = successResponses.reduce((acc, curr) => {
		return [...acc, ...curr.data.items];
	}, []);
	const filter = (tx: any) => {
		return {
			from: tx.from_address,
			to: tx.to_address,
			gasUsed: tx.gas_spent,
			transactionHash: tx.tx_hash,
			status: tx.successful,
		};
	};
	return allTransactionsMerged.map(filter);
};

/**
 * this will get live transactions for followed addresses using websocket
 */
const getLiveTransactions = async (addresses: string[]) => {
	const { transactions } = await alchemyWSS.eth.getBlock("latest");
	const receipts = transactions.map(async tx => await alchemyWSS.eth.getTransactionReceipt(tx));
	const filter = (x: any) => addresses.includes(x.from) || !addresses.includes(x.to);
	return await Promise.all(receipts.filter(filter).map(x => x.then(x => x)));
};

const Feed: NextPage = () => {
	const isMounted = useIsMounted();

	const { user } = useUser({ redirectTo: "/login" });
	const address = user?.publicAddress;

	const [favorites] = useFavorites({ address: address as string });
	const [followings] = useFollowings({ address: address as string });

	const favoriteMutation = useMutation(
		({ address, hash }: { address: string; hash: string }) => favorite({ address, hash }),
		{
			onSuccess: () => queryClient.invalidateQueries(["favorites", address]),
		}
	);

	const { data: pastTransactions } = useQuery(
		["pastTransactions", address],
		async () => await getPastTransactions(followings),
		{
			enabled: !!address,
			refetchOnWindowFocus: false,
			refetchInterval: 1000 * 60 * 5,
		}
	);

	const { data: transactions } = useQuery(
		["feed", address],
		async () => getLiveTransactions(followings),
		{ enabled: !!address, initialData: [] }
	);

	// show 5 fake loading cards while waiting for data
	if (!isMounted) {
		return (
			<>
				{Array(4)
					.fill(0)
					.map((_, idx) => (
						<LoadingTransaction key={idx} />
					))}
			</>
		);
	}
	return (
		<main className="mx-auto mt-12 flex w-full flex-col items-center justify-items-start gap-y-8 align-top text-white">
			{transactions &&
				transactions.map((transaction: any, idx: any) => (
					<section
						key={idx}
						className="max-w-xl rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
						<a
							className="mt-3 block text-xl leading-snug text-black hover:underline dark:text-white"
							href={`/user/${transaction.from}`}>
							{transaction.from}
						</a>
						<DownArrow />
						<a
							className="my-2 block text-xl leading-snug text-black hover:underline dark:text-white"
							href={`/user/${transaction.from}`}>
							{transaction.to}
						</a>
						<div className="my-4 border border-b-0 border-gray-200 dark:border-gray-600"></div>

						<div className="mt-3 flex justify-between gap-x-8 text-gray-500 dark:text-gray-400">
							<div className="flex items-center">
								<button
									onClick={() =>
										favoriteMutation.mutate({
											address: address as string,
											hash: transaction.transactionHash,
										})
									}>
									{favorites.includes(transaction.transactionHash) ? (
										<RedHeart />
									) : (
										<TransparentHeart />
									)}
								</button>
							</div>
							<div className="flex items-center">
								<span className="rounded bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
									🧱&nbsp;&nbsp;&nbsp;{transaction.blockNumber}
								</span>
							</div>
							<div className="flex flex-row items-center">
								<span className="rounded bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
									⛽️&nbsp;&nbsp;&nbsp;{transaction.gasUsed}
								</span>

								{/* <span>⛽️&nbsp;&nbsp;</span>
								<label>&nbsp;&nbsp;{transaction.gasUsed}</label> */}
							</div>
							<div className="flex flex-row items-center">
								{transaction.status ? (
									<span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</span>
								) : (
									<span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</span>
								)}
							</div>
							<a
								className="flex w-[18%] items-center"
								href={`https://etherscan.io/tx/${transaction.transactionHash}`}
								rel="noopener noreferrer"
								target="_blank">
								<span className="truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-900 hover:cursor-pointer hover:bg-blue-200 hover:text-blue-400 hover:underline dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
									{transaction.transactionHash}
								</span>
							</a>
						</div>
					</section>
				))}
		</main>
	);
};
export default Feed;
