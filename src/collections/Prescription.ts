import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'composition', 'mainIndication', 'source', 'effect'],
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
      name: 'mainIndication', // 主治/方证
      type: 'text',
      required: true,
      admin: {
        description: '主治/方证',
      },
    },
    {
      name: 'effect', // 功效
      type: 'text',
      required: false,
      admin: {
        description: '功效',
      },
    },
    {
      name: 'detailed', // 详情页内容
      type: 'richText',
      required: false,
      admin: {
        description: '详情页内容',
      },
      editor: lexicalEditor({}),
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
