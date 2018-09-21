import _ from "lodash";

// Creating function for pagination
export function paginate(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  console.log(currentPage, startIndex, items, pageSize);
  return _(items) // To chain with lodash, you first have to wrap the object.
    .slice(startIndex) // Creates a slice of array from start up to, but not including, end.
    .take(pageSize) // Creates a slice of array with n elements taken from the beginning.
    .value(); // The result is always a wrapped value and always needs to be unwrapped by calling .value().
}
