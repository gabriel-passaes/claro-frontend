import NotFound from '@/pages/404';
import { render, screen } from '@testing-library/react';

describe('NotFound Page', () => {
  it('should render the 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText(/404 — Página não encontrada/i)).toBeInTheDocument();
  });
});
