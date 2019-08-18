import React from 'react'
import styled from 'styled-components'
import RCTable from 'rc-table'

import 'rc-table/assets/index.css';

function Table(props) {
  const { data, columns, ...rest} = props

  return (
    <RCTable
      data={data}
      column={columns}
      {...rest}
    />
  )
}

export default RCTable