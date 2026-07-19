const structures = {
  "Hash Table": {
    summary: "Turns a key into a bucket index and uses separate chaining when keys collide.",
    complexity: ["Lookup O(1) avg", "Insert O(1) avg", "Space O(n)"],
    steps: ["Hash the key", "Choose a bucket", "Search the collision chain"],
  },
  Stack: {
    summary: "Stores values last-in, first-out, so the newest value leaves first.",
    complexity: ["Peek O(1)", "Push / pop O(1)", "Space O(n)"],
    steps: ["Push onto the top", "Read the top", "Pop from the top"],
  },
  Queue: {
    summary: "Stores values first-in, first-out using independent front and rear ends.",
    complexity: ["Peek O(1)", "Enqueue / dequeue O(1)", "Space O(n)"],
    steps: ["Add at the rear", "Read the front", "Remove the front"],
  },
  Heap: {
    summary: "Keeps the smallest value at the root while maintaining a complete binary tree.",
    complexity: ["Minimum O(1)", "Push / pop O(log n)", "Space O(n)"],
    steps: ["Append the value", "Bubble it upward", "Sift the root downward"],
  },
  "Binary Search Tree": {
    summary: "Places smaller keys left and larger keys right to eliminate half a subtree at each step.",
    complexity: ["Search O(log n) avg", "Insert O(log n) avg", "Space O(n)"],
    steps: ["Compare with a node", "Choose left or right", "Repeat until found"],
  },
};

