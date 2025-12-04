import fs from 'fs'
import path from 'path'

test('each entry in docs submeta.json has a corresponding .mdx file', () => {
  const repoRoot = path.resolve(__dirname, '..')

  const subdirs = ['v2.0', 'v1.0']
  for (const dir of subdirs) {
    const metaPath = path.join(repoRoot, 'content', 'docs', dir, 'meta.json')
    expect(fs.existsSync(metaPath)).toBe(true)
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    const pages = meta.pages || []
    for (const page of pages) {
      const filePath = path.join(repoRoot, 'content', 'docs', dir, `${page}.mdx`)
      expect(
        fs.existsSync(filePath),
      ).toBe(true)
    }
  }
})
