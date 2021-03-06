import React from 'react';
import { animated, ItemTransition } from 'react-spring';
import { useTransition } from '../../../hooks';
import BaseModal, { IBaseModalProps } from '../BaseModal';

import classNames from '@chbphone55/classnames';
import { ObjectOf } from '../../../lib/generic-types';
import { fast } from '../../../spring-configs';
import './style.css';

interface IProps extends IBaseModalProps, ObjectOf<any> {
  modalTransition?: Array<ItemTransition<any, any>>;
}

function BottomModal({
  children,
  isOpen,
  onRequestClose,
  className,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  modalTransition = useTransition(isOpen, null, {
    from: { transform: 'translateY(100%) translateX(-50%)' },
    enter: { transform: 'translateY(0%) translateX(-50%)' },
    leave: { transform: 'translateY(100%) translateX(-50%)' },
    config: fast
  }),
  ...props
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {modalTransition.map(modal =>
        modal.item ? (
          <animated.div
            className={classNames('BottomModal shadow-lg', className)}
            key={modal.key}
            style={modal.props}
            {...props}
          >
            {children}
          </animated.div>
        ) : null
      )}
    </BaseModal>
  );
}

export default BottomModal;
