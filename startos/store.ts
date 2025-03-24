import { setupExposeStore } from '@start9labs/start-sdk'

export type MediaSource = 'filebrowser' | 'nextcloud'

export type Store = {
  mediaSources: MediaSource[]
}

export const exposedStore = setupExposeStore<Store>(() => [])
