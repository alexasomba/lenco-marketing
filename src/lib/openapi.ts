import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  // Point to the actual OpenAPI spec at the project root
  input: ['./openapi.yaml'], // alternatively, it can point to a './unkey.json' file
});