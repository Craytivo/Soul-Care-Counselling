const privacyPolicyPage = {
  name: 'privacyPolicyPage',
  type: 'document',
  title: 'Privacy Policy Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Privacy Policy',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    },
  ],
};


export default privacyPolicyPage;
