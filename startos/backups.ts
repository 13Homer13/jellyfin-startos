import { sdk } from './sdk'
import { cachedir, logdir, webdir } from './utils'

export const { createBackup, restoreBackup } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.volumes('main').setBackupOptions({
      exclude: [cachedir, webdir, logdir],
    }),
)
