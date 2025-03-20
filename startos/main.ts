import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { datadir, configdir, cachedir, logdir, webdir, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Jellyfin!')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  const mounts = sdk.Mounts.of().addVolume('main', null, datadir, false)

  const deps = await sdk.store
    .getOwn(effects, sdk.StorePath.mediaSources)
    .const()

  if (deps.includes('filebrowser')) {
    mounts.addDependency('filebrowser', 'main', null, '/filebrowser', true)
  }

  if (deps.includes('nextcloud')) {
    mounts.addDependency('nextcloud', 'main', null, '/nextcloud', true)
  }

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const additionalChecks: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */

  return sdk.Daemons.of(effects, started, additionalChecks).addDaemon(
    'primary',
    {
      subcontainer: { imageId: 'jellyfin' },
      command: [
        'jellyfin/jellyfin',
        '--datadir',
        datadir,
        '--configdir',
        configdir,
        '--cachedir',
        cachedir,
        '--webdir',
        webdir,
        '--logdit',
        logdir,
        '--ffmpeg',
        '/usr/lib/jellyfin-ffmpeg/ffmpeg',
      ],
      mounts,
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: [],
    },
  )
})
