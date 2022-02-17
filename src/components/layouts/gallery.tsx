import dynamic from "next/dynamic";
import * as React from "react";
import type { NFT } from "@/types";
import { MediaComponent } from "@/components";

export const Gallery = ({ nfts }: { nfts: NFT[] }) => {
	return (
		<div className="bg-transparent">
			<div className="mx-auto max-w-2xl lg:max-w-7xl">
				<h2 className="sr-only">NFTs</h2>

				<div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
					{nfts.map((nft, idx) => {
						return (
							<a
								key={idx}
								href={`https://opensea.io/assets/${nft.contract_address}/${nft.token_id}`}
								target="_blank"
								rel="noreferrer"
								className="group">
								<div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
									<MediaComponent mediaUrl={nft.file_url} />
								</div>
								{/* <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
};
