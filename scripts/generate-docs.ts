import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';

void generateFiles({
  input: openapi,
  // Output to a dedicated 'api-reference' folder to keep generated files separate
  output: './content/docs/api-reference',
  // Group endpoints by tag for organized navigation
  per: 'tag',
  // Include endpoint descriptions in the generated pages
  includeDescription: true,
  // Add a comment to generated files
  addGeneratedComment: true,
});