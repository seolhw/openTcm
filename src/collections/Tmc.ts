import type { CollectionConfig } from 'payload'

// 中草药
export const Tmc: CollectionConfig = {
  slug: 'tmc',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name', // 药名
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'taste', // 性味
      type: 'text',
      required: true,
    },
    {
      name: 'meridian', // 归经
      type: 'text',
      required: true,
    },
    {
      name: 'source', // 数据库来源
      type: 'select',
      required: false,
      options: [
        {
          label: '国家数据库',
          value: '1',
        },
        {
          label: '经方一百首',
          value: '2',
        },
      ],
    },
  ],
}
