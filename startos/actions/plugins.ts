import { configJson } from '../file-models/config.json'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  chromecast: Value.toggle({
    name: 'Chromecast',
    default: false,
    description: 'Chromecast plugin to allow casting to other devices.',
  }),
  trailers: Value.toggle({
    name: 'Youtube trailers',
    default: false,
    description: 'Auto-load movie trailers from YouTube.',
  }),
})

export const plugins = sdk.Action.withInput(
  // id
  'plugins',

  // metadata
  async ({ effects }) => ({
    name: 'Plugins',
    description: 'Select which plugins to enable',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const plugins = (await configJson.read.const(effects))?.plugins || []
    return {
      chromecast: plugins.includes('chromecast'),
      trailers: plugins.includes('trailers'),
    }
  },

  // the execution function
  async ({ effects, input }) => {
    const plugins = new Set(
      (await configJson.read.const(effects))?.plugins || [],
    )
    input.chromecast ? plugins.add('chromecast') : plugins.delete('chromecast')
    input.trailers ? plugins.add('trailers') : plugins.delete('trailers')
    await configJson.merge(effects, { plugins: Array.from(plugins) })
  },
)
