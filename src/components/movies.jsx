import React, { Component } from "react";
import {
  getMovies,
  deleteMovie,
  purchaseMovie
} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import CartGroup from "./common/cartgroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchbox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    selectedGenre: "",
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    purchase: []
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = current => {
    // const movies = this.state.movies.filter(movie => movie !== current);
    const movies = deleteMovie(current._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
  };

  handlePurchase = item => {
    purchaseMovie(item._id);
    const purchase = [...this.state.purchase];
    let order = purchase.find(p => p === item);
    let index = purchase.indexOf(order);
    let olength = purchase.length;
    if (!order) {
      purchase.push(item);
      purchase[olength].quantity = 1;
    }
    if (order) purchase[index].quantity = purchase[index].quantity + 1;
    this.setState({ purchase });
  };

  handleDeletePurchase = () => {};

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    // 1
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    // 2
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // 3
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      purchase
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <CartGroup purchase={purchase} />
        </div>
        <div className="col">
          <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>
          <p>
            Showing {totalCount} movies in the database.
            {this.state.purchase.length}
          </p>
          <SearchBox onSearch={this.handleSearch} searchValue={searchQuery} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onPurchase={this.handlePurchase}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
