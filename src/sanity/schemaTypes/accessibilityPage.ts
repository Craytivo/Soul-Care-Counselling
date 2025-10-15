export default {
  name: 'accessibilityPage',
  type: 'document',
  title: 'Accessibility Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Accessibility',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    },
  ],
};
