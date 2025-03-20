import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v_10_10_6_0 = VersionInfo.of({
  version: '10.10.6:0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
