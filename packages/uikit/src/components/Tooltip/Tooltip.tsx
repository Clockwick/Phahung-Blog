import React from 'react';

import ReactTooltip from 'react-tooltip';
import { ITooltip } from './types';

const Tooltip: React.FC<ITooltip> = ({
  id,
  place = 'top',
  type = 'dark',
  effect = 'solid',
  children,
}) => {
  return (
    <ReactTooltip id={id} type={type} effect={effect} place={place}>
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
