import * as React from 'react'
import {render} from '@testing-library/react'

import Direactive from '../src'

const FakeChildComp: React.FC = () => <div>The Child</div>
const fakeRenderProp: React.FC = (props: any): React.ReactElement => <FakeChildComp {...props} />
const fakeNumberIterable = [1, 2, 3, 4, 5]

describe('Component Children', () => {
  test('Renders component as children with no explicit directives', () => {
    const {getByText} = render(<Direactive><FakeChildComp /></Direactive>)
    expect(getByText(/the child/i)).toBeInTheDocument()
  })
  
  test('Correctly renders component on if-directive is set to true', () => {
    const {getByText} = render(<Direactive drIf={true}><FakeChildComp /></Direactive>)
    expect(getByText(/the child/i)).toBeInTheDocument()
  })
  
  test('Correctly renders component on if-directive is set to false', () => {
    const {queryByText} = render(<Direactive drIf={false}><FakeChildComp /></Direactive>)
    expect(queryByText(/the child/i)).not.toBeInTheDocument()
  })
  
  test('Correctly renders component with for-directive', () => {
    const {getAllByText} = render(<Direactive drFor={fakeNumberIterable}><FakeChildComp /></Direactive>)
    expect(getAllByText(/the child/i)).toHaveLength(5)
  })
})

describe('Render Prop Children', () => {
  test('Renders render prop function as children with no explicit directives', () => {
    const {getByText} = render(<Direactive>{fakeRenderProp}</Direactive>)
    expect(getByText(/the child/i)).toBeInTheDocument()
  })

  test('Correctly renders render prop on if-directive is set to true', () => {
    const {getByText} = render(<Direactive drIf={true}>{fakeRenderProp}</Direactive>)
    expect(getByText(/the child/i)).toBeInTheDocument()
  })
  
  test('Correctly renders render prop on if-directive is set to false', () => {
    const {queryByText} = render(<Direactive drIf={false}>{fakeRenderProp}</Direactive>)
    expect(queryByText(/the child/i)).not.toBeInTheDocument()
  })
  
  test('Correctly renders render prop with for-directive', () => {
    const {getAllByText} = render(<Direactive drFor={fakeNumberIterable}>{fakeRenderProp}</Direactive>)
    expect(getAllByText(/the child/i)).toHaveLength(5)
  })
})

describe('No Children', () => {
  test('Renders nothing as children with no explicit directives', () => {
    const {queryByText} = render(<Direactive />)
    expect(queryByText(/the child/i)).not.toBeInTheDocument()
  })
})