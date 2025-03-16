import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
  // const {
  //   doc: { relationTo: collection },
  // } = searchDoc

  const { id, name, composition, mainIndication, effect, taste, meridian, source } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    name: name,
    composition: composition,
    mainIndication: mainIndication,
    effect: effect,
    taste: taste,
    meridian: meridian,
    source: source,
  }

  return modifiedDoc
}
