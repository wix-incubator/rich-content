// import React, { useState } from 'react';
// import styles from './styles.scss';

// const Separator = () => <div className={styles.separator} />;

// const DesktopPanel = ({
//   // selectedHeight,
//   // styles,
//   panelHeader,
//   onChange,
//   options,
//   onSave,
//   onCancel,
//   showCustomPanel,
// }) => {
//   const [selected, setSelected] = useState<null | number | string>(null);
//   const onClick = selected => {
//     setSelected(selected);
//     onChange(selected);
//   };

//   //   const LineHeightsPanel = ({ selectedHeight, onSave, showCustomPanel }) => {
//   const lineHeightElement = (height, isSelected) => (
//     <button
//       className={isSelected ? styles.lineHeightsPanel_selectedLineHeight : ''}
//       key={height}
//       onClick={() => onClick(height)}
//     >
//       {height}
//     </button>
//   );

//   return (
//     <div className={styles.lineHeightsPanel}>
//       {options.map(option => lineHeightElement(option, option === selected))}
//       <Separator />
//       {showCustomPanel && <button onClick={showCustomPanel}>{panelHeader}</button>}
//     </div>
//   );
//   //   };
// };

// export default DesktopPanel;
