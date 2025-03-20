- expose config options in config.json if deemed valuable
- create config.json file on init
- setup interfaces
- setup dependencies



Config.json defaults:
{
  "includeCorsCredentials": false,
  "multiserver": false,
  "themes": [
    {
      "name": "Apple TV",
      "id": "appletv",
      "color": "#bcbcbc"
    },
    {
      "name": "Blue Radiance",
      "id": "blueradiance",
      "color": "#011432"
    },
    {
      "name": "Dark",
      "id": "dark",
      "color": "#202020",
      "default": true
    },
    {
      "name": "Light",
      "id": "light",
      "color": "#303030"
    },
    {
      "name": "Purple Haze",
      "id": "purplehaze",
      "color": "#000420"
    },
    {
      "name": "WMC",
      "id": "wmc",
      "color": "#0c2450"
    }
  ],
  "menuLinks": [],
  "servers": [],
  "plugins": [
    "playAccessValidation/plugin",
    "experimentalWarnings/plugin",
    "htmlAudioPlayer/plugin",
    "htmlVideoPlayer/plugin",
    "photoPlayer/plugin",
    "comicsPlayer/plugin",
    "bookPlayer/plugin",
    "backdropScreensaver/plugin",
    "pdfPlayer/plugin",
    "logoScreensaver/plugin",
    "sessionPlayer/plugin",
    "syncPlay/plugin"
  ]
}