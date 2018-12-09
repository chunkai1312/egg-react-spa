import React from 'react'
import find from 'lodash/find'
import { NamespacesConsumer } from 'react-i18next'

const PageContext = React.createContext({
  pages: [],
  activePage: {}
})

function findActivePage (currentPages, match) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return match.path.indexOf(`${page.pathname}/`) === 0
    }

    // Should be an exact match if no children
    return match.path === page.pathname
  })

  if (!activePage) {
    return null
  }

  // We need to drill down
  if (activePage.pathname !== match.path) {
    return findActivePage(activePage.children, match)
  }

  return activePage
}

export function PageContextProvider (props) {
  const { children, pages, match } = props // eslint-disable-line
  return (
    <NamespacesConsumer ns={'page'}>
      {t => {
        const formatPages = pages.map(page => page.title ? { ...page, title: t(page.title) } : page)
        return (
          <PageContext.Provider value={{ pages: formatPages, activePage: findActivePage(formatPages, match) }}>
            {children}
          </PageContext.Provider>
        )
      }}
    </NamespacesConsumer>
  )
}

export function withPageContext (WrappedComponent) {
  const ComponentWithPageContext = props => (
    <PageContext.Consumer>
      {ctx => {
        if (!ctx.activePage) throw new Error('Missing activePage.')
        return <WrappedComponent pages={ctx.pages} activePage={ctx.activePage} {...props} />
      }}
    </PageContext.Consumer>
  )
  return ComponentWithPageContext
}
