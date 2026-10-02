import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import fs from 'node:fs'
import path from 'node:path'

// Exposes `virtual:sound-files`: every .mp3 under public/sounds, grouped by
// folder, e.g. { 'cries': ['/sounds/cries/deathcry1.mp3', ...] }. Lets code
// discover sounds by dropping files into a folder without import.meta.glob
// reaching into public/ (which Vite warns about on every file).
function soundFiles() {
  const id = 'virtual:sound-files'
  const resolvedId = '\0' + id
  const soundsDir = path.resolve('public/sounds')

  function scan(dir, rel, out) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relPath = rel ? `${rel}/${entry.name}` : entry.name
      if (entry.isDirectory()) scan(path.join(dir, entry.name), relPath, out)
      else if (entry.name.endsWith('.mp3')) (out[rel] ??= []).push(`/sounds/${relPath}`)
    }
    return out
  }

  return {
    name: 'sound-files',
    resolveId: (source) => (source === id ? resolvedId : null),
    load(loadId) {
      if (loadId !== resolvedId) return null
      const files = scan(soundsDir, '', {})
      for (const list of Object.values(files)) list.sort()
      return `export default ${JSON.stringify(files)}`
    },
    configureServer(server) {
      // Adding or removing a sound in dev regenerates the list and reloads.
      const onChange = (file) => {
        if (!file.startsWith(soundsDir) || !file.endsWith('.mp3')) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(soundsDir)
      server.watcher.on('add', onChange)
      server.watcher.on('unlink', onChange)
    },
  }
}

export default defineConfig({
  plugins: [
    soundFiles(),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  base: './',
  build: {
    outDir: 'dist',
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    cors: true
  }
})
