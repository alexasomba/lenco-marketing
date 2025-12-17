import { test, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

test('top-level content/docs/meta.json entries match filesystem structure and each submeta.json entries map to .mdx files', () => {
  const isSeparator = (value: unknown) =>
    typeof value === 'string' && /^---.*---$/.test(value)

  const repoRoot = path.resolve(__dirname, '..')
  // 1) Verify top-level meta.json pages entries actually exist in the filesystem
  const topMetaPath = path.join(repoRoot, 'content', 'docs', 'meta.json')
  expect(fs.existsSync(topMetaPath)).toBe(true)
  const topMeta = JSON.parse(fs.readFileSync(topMetaPath, 'utf8'))
  const topPages = topMeta.pages || []

  for (const p of topPages) {
    // If top-level page looks like a nested docs package (contains a dot or is not an mdx), ensure a directory exists
    const dirPath = path.join(repoRoot, 'content', 'docs', p)
    const mdxPath = path.join(repoRoot, 'content', 'docs', `${p}.mdx`)

    // Either an mdx file exists or there's a directory for a subdocs package
    const mdxExists = fs.existsSync(mdxPath)
    const dirExists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
    expect(mdxExists || dirExists).toBe(true)

    // If it's a sub-directory (watch for v2.0, v1.0, api etc), ensure a meta.json exists under it
    if (dirExists) {
      const subMetaPath = path.join(dirPath, 'meta.json')
      expect(fs.existsSync(subMetaPath)).toBe(true)

      const meta = JSON.parse(fs.readFileSync(subMetaPath, 'utf8'))
      const pages = meta.pages || []
      for (const page of pages) {
        if (isSeparator(page)) continue
        const filePath = path.join(dirPath, `${page}.mdx`)
        expect(fs.existsSync(filePath)).toBe(true)
      }
    }
  }
})
