import React from 'react';
import { BGColorIcon, BorderIcon, DeleteIcon, DuplicateIcon, BoldIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell-toolbar.scss';

const CellToolbar = ({ selected, table }) => {
  const shouldShowDelete = table.isRowSelected(selected) || table.isColSelected(selected);
  return selected ? (
    <div className={styles.container}>
      <BoldIcon className={styles.icon} onClick={() => table.formattingCells('BOLD')} />
      <BGColorIcon
        className={styles.icon}
        onClick={() => table.setCellsStyle({ backgroundColor: 'pink' }, selected)}
      />
      <BorderIcon
        className={styles.icon}
        onClick={() => table.setCellsStyle({ border: '1px solid black' }, selected)}
      />
      <DuplicateIcon className={styles.icon} onClick={table.deleteCells} />
      {shouldShowDelete && <DeleteIcon />}
    </div>
  ) : null;
};

CellToolbar.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
};

export default CellToolbar;
