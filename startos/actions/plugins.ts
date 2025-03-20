import { jsonFile } from '../file-models/config.json'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  chromecast: Value.toggle({
    name: "Chromecast",
    default: false,
    description: "Chromecast plugin to allow casting to other devices.",
  }),
  trailers: Value.toggle({
    name: "Youtube trailers",
    default: false,
    description: "Auto-load movie trailers from YouTube.",
  }),
})

export const setName = sdk.Action.withInput(
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
    const plugins = (await jsonFile.read.const(effects))?.plugins || []
    const options = {
      chromecast: false,
      trailers: false
    }
    plugins.forEach(i => options[i] = true)
    return options
  },

  // the execution function
  async ({ effects, input }) => {
    const plugins: string[] = []
    if (input.chromecast) plugins.push('chromecast')
    if (input.trailers) plugins.push('trailers')
    await jsonFile.merge(effects, { plugins })
  },
)
