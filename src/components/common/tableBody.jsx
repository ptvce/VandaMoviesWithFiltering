import React, { Component } from "react";
import _ from "lodash";
import { func } from "prop-types";

function TableBody(props) {

  const { data, columns } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item.slug + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map(item => (
        <tr key={item.slug}>
          {columns.map(column => (
            <td key={createKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
export default TableBody;
