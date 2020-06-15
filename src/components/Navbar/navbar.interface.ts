import { Dispatch, SetStateAction } from 'react';

export interface INavbarProps {
  setPastSearchVisible: Dispatch<SetStateAction<boolean>>,
  getPastSearches: any
}