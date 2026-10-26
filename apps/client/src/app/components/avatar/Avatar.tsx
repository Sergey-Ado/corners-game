import { useMemo } from 'react';
import { Style, Avatar as createAvatar } from '@dicebear/core';
import lorelei from '@dicebear/styles/lorelei.json' with { type: 'json' };
import clsx from 'clsx';

const style = new Style(lorelei);

export default function Avatar({
  seed = 'Alice',
  size = 32,
  onClick = () => {},
  className: classes = '',
}) {
  const avatar = useMemo(() => {
    return new createAvatar(style, {
      seed,
      size,
      // ... other options
    }).toDataUri();
  }, [seed, size]);

  return (
    <div className={clsx('flex', classes)} onClick={onClick} role="avatar">
      <img src={avatar} alt="Avatar" />
    </div>
  );
}
