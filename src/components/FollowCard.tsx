// import { useEtherUser } from "@/hooks/useEtherUser";
// import { Fieldset, Grid, Link, Spacer, Text } from "@geist-ui/react";
// import { useWeb3React } from "@web3-react/core";
// import Router from "next/router";
// import * as React from "react";
// import NftImage from "./nft-image";
// export const FollowCard = ({ onUserClick, topline, avatar }: any) => {
//   // const web3Context = useWeb3React();
//   //const { library, chainId } = web3Context;
//   // const { ens, url, avatar } = useEtherUser({ provider: library, address });
//   // const topline = ens || address;

//   // using router instead of Link because router doesn't reload page
//   // const onUserClick = async (event: any) => {
//   //   event.preventDefault();
//   //   Router.push(`/user/?address=${topline}`);
//   // };

//   return (
//     <>
//       <Fieldset style={{ width: "480px", maxWidth: "calc(100% - 20px)" }}>
//         <Fieldset.Content py="8pt" px="10pt">
//           <Grid.Container alignItems="center" justify="flex-start">
//             <Grid w="33%">
//               <NftImage avatar={avatar} isProfilePic={true} />
//               {/* <Avatar src={image ? image : placeholderImage} scale={2} /> */}
//             </Grid>

//             <Spacer w="10px" />

//             <Grid xs={8} w="66%">
//               <Grid.Container direction="row">
//                 <Grid xs={20} margin="1px">
//                   <Text h4 mx="0px" my="5.5px">
//                     <Link onClick={onUserClick}>{topline}</Link>
//                   </Text>
//                 </Grid>

//                 <Grid xs={24}>
//                   <Text small>
//                     <Link
//                       //    href={url || undefined}
//                       href={"utl"}
//                       target="_blank"
//                       block
//                       padding="0px"
//                     >
//                       {url && url}
//                     </Link>
//                   </Text>
//                 </Grid>
//               </Grid.Container>
//             </Grid>
//           </Grid.Container>
//         </Fieldset.Content>
//       </Fieldset>

//       <Spacer inline h="12pt" />
//     </>
//   );
// };

import { useEtherUser } from '@/hooks/useEtherUser'
import { Fieldset, Grid, Link, Spacer, Text } from '@geist-ui/react'
import Router from 'next/router'
import * as React from 'react'
import NftImage from './nft-image'

const placeholderImage = `https://external-preview.redd.it/
NADbWsobDS1wOTyi_AcFjYmfKmz6Oxyre1kFSD93Rts.jpg
?auto=webp&s=832a2557421e6f81fb6dfd0110d652941b9de6c6`

export const FollowCard = ({ provider, address }: any) => {
  const { ens, url, avatar } = useEtherUser({ provider, address })
  const topline = ens || address

  // using router instead of Link because router doesn't reload page
  const onUserClick = async (event: any) => {
    event.preventDefault()
    Router.push(`/user/?address=${topline}`)
  }

  return (
    <>
      <Fieldset style={{ width: '520px', maxWidth: 'calc(100% - 20px)' }}>
        <Fieldset.Content py="8pt" px="10pt">
          <Grid.Container alignItems="center" justify="flex-start">
            <Grid w="33%">
              <NftImage avatar={avatar} isProfilePic={true} />
            </Grid>
            <Spacer w="10px" />
            <Grid xs={8} w="66%">
              <Grid.Container direction="row">
                {!url ? (
                  <Grid xs={20} margin="1px">
                    <Text h4 mx="0px" my="5.5px">
                      <Link onClick={onUserClick}>{topline}</Link>
                    </Text>
                  </Grid>
                ) : (
                  <>
                    <Grid xs={20} margin="1px">
                      <Text h4 mx="0px" my="5.5px">
                        <Link onClick={onUserClick}>{topline}</Link>
                      </Text>
                    </Grid>

                    <Grid xs={24}>
                      <Text small>
                        <Link
                          href={url || undefined}
                          target="_blank"
                          block
                          padding="0px"
                        >
                          {url && url}
                        </Link>
                      </Text>
                    </Grid>
                  </>
                )}
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Fieldset.Content>
      </Fieldset>
      <Spacer inline h="12pt" />
    </>
  )
}
