import * as React from 'react'

import { DireactiveProps } from './types'

const Direactive = ({
  children,
  drIf = true,
  drFor = [],
  dForKey = 'direactiveProps',
  ...props
}: DireactiveProps): React.ReactElement | null => {
  if (drIf) {
    if (typeof children === 'object') {
      return (
        <>
          {drFor.length <= 1 && children}
          {drFor.length > 1 && drFor.map((d, dIdx) => {
            return React.cloneElement(children, {[dForKey]: d, key: dIdx, ...props})
          })}
        </>
      )
    }

    if (typeof children === 'function') {
      if (drFor.length > 1) {
        return (
          <>
            {drFor.map((d, dIdx) => children({
              [dForKey]: d,
              key: dIdx.toString(),
              ...props
            }))}
          </>
        )
      }

      return children(props)
    }

    return null
  }

  return null

}

export default Direactive