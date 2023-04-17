import { render, fireEvent, screen, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonContext } from "@/context/PokemonContext";
import { RegionFilter } from "@/components/RegionFilter";
import { useRegionsQuery } from "@/hooks/useRegionsQuery";
import { useRegionByNameQuery } from "@/hooks/useRegionByNameQuery";
import { queryClient } from "@/services/queryClient";
import { regions } from "@/mocks/regions";

jest.mock("@/hooks/useRegionsQuery");
/*jest.mock("@/hooks/useRegionByNameQuery");
jest.mock("@/context/PokemonContext");*/

describe("RegionFilter", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  

  it("renders loading spinner while regions are being fetched", () => {
    useRegionsQuery.mockReturnValue({ isLoading: true });

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider value={{}}>
          <RegionFilter />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("region-filter-loading")).toBeInTheDocument();
  });

  it("renders error spinner while regions are being fetched", () => {
    useRegionsQuery.mockReturnValue({ isError: true });

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider value={{}}>
          <RegionFilter />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("region-filter-error")).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const data = {
      count: regions.count,
      regions: regions.results
    }
    useRegionsQuery.mockReturnValue({ data });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider value={{}}>
          <RegionFilter />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );

    data.regions.forEach((region) => {
      expect(getByText(region.name)).toBeInTheDocument();
    });
  });

  it("should call setFilteredDataByRegion when button is clicked", async () => {
    const data = {
      count: regions.count,
      regions: regions.results
    }
    
    useRegionsQuery.mockReturnValue({ 
      isError: false,
      isLoading: false,
      isFetching: false,
      data
    });

    const setFilteredDataByRegion = jest.fn();
    const setRegionSelected = jest.fn();
    
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider
          value={{ setFilteredDataByRegion, setRegionSelected }}
        >
          <RegionFilter />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );
    const kantoButton = getByText("kanto");

    await act(async () => {
      fireEvent.click(kantoButton);
    });

    expect(setRegionSelected).toHaveBeenCalledWith(1);
    expect(setFilteredDataByRegion).toHaveBeenCalled();
  });

  it("should call setFilteredDataByRegion with empty array when the same region is clicked", async () => {
    const data = {
      count: regions.count,
      regions: regions.results,
    };
  
    useRegionsQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      data,
    });
  
    const setFilteredDataByRegion = jest.fn();
    const setRegionSelected = jest.fn().mockImplementation((regionId) => {
      // Simulate setting the regionSelected state
      regionSelected = regionId;
    });
  
    let regionSelected = 1;
  
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider
          value={{ setFilteredDataByRegion, setRegionSelected, regionSelected }}
        >
          <RegionFilter />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );
  
    const kantoButton = getByText("kanto");
  
    await act(async () => {
      fireEvent.click(kantoButton);
    });
  
    // Check that setRegionSelected is called with undefined
    expect(setRegionSelected).toHaveBeenCalledWith(undefined);
  
    // Check that setFilteredDataByRegion is called with an empty array
    expect(setFilteredDataByRegion).toHaveBeenCalledWith([]);
  });
});