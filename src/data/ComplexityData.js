const complexityData = [
  {
    id: "constant",
    notation: "O(1)",
    name: "Constant Time",
    rating: "Excellent",
    definition:
      "The amount of work stays approximately the same, even when the input grows.",
    example: "Accessing an array item using its index.",
  },
  {
    id: "logarithmic",
    notation: "O(log n)",
    name: "Logarithmic Time",
    rating: "Excellent",
    definition:
      "The algorithm reduces the amount of remaining data during each step.",
    example: "Binary search in a sorted list.",
  },
  {
    id: "linear",
    notation: "O(n)",
    name: "Linear Time",
    rating: "Good",
    definition:
      "The amount of work grows at approximately the same rate as the input.",
    example: "Searching every item in an unsorted list.",
  },
  {
    id: "linearithmic",
    notation: "O(n log n)",
    name: "Linearithmic Time",
    rating: "Fair",
    definition:
      "The algorithm processes all items while also repeatedly dividing the problem.",
    example: "Efficient sorting with merge sort.",
  },
  {
    id: "quadratic",
    notation: "O(n²)",
    name: "Quadratic Time",
    rating: "Slow",
    definition:
      "The algorithm may perform work for every possible pair of input items.",
    example: "Two nested loops comparing every item.",
  },
  {
    id: "exponential",
    notation: "O(2ⁿ)",
    name: "Exponential Time",
    rating: "Very Slow",
    definition:
      "The amount of work approximately doubles whenever one item is added.",
    example: "Testing every possible subset of a collection.",
  },
  {
    id: "factorial",
    notation: "O(n!)",
    name: "Factorial Time",
    rating: "Extremely Slow",
    definition:
      "The algorithm examines every possible ordering of the input items.",
    example: "Testing every possible route between destinations.",
  },
];

export default complexityData;