import React from 'react'
import find from 'lodash/find'

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
    <PageContext.Provider value={{ pages, activePage: findActivePage(pages, match) }}>
      {children}
    </PageContext.Provider>
  )
}

export function withPageContext (WrappedComponent) {
  const ComponentWithPageContext = props => (
    <PageContext.Consumer>
      {ctx => <WrappedComponent pages={ctx.pages} activePage={ctx.activePage} {...props} />}
    </PageContext.Consumer>
  )
  return ComponentWithPageContext
}
