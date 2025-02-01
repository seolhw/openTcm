import type { CollectionConfig } from 'payload'

// 中医方剂
export const Prescription: CollectionConfig = {
  slug: 'prescription',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name', // 方剂名称
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'composition', // 方剂药物组成
      type: 'text',
      required: true,
    },
    {
      name: 'mainIndication', // 主治
      type: 'text',
      required: true,
    },
    {
      name: 'effect', // 功效
      type: 'text',
      required: false,
    },
  ],
}
