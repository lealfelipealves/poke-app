import { renderHook } from "@testing-library/react-hooks";
import { useRegionByNameQuery, getRegionByName } from "../useRegionByNameQuery";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

jest.mock("@tanstack/react-query");
jest.mock("@/services/api");

describe("useRegionByNameQuery", () => {
  it("should call useQuery with the correct parameters", async () => {
    const regionName = "Kanto";
    const mockedPokemons = [
      { id: 1, name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { id: 2, name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { id: 3, name: "Squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
    ];
    const mockedResponse = { data: { count: 8, results: mockedPokemons } };
    (api.get as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const { waitFor } = renderHook(() => useRegionByNameQuery(regionName));

    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ["region", regionName],
        queryFn: expect.any(Function),
        staleTime: 1000 * 60 * 60,
      });
    });
  });
});