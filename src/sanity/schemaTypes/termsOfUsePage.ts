const termsOfUsePage = {
  name: 'termsOfUsePage',
  type: 'document',
  title: 'Terms of Use Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Terms of Use',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    },
  ],
};


export default termsOfUsePage;
