import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .id('privacyPolicyPage')
        .title('Privacy Policy Page')
        .schemaType('privacyPolicyPage'),
      S.documentListItem()
        .id('termsOfUsePage')
        .title('Terms of Use Page')
        .schemaType('termsOfUsePage'),
      // All other document types
      ...S.documentTypeListItems().filter(
        (item) => {
          const id = item.getId() ?? '';
          return !['privacyPolicyPage', 'termsOfUsePage'].includes(id);
        }
      ),
    ])
