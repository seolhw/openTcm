import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'composition',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'mainIndication',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'effect',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'taste',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meridian',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
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
]
