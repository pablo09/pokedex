import React from "react";

export interface PokemonSearchPanelProps {
  onPokemonSearchClick(text: string): void;
}

export const PokemonSearchPanel = (props: PokemonSearchPanelProps) => {
  const { onPokemonSearchClick } = props;

  const [searchText, setSearchText] = React.useState<string>("");

  function handleSearchClick(e: React.SyntheticEvent) {
    e.preventDefault();
    onPokemonSearchClick(searchText);
  }

  return (
    <div className="row">
      <form onSubmit={handleSearchClick}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search Here"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="input-group-text btn-success">
            <i className="bi bi-search me-2"></i> Search
          </button>
        </div>
      </form>
    </div>
  );
};
