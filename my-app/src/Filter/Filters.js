// filters.js
const filters = [
  {
    label: 'start',
    apply: (wordList, input) => wordList.filter(word => word.startsWith(input)),
  },
  {
    label: 'end',
    apply: (wordList, input) => wordList.filter(word => word.endsWith(input)),
  },
  {
    label: 'length',
    apply: (wordList, input) => {
      const length = parseInt(input, 10);
      return wordList.filter(word => word.length === length);
    },
  },
  {
    label: 'has',
    apply: (wordList, input) => wordList.filter(word => word.includes(input)),
  },
  {
    label: 'lacks',
    apply: (wordList, input) => wordList.filter(word => !word.includes(input)),
  },
  // additional filter types are added here
];
export default filters;
/*
const WordFilter = ({ words, setFilteredWords }) => {
  const [input, setInput] = useState('');


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Apply filters here, e.g., starting with, ending with, length
      const filtered = words.filter(word => word.startsWith(input)); // Modify this line for different filtering
      setFilteredWords(filtered);
      setInput(''); // Clear the input after filtering
    }
  };
};


export default WordFilter;
*/