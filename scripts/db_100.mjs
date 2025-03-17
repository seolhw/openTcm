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

for (let i = 11; i <= 100; i++) {
  const url = `https://culture.pkstate.com/tcm3/jingfangyibaishou/${i}.html`

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
      .match(/\[组成用法\]([\s\S]*?)\[方证\]/)?.[1]
      ?.replace(/\[.*?\]/g, '') // 移除所有 [...] 标记
      ?.replace(/<[^>]+>/g, '') // 移除所有 HTML 标签
      ?.replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
      ?.replace(/\n/g, '')
      ?.trim() || ''

  const fz =
    preContent
      .match(/\[方证\]([\s\S]*?)\[现代应用/)?.[1]
      ?.replace(/\[.*?\]/g, '') // 移除所有 [...] 标记
      ?.replace(/<[^>]+>/g, '') // 移除所有 HTML 标签
      ?.replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
      ?.replace(/\n/g, '')
      ?.trim() || ''
  console.log(i, fz)

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
}

// console.log('data', h1Content, preContent)
