import React from 'react'

const PageContext = React.createContext({
  pages: [],
  activePage: {}
})

export function withPageContext (WrappedComponent) {
  const ComponentWithPageContext = (props) => (
    <PageContext.Consumer>
      {ctx => <WrappedComponent pages={ctx.pages} activePage={ctx.activePage} {...props} />}
    </PageContext.Consumer>
  )

  return ComponentWithPageContext
}

export default PageContext
