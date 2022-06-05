module.exports = {
  "title": "Garvin",
  "description": "Leave Time For WorthWhile Characters And Stories.",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Url",
        "icon": "reco-message",
        "items": [
          {
            "text": "图床/文件床",
            "link": "https://drawing-bed.pages.dev/",
            "icon": ""
          },
          {
            "text": "GitHub",
            "link": "https://github.com/ngwszsd",
            "icon": ""
          },
          {
            "text": "Gitee",
            "link": "https://gitee.com/garvinew",
            "icon": ""
          },
          {
            "text": "Cloud Drive",
            "link": "https://cloud.ngwszsd.workers.dev/",
            "icon": ""
          },
          {
            "text": "Proxy Internet",
            "link": "https://proxy.ngwszsd.workers.dev/",
            "icon": ""
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "garvin",
    "authorAvatar": "/avatar.png",
    "record": "The server：Charlotte North Carolina North America | Amazon Cloud Singapore | Cloudflare",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  }
}
