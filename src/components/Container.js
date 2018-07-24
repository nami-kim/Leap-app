import React from 'react'

export const Container = ({children, ...rest}) => (
  <div className="pt1 w-90-m w-80-l center mw9" {...rest}>
  {children}
  </div>
)
export const ContainerHeader = ({ children, ...rest }) => (
  <div className="pv2 w-90-m w-80-l center mw9" {...rest}>
    {children}
  </div>
)
export const ContainerForm = ({ children, ...rest }) => (
  <div className="pv2 w-70-m w-50-l center mw9" {...rest}>
    {children}
  </div>
)

export default Container