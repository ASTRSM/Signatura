import {useCallback, useState} from 'react';

export default function useInputError(initialState = {}) {
  const [inputError, setInputError] = useState(initialState);

  // useCallback for Input memoization
  const handleError = useCallback((type, counter) => {
    setInputError(prevState => ({...prevState, [type]: counter}));
  }, []);

  return [inputError, handleError];
}
