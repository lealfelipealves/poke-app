import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RegionFilter } from "./index";
import { queryClient } from "@/services/queryClient";
import { data } from "@/mocks/regions";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { PokemonContext } from "@/context/PokemonContext";
import { bulbasaur } from "@/mocks/bulbasaur";
import React from "react";
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query');

describe("RegionFilter", () => {
  it("renders correctly", async () => {
    const isOpen = true;
    const pokemon = bulbasaur;
    const setIsOpen = jest.fn();

    queryClient.setQueryData(["regions"], data);

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

    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    useQuery.mockReturnValue({
      isLoading: false,
      data,
      error: false,
    });

    const { container, debug, getByText  } = render(<RegionFilter />, { wrapper: Wrapper });
    expect(container).toMatchSnapshot();

    // const regionButton = await screen.getByRole("button", {
    //   name: /kanto/i,
    // });

    // fireEvent.click(regionButton);

    // expect(regionButton).toHaveClass('bg-red-500 text-white'); // verifique se o botão foi selecionado
    // // expect(setStateMock).toEqual('kanto');
    // expect(setStateMock).toBeCalled();
    

      // const setRegionSelected = jest.fn();


    debug()

  });
});
