import React from 'react'

import './columns.css'

export const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  } /* {
    name: 'Category',
    cell: (row: any) => (
      <div>
        <li>{row.category[0] ? row.category[0].name : row.category[1]}</li>
        <li>{row.category[1] ? row.category[1].name : row.category[2]}</li>
        <li>{row.category[2] ? row.category[2].name : row.category[3]}</li>
      </div>
    ),
  } */,
  {
    name: 'Authors',
    cell: (row: any) => (
      <div className="columns">
        <li>{row.author[0] ? row.author[0].firstName : row.author[1]}</li>
        <li>{row.author[1] ? row.author[1].firstName : row.author[2]}</li>
        <li>{row.author[2] ? row.author[2].firstName : row.author[3]}</li>
      </div>
    ),
  },

  {
    name: 'Publisher',
    selector: 'publisher',
    sortable: true,
  },
]
