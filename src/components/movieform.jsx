import React from "react";

const MovieForm = props => {
  const { match, history } = props;
  console.log(props);
  return (
    <div>
      <h1>Movie Form</h1>
      <p>{match.params.id}</p>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
