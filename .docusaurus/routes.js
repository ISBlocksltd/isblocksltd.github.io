import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/all-rdc-articles',
    component: ComponentCreator('/blog/authors/all-rdc-articles', '3c4'),
    exact: true
  },
  {
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', '4a1'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'a68'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '487'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '279'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '869'),
            routes: [
              {
                path: '/docs/administration/congratulations',
                component: ComponentCreator('/docs/administration/congratulations', '11e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/create-a-blog-post',
                component: ComponentCreator('/docs/administration/create-a-blog-post', 'ed9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/create-a-document',
                component: ComponentCreator('/docs/administration/create-a-document', '609'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/create-a-page',
                component: ComponentCreator('/docs/administration/create-a-page', '192'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/deploy-your-site',
                component: ComponentCreator('/docs/administration/deploy-your-site', '17d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/markdown-features',
                component: ComponentCreator('/docs/administration/markdown-features', '450'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/ca-va-publishing',
                component: ComponentCreator('/docs/advanced_topics/ca-va-publishing', '8f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/congratulations',
                component: ComponentCreator('/docs/advanced_topics/congratulations', '19e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/create-a-blog-post',
                component: ComponentCreator('/docs/advanced_topics/create-a-blog-post', '43d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/create-a-document',
                component: ComponentCreator('/docs/advanced_topics/create-a-document', '150'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/deploy-your-site',
                component: ComponentCreator('/docs/advanced_topics/deploy-your-site', '818'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced_topics/markdown-features',
                component: ComponentCreator('/docs/advanced_topics/markdown-features', 'e7b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/congratulations',
                component: ComponentCreator('/docs/architecture/congratulations', '2e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/create-a-blog-post',
                component: ComponentCreator('/docs/architecture/create-a-blog-post', '08b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/create-a-document',
                component: ComponentCreator('/docs/architecture/create-a-document', 'ef2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/create-a-page',
                component: ComponentCreator('/docs/architecture/create-a-page', 'c8b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/deploy-your-site',
                component: ComponentCreator('/docs/architecture/deploy-your-site', '956'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/architecture/markdown-features',
                component: ComponentCreator('/docs/architecture/markdown-features', '415'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/administration',
                component: ComponentCreator('/docs/category/administration', 'f43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/architecture',
                component: ComponentCreator('/docs/category/architecture', '6d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/installation',
                component: ComponentCreator('/docs/category/installation', '9d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/integration',
                component: ComponentCreator('/docs/category/integration', '079'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/tutorial---basics',
                component: ComponentCreator('/docs/category/tutorial---basics', '20e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/tutorial---basics-1',
                component: ComponentCreator('/docs/category/tutorial---basics-1', '005'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/tutorial---extras',
                component: ComponentCreator('/docs/category/tutorial---extras', '9ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/baremetal',
                component: ComponentCreator('/docs/installation/baremetal', 'a64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/congratulations',
                component: ComponentCreator('/docs/installation/congratulations', '0b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/deploy-your-site',
                component: ComponentCreator('/docs/installation/deploy-your-site', '338'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/docker',
                component: ComponentCreator('/docs/installation/docker', '2aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/hardware',
                component: ComponentCreator('/docs/installation/hardware', '754'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/kubernetes',
                component: ComponentCreator('/docs/installation/kubernetes', '6ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/installation/markdown-features',
                component: ComponentCreator('/docs/installation/markdown-features', 'c79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/congratulations',
                component: ComponentCreator('/docs/integration/congratulations', 'a6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/create-a-blog-post',
                component: ComponentCreator('/docs/integration/create-a-blog-post', '67e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/create-a-document',
                component: ComponentCreator('/docs/integration/create-a-document', '08c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/create-a-page',
                component: ComponentCreator('/docs/integration/create-a-page', 'e4a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/deploy-your-site',
                component: ComponentCreator('/docs/integration/deploy-your-site', 'f6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/markdown-features',
                component: ComponentCreator('/docs/integration/markdown-features', '07d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '4ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial-basics/congratulations', '458'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '108'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial-basics/create-a-document', '8fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial-basics/create-a-page', '951'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', '4f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/docs/tutorial-basics/markdown-features', 'b05'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '978'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial-extras/translate-your-site', 'f9a'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
