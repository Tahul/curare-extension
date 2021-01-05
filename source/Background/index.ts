import 'crx-hotreload/hot-reload.js'
import 'emoji-log'
import { browser } from 'webextension-polyfill-ts'


browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'Curare extension installed.')
})
