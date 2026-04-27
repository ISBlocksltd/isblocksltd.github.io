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
    component: ComponentCreator('/blog', 'e21'),
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
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', 'ec3'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'b14'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '5c7'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '4f6'),
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
    component: ComponentCreator('/blog/tags/docusaurus', '096'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '394'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '731'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '4fa'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'dfe'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '53a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ac9'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'de0'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '460'),
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
                path: '/docs/administration/keymanagement',
                component: ComponentCreator('/docs/administration/keymanagement', '853'),
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
                path: '/docs/administration/ringmanagement',
                component: ComponentCreator('/docs/administration/ringmanagement', '6fc'),
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
                path: '/docs/introduction/concepts',
                component: ComponentCreator('/docs/introduction/concepts', 'ac9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/congratulations',
                component: ComponentCreator('/docs/introduction/congratulations', '6ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/create-a-blog-post',
                component: ComponentCreator('/docs/introduction/create-a-blog-post', '515'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/create-a-document',
                component: ComponentCreator('/docs/introduction/create-a-document', '6e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/create-a-page',
                component: ComponentCreator('/docs/introduction/create-a-page', 'c0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/deploy-your-site',
                component: ComponentCreator('/docs/introduction/deploy-your-site', 'c5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/markdown-features',
                component: ComponentCreator('/docs/introduction/markdown-features', '5ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial-basics/congratulations', '93d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', 'c2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial-basics/create-a-document', '920'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial-basics/create-a-page', '539'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', 'feb'),
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
                component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '5a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial-extras/translate-your-site', 'd21'),
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
