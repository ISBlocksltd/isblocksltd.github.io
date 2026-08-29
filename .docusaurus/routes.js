import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
    path: '/blog/authors/rdcosta',
    component: ComponentCreator('/blog/authors/rdcosta', 'e0c'),
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
    component: ComponentCreator('/docs', '7e5'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'bbb'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '411'),
            routes: [
              {
                path: '/docs/administration/backup_restore',
                component: ComponentCreator('/docs/administration/backup_restore', 'a62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/camanagement',
                component: ComponentCreator('/docs/administration/camanagement', 'd3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/certificatemanagement',
                component: ComponentCreator('/docs/administration/certificatemanagement', 'e29'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/constraintmanagement',
                component: ComponentCreator('/docs/administration/constraintmanagement', '9e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/administration/dashboard',
                component: ComponentCreator('/docs/administration/dashboard', 'fb2'),
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
                path: '/docs/administration/logging',
                component: ComponentCreator('/docs/administration/logging', '19d'),
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
                path: '/docs/category/administration',
                component: ComponentCreator('/docs/category/administration', 'f43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/background',
                component: ComponentCreator('/docs/category/background', '9d6'),
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
                path: '/docs/installation/advanced',
                component: ComponentCreator('/docs/installation/advanced', 'ee8'),
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
                path: '/docs/integration/codesigningclient',
                component: ComponentCreator('/docs/integration/codesigningclient', '55a'),
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
                path: '/docs/integration/create-a-page',
                component: ComponentCreator('/docs/integration/create-a-page', 'e4a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/hsm',
                component: ComponentCreator('/docs/integration/hsm', '31e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/integration/sshca',
                component: ComponentCreator('/docs/integration/sshca', '4ee'),
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
                path: '/docs/introduction/architecture',
                component: ComponentCreator('/docs/introduction/architecture', 'ea8'),
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
                path: '/docs/introduction/hsmsupport',
                component: ComponentCreator('/docs/introduction/hsmsupport', '9bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/introduction/standards',
                component: ComponentCreator('/docs/introduction/standards', '552'),
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
