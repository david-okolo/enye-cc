import React from 'react';

import { Loading } from './Loading';
import { render } from '@testing-library/react';

describe('<Loading /> component', () => {

  it('should have correct styling', () => {

    const { container } = render(<Loading/>);

    const style = container.querySelector('div')?.style;

    expect(style?.display).toBe('flex');
    expect(style?.alignItems).toBe('center');
    expect(style?.justifyContent).toBe('center')
  })
})