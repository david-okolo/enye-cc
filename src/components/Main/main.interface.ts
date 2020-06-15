import { PastSearch } from '../../utils/interface';
import { Dispatch, SetStateAction } from 'react';

export interface IHomeProps {
  isLoggedIn: boolean
  pastSearches: PastSearch[]
  pastSearchVisible: boolean
  setPastSearchVisible: Dispatch<SetStateAction<boolean>>
  setPastSearches: Dispatch<SetStateAction<PastSearch[]>>
}