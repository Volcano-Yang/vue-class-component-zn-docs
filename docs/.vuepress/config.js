module.exports = {
    title: 'Vue Class Component中文翻译文档',
    description: 'ECMAScript / TypeScript decorator for class-style Vue components',
    head: [
      ['link', { rel: 'icon', href: 'https://qny.volcanoblog.cn/markdown/logo.png' }]
    ],
    themeConfig: {
      repo: 'Volcano-Yang/vue-class-component-zn-docs',
      docsDir: 'docs',
      editLinks: true,
      logo: 'https://qny.volcanoblog.cn/markdown/logo.png',
      nav: [
        {
          text: 'Guide',
          link: '/'
        }
        // {
        //   text: 'API Reference',
        //   link: '/api/'
        // }
      ],
  
      sidebar: {
        // '/api/': [
        //   ''
        // ],
  
        '/': [
          '',
          'guide/installation.md',
          {
            title: 'General Guide',
            collapsable: false,
            children: [
              'guide/class-component.md',
              'guide/additional-hooks.md',
              'guide/custom-decorators.md',
              'guide/extend-and-mixins.md',
              'guide/caveats.md'
            ]
          },
          'desc/contributor.md',
        //   {
        //     title: 'TypeScript Guide',
        //     collapsable: false,
        //     children: [
        //       'guide/props-definition.md',
        //       'guide/property-type-declaration.md',
        //       'guide/refs-type-extension.md',
        //       'guide/hooks-auto-complete.md',
        //       'guide/annotate-component-type-in-decorator'
        //     ]
        //   }
        ]
      },
      lastUpdated: 'Last Updated',
    }
  }
  