import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';

dotenv.config();

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const publicStorefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;
const storefrontApiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION;

const apiEndpoint = `${storeDomain}/api/${storefrontApiVersion}/graphql.json`;

const zeusPath = path.resolve('node_modules', '.bin', 'zeus');
const outputPath = path.resolve('src', 'utilities', 'storefront');

execSync(
  `"${zeusPath}" ${apiEndpoint} ${outputPath} --header=X-Shopify-Storefront-Access-Token:${publicStorefrontToken}`,
  {
    stdio: 'inherit',
  }
);
