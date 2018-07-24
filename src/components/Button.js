import React from 'react'

export const Button = ({ children, className="bg-blue", ...rest }) => (
  <button
    className={`bw0 w-100 f5 btn pv2 white ttu br1 tracked ${className}`} 
    {...rest}
  >{children}
  </button>
)
export const ReplyButton = ({ children, className="white bg-blue-custom", ...rest}) => (
  <button
    className={`b--black-20 f7 btn ph2 pv2 tracked mr2 ${className}`}
    {...rest}
  >{children}
  </button>
)

export const EmojiButton = (props) => (
  <button
    className="f6 bg-white bw0 btn dark-blue fw3 pa2 dt pointer"
    {...props}
  >{props.children}
  </button>
)

export default Button