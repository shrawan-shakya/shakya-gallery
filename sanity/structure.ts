import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gallery Content')
    .items([
      // --- ARTWORKS ---
      S.listItem()
        .title('Artworks')
        .child(
          S.list()
            .title('Artworks')
            .items([
              S.listItem()
                .title('All Artworks')
                .child(S.documentTypeList('artwork').title('All Artworks')),
              S.divider(),
              S.listItem()
                .title('Available')
                .child(
                  S.documentList()
                    .title('Available Artworks')
                    .filter('_type == "artwork" && status == "available"')
                ),
              S.listItem()
                .title('Sold / Private')
                .child(
                  S.documentList()
                    .title('Sold / Private Artworks')
                    .filter('_type == "artwork" && (status == "sold" || status == "private")')
                ),
            ])
        ),

      S.divider(),

      // --- JOURNAL ---
      S.documentTypeListItem('article').title('Journal'),

      S.divider(),

      // --- SETTINGS & META ---
      S.listItem()
        .title('Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),
    ])
