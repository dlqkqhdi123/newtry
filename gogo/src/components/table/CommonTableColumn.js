import React from 'react';
import styles from './CommonTable.module.css';

const CommonTableColumn = ({ children }) => {
  return (
    <td className={styles.common_table_column}>
      {
        children
      }
    </td>
  )
}

export default CommonTableColumn;