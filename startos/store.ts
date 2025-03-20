import { setupExposeStore } from '@start9labs/start-sdk'

// export const mediaSources = ['filebrowser', 'nextcloud']

type MediaSource = 'filebrowser' | 'nextcloud'

export type Store = {
  mediaSources: MediaSource[]
}

export const exposedStore = setupExposeStore<Store>(() => [])
