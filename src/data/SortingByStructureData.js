const sortingByStructureData = [
  {
    structure: "Array / Python list",
    algorithms: ["Bubble sort", "Selection sort", "Insertion sort", "Merge sort", "Quicksort", "Heap sort", "Counting sort", "Radix sort", "Bucket sort"],
    note: "Arrays support fast index access, so almost every sorting algorithm works well.",
  },
  {
    structure: "Singly linked list",
    algorithms: ["Merge sort", "Insertion sort", "Bubble sort"],
    note: "Merge sort is usually the best choice because nodes can be split and merged without random index access.",
  },
  {
    structure: "Doubly linked list",
    algorithms: ["Merge sort", "Insertion sort", "Bubble sort", "Quicksort"],
    note: "Previous and next pointers make traversal and swapping easier, but merge sort is still commonly preferred.",
  },
  {
    structure: "Stack",
    algorithms: ["Convert to an array", "Use another stack", "Recursive stack sorting"],
    note: "A stack only exposes the top element, so normal sorting algorithms cannot access arbitrary elements directly.",
  },
  {
    structure: "Queue",
    algorithms: ["Convert to an array/list", "Use another queue", "Merge-style queue sorting"],
    note: "A queue only allows access at the front and rear.",
  },
  {
    structure: "Deque",
    algorithms: ["Merge sort", "Insertion sort", "Convert to an array"],
    note: "Access from both ends helps, but a deque still does not provide efficient arbitrary indexing.",
  },
  {
    structure: "Heap / priority queue",
    algorithms: ["Heap sort"],
    note: "A heap already maintains partial ordering. Repeatedly removing the minimum or maximum produces sorted output.",
  },
  {
    structure: "Binary search tree",
    algorithms: ["In-order traversal"],
    note: "A correctly built BST produces sorted values when traversed left, root, then right.",
  },
  {
    structure: "AVL tree",
    algorithms: ["In-order traversal"],
    note: "AVL trees are balanced BSTs, so in-order traversal returns sorted values in O(n).",
  },
  {
    structure: "Red-black tree",
    algorithms: ["In-order traversal"],
    note: "Like AVL trees, values are already maintained in search-tree order.",
  },
  {
    structure: "B-tree / 2-3-4 tree",
    algorithms: ["In-order traversal"],
    note: "Keys inside each node and child subtrees are visited in ascending order.",
  },
  {
    structure: "Hash table / dictionary",
    algorithms: ["Extract to a list", "Sort keys, values, or items"],
    note: "Hash tables do not maintain sorted order.",
  },
  {
    structure: "Set",
    algorithms: ["Convert to a list", "Sort the resulting list"],
    note: "Sets are unordered collections.",
  },
  {
    structure: "Graph",
    algorithms: ["Topological sort", "Sort vertices separately", "Sort edges separately"],
    note: "Traditional sorting does not apply to an entire graph. Topological sorting only works for directed acyclic graphs.",
  },
];

export default sortingByStructureData;
