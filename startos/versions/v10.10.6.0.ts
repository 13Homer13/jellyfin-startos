import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { sdk } from '../sdk'
import { MediaSource } from '../store'
import { configJson } from '../file-models/config.json'
import { configDefaults } from '../utils'

export const v_10_10_6_0 = VersionInfo.of({
  version: '10.10.6:0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/main/start9/config.yaml', 'utf-8'),
      ) as {
        mediasources: MediaSource[]
        chromecast: boolean
        trailers: boolean
      }

      await sdk.store.setOwn(
        effects,
        sdk.StorePath.mediaSources,
        configYaml.mediasources,
      )

      const plugins = configDefaults.plugins
      if (configYaml.chromecast) plugins.push('chromecast')
      if (configYaml.trailers) plugins.push('trailers')

      await configJson.write(effects, {
        ...configDefaults,
        plugins,
      })

      // remove old start9 dir
      await rmdir('/main/start9')
    },
    down: IMPOSSIBLE,
  },
})
