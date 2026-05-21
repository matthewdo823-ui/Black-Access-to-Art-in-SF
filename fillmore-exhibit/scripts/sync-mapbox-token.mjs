import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env')
const outPath = join(root, 'public', 'mapbox-token.json')

function readTokenFromEnvFile() {
  if (!existsSync(envPath)) return ''
  const match = readFileSync(envPath, 'utf8').match(
    /^VITE_MAPBOX_ACCESS_TOKEN=(.*)$/m,
  )
  if (!match) return ''
  return match[1].trim().replace(/^["']|["']$/g, '')
}

const token =
  process.env.VITE_MAPBOX_ACCESS_TOKEN?.trim() || readTokenFromEnvFile()

if (!token) {
  console.warn(
    'Mapbox token missing: set VITE_MAPBOX_ACCESS_TOKEN in .env (see .env.example).',
  )
  process.exit(0)
}

writeFileSync(outPath, `${JSON.stringify({ accessToken: token }, null, 2)}\n`)
console.log('Wrote public/mapbox-token.json')
