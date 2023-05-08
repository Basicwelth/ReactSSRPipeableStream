import { useEffect, useState } from 'react';

export const clientRendering = (data) => {
  const [isDom, isDomReady] = useState(false);
  useEffect(() => isDomReady(true));
  return isDom ? data : null;
};