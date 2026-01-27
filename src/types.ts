
import type { Dispatch, SetStateAction } from 'react';

export interface BookData {
    title: string;
    author: string;
    foreword: string;
    whoIsItFor: string[];
    keyTakeaways: Array<{
      title: string;
      description: string;
    }>;
    actionableSteps: string[];
    coreConcepts: string[];
  }

export interface SearchFormProps {
  bookTitle: string;
  setBookTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  loading: boolean;
  error: string;
  handleSubmit: () => void;
}

export interface KeyTakeaway {
    title: string;
    description: string;
}

export interface BookData {
    title: string;
    author: string;
    foreword: string;
    whoIsItFor: string[];
    keyTakeaways: KeyTakeaway[];
    actionableSteps: string[]; 
    coreConcepts: string[]; 
}

export interface SummaryCardProps {
    bookData: BookData;
  }
  