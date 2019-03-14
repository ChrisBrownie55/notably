import classNames from '@chbphone55/classnames';
import React from 'react';

export interface IHeadingLabelProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  [s: string]: any;
}
function HeadingLabel({ className, size, ...props }: IHeadingLabelProps) {
  return (
    <label className={classNames('HeadingLabel', className)} {...props}>
      H<small>{size}</small>
    </label>
  );
}

export default HeadingLabel;
