import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, array, string, boolean } = matches

const shape = object({
  includeCorsCredentials: boolean,
  multiserver: boolean,
  themes: array(
    object({
      name: string,
      id: string,
      color: string,
      default: boolean.optional(),
    }),
  ),
  menuLinks: array,
  servers: array,
  plugins: array(string),
})

export const jsonFile = FileHelper.json(
  '/media/startos/volumes/main/config.json',
  shape,
)
