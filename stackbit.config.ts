import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'static',
  nodeVersion: '18',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'hero',
          type: 'page',
          urlPath: '/',
          filePath: 'content/hero/hero.md',
          fields: [
            { name: 'badge', type: 'string', required: true },
            { name: 'title', type: 'string', required: true },
            { name: 'subtitle', type: 'string', required: true },
            { name: 'booking_text', type: 'string', required: true },
            { name: 'booking_url', type: 'string', required: true },
            { name: 'services_text', type: 'string', required: true },
            { name: 'quote', type: 'string', required: true },
            { name: 'quote_author', type: 'string', required: true },
            { name: 'features', type: 'list', items: { type: 'object', fields: [{ name: 'text', type: 'string' }] } }
          ],
        },
        {
          name: 'team',
          type: 'data',
          filePath: 'content/team/{slug}.md',
          fields: [
            { name: 'name', type: 'string', required: true },
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'string', required: true },
            { name: 'booking_text', type: 'string', required: true },
            { name: 'booking_url', type: 'string', required: true },
            { name: 'tags', type: 'list', items: { type: 'string' } },
            { name: 'photo', type: 'image', required: false }
          ],
        },
        {
          name: 'settings',
          type: 'data',
          filePath: 'content/settings/{name}.json',
          fields: [
            { name: 'site_title', type: 'string' },
            { name: 'site_description', type: 'string' },
            { name: 'brand_name', type: 'string' },
            { name: 'contact_email', type: 'string' },
            { name: 'contact_phone', type: 'string' },
            { name: 'contact_address', type: 'string' }
          ],
        }
      ],
    }),
  ],
});
