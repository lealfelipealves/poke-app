import { useQuery } from "@tanstack/react-query";
import { useRegionsQuery } from "../useRegionsQuery";
import { api } from "@/services/api";
import { renderHook } from '@testing-library/react-hooks';

jest.mock("@tanstack/react-query");

jest.mock("@/services/api");

describe("useRegionsQuery", () => {
  it("should call useQuery with the correct parameters", async () => {
    const mockedRegions = {
      count: 8,
      regions: [
        { id: "1", name: "Kanto", url: "https://pokeapi.co/api/v2/region/1/" },
        { id: "2", name: "Johto", url: "https://pokeapi.co/api/v2/region/2/" },
        { id: "3", name: "Hoenn", url: "https://pokeapi.co/api/v2/region/3/" },
        { id: "4", name: "Sinnoh", url: "https://pokeapi.co/api/v2/region/4/" },
        { id: "5", name: "Unova", url: "https://pokeapi.co/api/v2/region/5/" },
        { id: "6", name: "Kalos", url: "https://pokeapi.co/api/v2/region/6/" },
        { id: "7", name: "Alola", url: "https://pokeapi.co/api/v2/region/7/" },
        { id: "8", name: "Galar", url: "https://pokeapi.co/api/v2/region/8/" },
      ],
    };
    const mockedResponse = { data: { count: 8, results: mockedRegions.regions } };
    (api.get as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const { waitFor } = renderHook(() => useRegionsQuery());

    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ["regions"],
        queryFn: expect.any(Function),
        staleTime: 1000 * 60 * 60,
      });
    });
    
    const queryFn = (useQuery.mock.calls[0][0] as any).queryFn;
    
    expect(await queryFn()).toEqual(mockedRegions);
  });
});