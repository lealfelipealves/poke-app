import { renderHook } from "@testing-library/react-hooks";
import { ModalContext, ModalProvider, useModal } from "./ModalContext";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

describe("ModalContext", () => {

  it("ModalProvider should provide the isOpen state and setIsOpen function", () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    );
  
    const { result } = renderHook(() => useModal(), { wrapper });
  
    expect(result.current.isOpen).toBeDefined();
    expect(typeof result.current.isOpen).toBe("boolean");
  
    expect(result.current.setIsOpen).toBeDefined();
    expect(typeof result.current.setIsOpen).toBe("function");
  });

  it('should throw an error if used outside ModalProvider', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ModalContext.Provider value={null}>{children}</ModalContext.Provider>
      ),
    });

    expect(result.error).toEqual(
      Error('Para usar o useModal, é obrigatório o usuário do Provider')
    );
  });  
});