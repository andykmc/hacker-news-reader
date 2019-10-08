import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Breakpoint = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const matchDown = (size: Breakpoint): boolean => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(size));

  return matches;
};

const matchUp = (size: Breakpoint): boolean => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(size));

  return matches;
};

export const useScreenSize = {
  isXSmallOrDown: () => matchDown('xs'),
  isSmallOrDown: () => matchDown('sm'),
  isMediumOrDown: () => matchDown('md'),
  isLargeOrDown: () => matchDown('lg'),
  isXLargeOrDown: () => matchDown('xl'),
  isXSmallOrUp: () => matchUp('xs'),
  isSmallOrUp: () => matchUp('sm'),
  isMediumOrUp: () => matchUp('md'),
  isLargeOrUp: () => matchUp('lg'),
  isXLargeOrUp: () => matchUp('xl'),
};
