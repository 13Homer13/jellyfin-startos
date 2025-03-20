import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  mediaSources: Value.multiselect({
    name: "Media Sources",
    values: {
      nextcloud: "Nextcloud",
      filebrowser: "File Browser",
    },
    default: ["nextcloud"],
    minLength: 1,
  })
})

export const setName = sdk.Action.withInput(
  // id
  'media-sources',

  // metadata
  async ({ effects }) => ({
    name: 'Select Media Sources',
    description: 'Service(s) Jellyfin uses to access media',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    mediaSources: await sdk.store.getOwn(effects, sdk.StorePath.mediaSources).const()
  }),

  // the execution function
  async ({ effects, input }) => sdk.store.setOwn(effects, sdk.StorePath.mediaSources, input.mediaSources),
)
