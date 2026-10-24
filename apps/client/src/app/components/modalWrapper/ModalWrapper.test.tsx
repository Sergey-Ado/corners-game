import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ModalWrapper from './ModalWrapper';

describe('ModalWrapper', () => {
  it('should render with children', () => {
    render(
      <ModalWrapper>
        <div role="test-child"></div>
      </ModalWrapper>
    );

    const child = screen.getByRole('test-child');
    expect(child).toBeInTheDocument();
  });
});