const code = {
  "Hash Table": {
    Python: `class HashTable:
    def __init__(self, size=8):
        # Each slot holds a chain of colliding key/value pairs.
        self.buckets = [[] for _ in range(size)]

    def _bucket(self, key):
        # Modulo keeps the hash inside the bucket array.
        return self.buckets[hash(key) % len(self.buckets)]

    def set(self, key, value):
        bucket = self._bucket(key)
        for pair in bucket:
            if pair[0] == key:
                pair[1] = value  # Update an existing key.
                return
        bucket.append([key, value])

    def get(self, key):
        for stored_key, value in self._bucket(key):
            if stored_key == key:
                return value
        raise KeyError(key)`,
    JavaScript: `class HashTable {
  constructor(size = 8) {
    // Each slot is a collision chain.
    this.buckets = Array.from({ length: size }, () => []);
  }

  hash(key) {
    // A small teaching hash for string keys.
    return [...key].reduce((sum, char) =>
      (sum * 31 + char.charCodeAt(0)) >>> 0, 0);
  }

  set(key, value) {
    const bucket = this.buckets[this.hash(key) % this.buckets.length];
    const pair = bucket.find(([storedKey]) => storedKey === key);
    if (pair) pair[1] = value; // Update instead of duplicate.
    else bucket.push([key, value]);
  }

  get(key) {
    const bucket = this.buckets[this.hash(key) % this.buckets.length];
    return bucket.find(([storedKey]) => storedKey === key)?.[1];
  }
}`,
    Java: `class HashTable<K, V> {
  private record Entry<K, V>(K key, V value) {}
  private final List<Entry<K, V>>[] buckets;

  @SuppressWarnings("unchecked")
  HashTable(int size) {
    // Every array slot owns a collision chain.
    buckets = (List<Entry<K, V>>[]) new List<?>[size];
    for (int i = 0; i < size; i++) buckets[i] = new ArrayList<>();
  }

  private List<Entry<K, V>> bucket(K key) {
    int index = Math.floorMod(key.hashCode(), buckets.length);
    return buckets[index];
  }

  void put(K key, V value) {
    var chain = bucket(key);
    chain.removeIf(entry -> entry.key().equals(key)); // Replace old value.
    chain.add(new Entry<>(key, value));
  }

  V get(K key) {
    return bucket(key).stream().filter(e -> e.key().equals(key))
      .findFirst().orElseThrow().value();
  }
}`,
    "C++": `template <typename K, typename V>
class HashTable {
  // Each vector slot stores keys that produced the same index.
  std::vector<std::list<std::pair<K, V>>> buckets;

  auto& bucket(const K& key) {
    return buckets[std::hash<K>{}(key) % buckets.size()];
  }

public:
  explicit HashTable(size_t size = 8) : buckets(size) {}

  void set(const K& key, const V& value) {
    auto& chain = bucket(key);
    for (auto& [storedKey, storedValue] : chain) {
      if (storedKey == key) { storedValue = value; return; }
    }
    chain.emplace_back(key, value); // New key joins the chain.
  }

  V& get(const K& key) {
    for (auto& [storedKey, value] : bucket(key))
      if (storedKey == key) return value;
    throw std::out_of_range("missing key");
  }
};`,
    "C#": `class HashTable<TKey, TValue> where TKey : notnull {
  // Linked lists keep colliding entries in the same bucket.
  private readonly List<(TKey Key, TValue Value)>[] buckets;

  public HashTable(int size = 8) {
    buckets = Enumerable.Range(0, size)
      .Select(_ => new List<(TKey, TValue)>()).ToArray();
  }

  private List<(TKey Key, TValue Value)> Bucket(TKey key) {
    var index = (key.GetHashCode() & 0x7fffffff) % buckets.Length;
    return buckets[index];
  }

  public void Set(TKey key, TValue value) {
    var chain = Bucket(key);
    chain.RemoveAll(pair => EqualityComparer<TKey>.Default.Equals(pair.Key, key));
    chain.Add((key, value)); // Add the new or replacement entry.
  }

  public TValue Get(TKey key) => Bucket(key)
    .First(pair => EqualityComparer<TKey>.Default.Equals(pair.Key, key)).Value;
}`,
    Go: `type entry struct { key string; value any }

type HashTable struct {
	// Each slice is a chain of colliding entries.
	buckets [][]entry
}

func NewHashTable(size int) *HashTable {
	return &HashTable{buckets: make([][]entry, size)}
}

func (h *HashTable) index(key string) int {
	// FNV-1a is a compact, deterministic string hash.
	var hash uint32 = 2166136261
	for _, char := range []byte(key) { hash = (hash ^ uint32(char)) * 16777619 }
	return int(hash % uint32(len(h.buckets)))
}

func (h *HashTable) Set(key string, value any) {
	i := h.index(key)
	for p := range h.buckets[i] {
		if h.buckets[i][p].key == key { h.buckets[i][p].value = value; return }
	}
	h.buckets[i] = append(h.buckets[i], entry{key, value})
}`,
    Rust: `struct HashTable<K, V> {
    // Each vector slot owns a chain of colliding entries.
    buckets: Vec<Vec<(K, V)>>,
}

impl<K: Hash + Eq, V> HashTable<K, V> {
    fn new(size: usize) -> Self {
        let buckets = (0..size).map(|_| Vec::new()).collect();
        Self { buckets }
    }

    fn index(&self, key: &K) -> usize {
        let mut hasher = DefaultHasher::new();
        key.hash(&mut hasher);
        hasher.finish() as usize % self.buckets.len()
    }

    fn insert(&mut self, key: K, value: V) {
        let index = self.index(&key);
        if let Some(pair) = self.buckets[index].iter_mut().find(|p| p.0 == key) {
            pair.1 = value; // Replace the existing value.
        } else { self.buckets[index].push((key, value)); }
    }
}`,
  },
  Stack: {
    Python: `class Stack:
    def __init__(self): self.items = []
    def push(self, value): self.items.append(value)  # Add at the top.
    def pop(self): return self.items.pop()            # Remove the top.
    def peek(self): return self.items[-1]             # Read without removing.`,
    JavaScript: `class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); } // Add at the top.
  pop() { return this.items.pop(); }      // Remove the top.
  peek() { return this.items.at(-1); }    // Read without removing.
}`,
    Java: `class Stack<T> {
  private final ArrayList<T> items = new ArrayList<>();
  void push(T value) { items.add(value); } // Add at the top.
  T pop() { return items.remove(items.size() - 1); }
  T peek() { return items.get(items.size() - 1); }
}`,
    "C++": `template <typename T> class Stack {
  std::vector<T> items;
public:
  void push(T value) { items.push_back(std::move(value)); } // Add at top.
  T pop() { T value = std::move(items.back()); items.pop_back(); return value; }
  const T& peek() const { return items.back(); } // Read without removing.
};`,
    "C#": `class Stack<T> {
  private readonly List<T> items = new();
  public void Push(T value) => items.Add(value); // Add at the top.
  public T Pop() { var value = items[^1]; items.RemoveAt(items.Count - 1); return value; }
  public T Peek() => items[^1]; // Read without removing.
}`,
    Go: `type Stack[T any] struct { items []T }
func (s *Stack[T]) Push(value T) { s.items = append(s.items, value) } // Add at top.
func (s *Stack[T]) Pop() T {
	i := len(s.items) - 1
	value := s.items[i]
	s.items = s.items[:i] // Shrink after reading the top.
	return value
}`,
    Rust: `struct Stack<T> { items: Vec<T> }
impl<T> Stack<T> {
    fn new() -> Self { Self { items: Vec::new() } }
    fn push(&mut self, value: T) { self.items.push(value); } // Add at top.
    fn pop(&mut self) -> Option<T> { self.items.pop() }
    fn peek(&self) -> Option<&T> { self.items.last() } // Borrow the top.
}`,
  },
  Queue: {
    Python: `class Queue:
    def __init__(self):
        self.items = collections.deque()  # Efficient at both ends.
    def enqueue(self, value): self.items.append(value)  # Add at rear.
    def dequeue(self): return self.items.popleft()       # Remove front.
    def peek(self): return self.items[0]`,
    JavaScript: `class Queue {
  constructor() { this.items = new Map(); this.front = 0; this.rear = 0; }
  enqueue(value) { this.items.set(this.rear++, value); } // Add at rear.
  dequeue() {
    const value = this.items.get(this.front);
    this.items.delete(this.front++); // Advance instead of shifting an array.
    return value;
  }
  peek() { return this.items.get(this.front); }
}`,
    Java: `class Queue<T> {
  private final ArrayDeque<T> items = new ArrayDeque<>();
  void enqueue(T value) { items.addLast(value); } // Add at rear.
  T dequeue() { return items.removeFirst(); }     // Remove front.
  T peek() { return items.getFirst(); }
}`,
    "C++": `template <typename T> class Queue {
  std::deque<T> items; // A deque provides constant-time ends.
public:
  void enqueue(T value) { items.push_back(std::move(value)); }
  T dequeue() { T value = std::move(items.front()); items.pop_front(); return value; }
  const T& peek() const { return items.front(); }
};`,
    "C#": `class Queue<T> {
  private readonly LinkedList<T> items = new();
  public void Enqueue(T value) => items.AddLast(value); // Add at rear.
  public T Dequeue() { var value = items.First!.Value; items.RemoveFirst(); return value; }
  public T Peek() => items.First!.Value; // Read the front.
}`,
    Go: `type Queue[T any] struct { items []T }
func (q *Queue[T]) Enqueue(value T) { q.items = append(q.items, value) }
func (q *Queue[T]) Dequeue() T {
	value := q.items[0] // Oldest value is at the front.
	q.items[0] = *new(T)
	q.items = q.items[1:]
	return value
}`,
    Rust: `struct Queue<T> { items: VecDeque<T> }
impl<T> Queue<T> {
    fn new() -> Self { Self { items: VecDeque::new() } }
    fn enqueue(&mut self, value: T) { self.items.push_back(value); } // Rear.
    fn dequeue(&mut self) -> Option<T> { self.items.pop_front() }    // Front.
    fn peek(&self) -> Option<&T> { self.items.front() }
}`,
  },
  Heap: {
    Python: `class MinHeap:
    def __init__(self): self.items = []
    def push(self, value):
        self.items.append(value)
        i = len(self.items) - 1
        while i > 0:  # Bubble up while the parent is larger.
            parent = (i - 1) // 2
            if self.items[parent] <= value: break
            self.items[i] = self.items[parent]; i = parent
        self.items[i] = value
    def peek(self): return self.items[0]  # Minimum stays at the root.`,
    JavaScript: `class MinHeap {
  constructor() { this.items = []; }
  push(value) {
    this.items.push(value);
    let i = this.items.length - 1;
    while (i > 0) { // Bubble up while the parent is larger.
      const parent = Math.floor((i - 1) / 2);
      if (this.items[parent] <= value) break;
      this.items[i] = this.items[parent]; i = parent;
    }
    this.items[i] = value;
  }
  peek() { return this.items[0]; }
}`,
    Java: `class MinHeap<T extends Comparable<T>> {
  private final ArrayList<T> items = new ArrayList<>();
  void push(T value) {
    items.add(value);
    int i = items.size() - 1;
    while (i > 0) { // Bubble up past larger parents.
      int parent = (i - 1) / 2;
      if (items.get(parent).compareTo(value) <= 0) break;
      items.set(i, items.get(parent)); i = parent;
    }
    items.set(i, value);
  }
  T peek() { return items.get(0); }
}`,
    "C++": `template <typename T> class MinHeap {
  std::vector<T> items;
public:
  void push(T value) {
    items.push_back(value);
    size_t i = items.size() - 1;
    while (i > 0) { // Bubble up past larger parents.
      size_t parent = (i - 1) / 2;
      if (items[parent] <= value) break;
      items[i] = std::move(items[parent]); i = parent;
    }
    items[i] = std::move(value);
  }
  const T& peek() const { return items.front(); }
};`,
    "C#": `class MinHeap<T> where T : IComparable<T> {
  private readonly List<T> items = new();
  public void Push(T value) {
    items.Add(value);
    var i = items.Count - 1;
    while (i > 0) { // Bubble up past larger parents.
      var parent = (i - 1) / 2;
      if (items[parent].CompareTo(value) <= 0) break;
      items[i] = items[parent]; i = parent;
    }
    items[i] = value;
  }
  public T Peek() => items[0];
}`,
    Go: `type MinHeap[T cmp.Ordered] struct { items []T }
func (h *MinHeap[T]) Push(value T) {
	h.items = append(h.items, value)
	i := len(h.items) - 1
	for i > 0 { // Bubble up past larger parents.
		parent := (i - 1) / 2
		if h.items[parent] <= value { break }
		h.items[i] = h.items[parent]; i = parent
	}
	h.items[i] = value
}
func (h *MinHeap[T]) Peek() T { return h.items[0] }`,
    Rust: `struct MinHeap<T> { items: Vec<T> }
impl<T: Ord> MinHeap<T> {
    fn push(&mut self, value: T) {
        self.items.push(value);
        let mut i = self.items.len() - 1;
        while i > 0 { // Swap upward past larger parents.
            let parent = (i - 1) / 2;
            if self.items[parent] <= self.items[i] { break; }
            self.items.swap(parent, i); i = parent;
        }
    }
    fn peek(&self) -> Option<&T> { self.items.first() }
}`,
  },
  "Binary Search Tree": {
    Python: `class Node:
    def __init__(self, key): self.key, self.left, self.right = key, None, None
    def insert(self, key):
        # Smaller keys go left; larger keys go right.
        branch = "left" if key < self.key else "right"
        child = getattr(self, branch)
        if child: child.insert(key)
        else: setattr(self, branch, Node(key))
    def contains(self, key):
        if key == self.key: return True
        child = self.left if key < self.key else self.right
        return child.contains(key) if child else False`,
    JavaScript: `class Node {
  constructor(key) { this.key = key; this.left = null; this.right = null; }
  insert(key) {
    // Smaller keys go left; larger keys go right.
    const branch = key < this.key ? "left" : "right";
    if (this[branch]) this[branch].insert(key);
    else this[branch] = new Node(key);
  }
  contains(key) {
    if (key === this.key) return true;
    const child = key < this.key ? this.left : this.right;
    return child ? child.contains(key) : false;
  }
}`,
    Java: `class Node<T extends Comparable<T>> {
  final T key; Node<T> left, right;
  Node(T key) { this.key = key; }
  void insert(T value) {
    // Follow one ordered branch until an empty position appears.
    boolean goLeft = value.compareTo(key) < 0;
    Node<T> child = goLeft ? left : right;
    if (child != null) child.insert(value);
    else if (goLeft) left = new Node<>(value); else right = new Node<>(value);
  }
  boolean contains(T value) {
    if (value.equals(key)) return true;
    Node<T> child = value.compareTo(key) < 0 ? left : right;
    return child != null && child.contains(value);
  }
}`,
    "C++": `template <typename T> struct Node {
  T key; std::unique_ptr<Node> left, right;
  explicit Node(T value) : key(std::move(value)) {}
  void insert(T value) {
    // Choose exactly one ordered branch.
    auto& child = value < key ? left : right;
    if (child) child->insert(std::move(value));
    else child = std::make_unique<Node>(std::move(value));
  }
  bool contains(const T& value) const {
    if (value == key) return true;
    const auto& child = value < key ? left : right;
    return child && child->contains(value);
  }
};`,
    "C#": `class Node<T> where T : IComparable<T> {
  public T Key { get; } public Node<T>? Left, Right;
  public Node(T key) => Key = key;
  public void Insert(T value) {
    // Choose exactly one ordered branch.
    ref Node<T>? child = ref (value.CompareTo(Key) < 0 ? ref Left : ref Right);
    if (child is null) child = new Node<T>(value); else child.Insert(value);
  }
  public bool Contains(T value) {
    if (value.CompareTo(Key) == 0) return true;
    var child = value.CompareTo(Key) < 0 ? Left : Right;
    return child?.Contains(value) ?? false;
  }
}`,
    Go: `type Node[T cmp.Ordered] struct { Key T; Left, Right *Node[T] }
func (n *Node[T]) Insert(value T) {
	// Choose exactly one ordered branch.
	child := &n.Right
	if value < n.Key { child = &n.Left }
	if *child == nil { *child = &Node[T]{Key: value} } else { (*child).Insert(value) }
}
func (n *Node[T]) Contains(value T) bool {
	if value == n.Key { return true }
	child := n.Right
	if value < n.Key { child = n.Left }
	return child != nil && child.Contains(value)
}`,
    Rust: `struct Node<T> { key: T, left: Option<Box<Node<T>>>, right: Option<Box<Node<T>>> }
impl<T: Ord> Node<T> {
    fn insert(&mut self, value: T) {
        // Choose exactly one ordered branch.
        let child = if value < self.key { &mut self.left } else { &mut self.right };
        match child {
            Some(node) => node.insert(value),
            None => *child = Some(Box::new(Node { key: value, left: None, right: None })),
        }
    }
    fn contains(&self, value: &T) -> bool {
        if value == &self.key { return true; }
        let child = if value < &self.key { &self.left } else { &self.right };
        child.as_ref().is_some_and(|node| node.contains(value))
    }
}`,
  },
};

export const implementationLanguages = ["Python", "JavaScript", "Java", "C++", "C#", "Go", "Rust"];
export const implementationStructures = Object.keys(structures);
export const getImplementation = (structure, language) => ({ ...structures[structure], code: code[structure][language] });
