import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query'

import { ModalContext } from '@/context/ModalContext'
import { PokemonContext } from '@/context/PokemonContext';
import { bulbasaur } from '@/mocks/bulbasaur'
import { queryClient } from '@/services/queryClient'
import { Modal } from './index';


describe('Modal', () => {
  it('renders modal component', () => {
    const isOpen = true;
    const pokemon = bulbasaur;
    const setIsOpen = jest.fn();

    queryClient.setQueryData(['pokemon', 'bulbasaur'], bulbasaur);

    const Wrapper = ({ children }: any) => {
      return (
        <QueryClientProvider client={queryClient}>
          <PokemonContext.Provider value={{ pokemon }}>
            <ModalContext.Provider value={{ isOpen, setIsOpen }}>
              {children}
            </ModalContext.Provider>
          </PokemonContext.Provider>
        </QueryClientProvider>
      );
    };

    const { getByRole } = render(<Modal />, { wrapper: Wrapper });

    const imgElement = getByRole('img', { name: /bulbasaur/i });
    const titleElement = getByRole('heading', { name: /bulbasaur/i });

    expect(imgElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});