import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const exhibitDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = execSync('git rev-parse --show-toplevel', {
  cwd: exhibitDir,
  encoding: 'utf8',
}).trim()

const paths = ['.github/', 'fillmore-exhibit/']

for (const rel of paths) {
  execSync(`git add ${rel}`, { cwd: repoRoot, stdio: 'inherit' })
}

console.log(`Staged deploy files in ${repoRoot}`)
console.log('Next: git commit -m "Deploy via GitHub Actions" && git push')
