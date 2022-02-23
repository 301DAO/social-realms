declare namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    VERCEL_URL: string; // System environment variable when deployed on Vercel: https://vercel.com/docs/environment-variables#system-environment-variables
    DATABASE_URL: string;
    ACCESS_TOKEN_NAME: string;
    ACCESS_TOKEN_SECRET: string;
    NEXT_PUBLIC_ALCHEMY: string;
    NEXT_PUBLIC_ALCHEMY_KEY: string;
    NEXT_PUBLIC_ETHERSCAN_KEY: string;
    NEXT_PUBLIC_INFURA_PROJECT_ID: string;
    NEXT_PUBLIC_NFT_PORT_KEY: string;
    NEXT_PUBLIC_COVALENT_API_KEY: string;
  }
}
