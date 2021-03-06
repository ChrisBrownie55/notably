import classNames from '@chbphone55/classnames';
import React, { memo } from 'react';

import './style.css';

interface IIconButtonProps {
  className?: any;
  [s: string]: any;
}

function IconButton({ className, ...props }: IIconButtonProps) {
  return <button {...props} className={classNames(className, 'IconButton')} />;
}

export default memo(IconButton);
