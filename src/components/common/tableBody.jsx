import React, { Component } from "react";
import _ from "lodash";

// movies: array, onLike: fn, onDelete: fn, import Like
class TableBody extends Component {
  // render each item stored in array
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    // Gets the value at path of object ._(object, array||string to search). If the resolved value is undefined, the defaultValue is returned in its place.
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
