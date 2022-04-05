import { Tooltip } from '@chan-chala/uikit';
import React from 'react';

type PlaceType = 'left' | 'top' | 'bottom' | 'right';

type TooltipColorType =
  | 'dark'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'light';
interface IHelpButton {
  className?: string;
  id: string;
  value: React.ReactNode;
  place?: PlaceType;
  tooltipColor?: TooltipColorType;
  color?: string;
}

const defaultProps = {
  className: undefined,
  place: 'top' as PlaceType,
  color: '#4CAF50',
  tooltipColor: 'dark' as TooltipColorType,
};

const HelpButton: React.FC<IHelpButton> = ({
  id,
  className,
  value,
  place,
  color,
  tooltipColor,
}) => (
  <>
    <div
      data-tip
      data-for={id}
      className={className}
      style={{
        height: '30px',
        lineHeight: '30px',
        width: '30px',
        fontSize: '1em',
        fontWeight: 'bold',
        borderRadius: '50%',
        background: color,
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      ?
    </div>
    <Tooltip id={id} place={place} type={tooltipColor}>
      {value}
    </Tooltip>
  </>
);

HelpButton.defaultProps = defaultProps;

export default HelpButton;
