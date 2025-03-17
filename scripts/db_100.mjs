import {
  createEditor,
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  $getSelection,
} from 'lexical'

async function convertToLexicalFormat(title, content) {
  const editor = createEditor({
    namespace: 'MyEditor',
  })

  editor.update(() => {
    const root = $getRoot()

    // 添加标题
    const titleParagraph = $createParagraphNode()
    titleParagraph.append($createTextNode(title))

    // 添加内容
    const contentParagraph = $createParagraphNode()
    contentParagraph.append($createTextNode(content))

    root.append(titleParagraph, contentParagraph)
  })

  return editor
}
// 89, 87, 82, 79, 78, 48, 46, 10
// 94 10 89 82 78 87 48

//  46
;[94, 89, 87, 82, 79, 78, 48, 46, 10].forEach(async (e, i) => {
  const url = `https://culture.pkstate.com/tcm3/jingfangyibaishou/${e}.html`

  const data = await fetch(url).then((res) => res.text())

  // 截取数据
  const preContent = data.match(/<pre>([\s\S]*?)<\/pre>/)?.[1] || ''
  const h1Content =
    data
      .match(/<h1>([\s\S]*?)<\/h1>/)?.[1]
      ?.replace(/、/g, '') // 移除所有顿号
      ?.replace(/,/g, '') // 移除所有英文逗号
      ?.replace(/^\d+/g, '') // 移除开头的数字
      ?.trim() || ''

  // 截取并清洗组成用法数据
  const composition =
    preContent
      .match(/\[组成用法[\]）]([\s\S]*?)\[方证[\]）(l1)]/)?.[1]
      ?.replace(/\[.*?\]/g, '') // 移除所有 [...] 标记
      ?.replace(/<[^>]+>/g, '') // 移除所有 HTML 标签
      ?.replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
      ?.replace(/\n/g, '')
      ?.trim() || ''

  const fz =
    preContent
      .match(/\[方证[\]）(l1)]([\s\S]*?)\[[(现代应用)(经验参考)]/)?.[1]
      ?.replace(/\[.*?\]/g, '') // 移除所有 [...] 标记
      ?.replace(/<[^>]+>/g, '') // 移除所有 HTML 标签
      ?.replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
      ?.replace(/\n/g, '')
      ?.trim() || ''

  // const data2 = await fetch(
  //   `https://opentcm.huiwang.fun/api/prescription?where[and][0][name][equals]=${h1Content}&where[and][1][source][equals]=2`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // ).then((res) => res.json())
  // // console.log(data2)
  // // 94,89,87,82,79,78,48,46,10,
  // if (data2.totalDocs != 1) {
  //   console.log('不正常: ', i)
  // } else {
  //   console.log('zhengc: ', i, data2.docs[0]?.name)
  // }
  // console.log('data2', data2.totalPages == 1)

  // 转换为 Lexical 格式
  const lexical = await convertToLexicalFormat(h1Content, preContent)

  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  const detailed = lexical.getEditorState().toJSON()
  const url2 = `https://opentcm.huiwang.fun/api/prescription`

  await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: h1Content,
      composition: composition,
      mainIndication: fz,
      effect: null,
      source: '2',
      detailed: detailed,
    }),
  })
})

// console.log('data', h1Content, preContent)
