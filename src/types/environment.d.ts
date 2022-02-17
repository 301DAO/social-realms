declare namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    VERCEL_URL: string; // System environment variable when deployed on Vercel: https://vercel.com/docs/environment-variables#system-environment-variables
    TOKEN_SECRET: string;
    NEXT_PUBLIC_ALCHEMY_KEY: string;
    NEXT_PUBLIC_ETHERSCAN_KEY: string;
    NEXT_PUBLIC_INFURA_PROJECT_ID: string;
  }
}
