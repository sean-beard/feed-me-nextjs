import { useFeed } from "hooks/useFeed";

interface Props {
  filters: ReturnType<typeof useFeed>["filters"];
}

const Toggles = ({ filters }: Props) => {
  return (
    <div className="toggles">
      <label>
        <input
          type="checkbox"
          checked={filters.showArticles}
          onChange={(e) => {
            filters.setShowArticles(e.target.checked);
          }}
        />
        <span>Articles</span>
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.showPodcasts}
          onChange={(e) => {
            filters.setShowPodcasts(e.target.checked);
          }}
        />
        <span>Podcasts</span>
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.showYoutube}
          onChange={(e) => {
            filters.setShowYoutube(e.target.checked);
          }}
        />
        <span>YouTube</span>
      </label>
    </div>
  );
};

const SearchInput = ({ filters }: Props) => {
  return (
    <div className="input-field">
      <label htmlFor="search">{`Search ${
        // localShouldFilterUnread ? "unread" : "all"
        false ? "unread" : "all"
      }`}</label>

      <input
        id="search"
        type="search"
        value={filters.searchTerm}
        onChange={(e) => {
          filters.setSearchTerm(e.target.value);
        }}
      />

      {!!filters.searchTerm.length && (
        <button
          className="clear-search-btn"
          type="button"
          onClick={() => {
            filters.setSearchTerm("");
          }}
        >
          <span className="visually-hidden">Clear search text</span>
          <i className="material-icons">clear</i>
        </button>
      )}
    </div>
  );
};

export const FilterForm = ({ filters }: Props) => {
  return (
    <form className="filter-form">
      <Toggles filters={filters} />
      <SearchInput filters={filters} />
    </form>
  );
};
