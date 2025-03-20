import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const mediaSources = await sdk.store
    .getOwn(effects, sdk.StorePath.mediaSources)
    .const()

  const deps: T.CurrentDependenciesResult<any> = {}

  if (mediaSources.includes('filebrowser')) {
    deps['file-browser'] = {
      kind: 'exists',
      versionRange: '>=1.0.0', // @TODO
    }
  }

  if (mediaSources.includes('nextcloud')) {
    deps['nextcloud'] = {
      kind: 'exists',
      versionRange: '>=1.0.0', // @TODO
    }
  }

  return deps
})
