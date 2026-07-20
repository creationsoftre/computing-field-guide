const structures = {
  Record: {
    summary: "Groups named fields into one value and provides controlled field lookup and updates.",
    complexity: ["Field access O(1)", "Update O(1)", "Space O(f)"],
    steps: ["Define the fields", "Create a record", "Read or update by field name"],
  },
  Array: {
    summary: "Stores values in contiguous indexed slots and grows its capacity when it becomes full.",
    complexity: ["Index O(1)", "Search O(n)", "Append O(1) amortized", "Remove O(n)"],
    steps: ["Allocate indexed storage", "Grow when full", "Shift values for insertion or removal"],
  },
  __linkedListCode: {
    Python: `class Node:
    # Each node stores a value and a link to the next node.
    def __init__(self, value, next_node=None): self.value, self.next = value, next_node

class LinkedList:
    def __init__(self): self.head = None
    def add_first(self, value): self.head = Node(value, self.head)

    def append(self, value):
        # Follow links until the end, then attach the new node.
        node = Node(value)
        if not self.head: self.head = node; return
        current = self.head
        while current.next: current = current.next
        current.next = node
    def contains(self, value):
        current = self.head
        while current:
            if current.value == value: return True
            current = current.next
        return False
    def remove(self, value):
        # Keep the previous node so its link can skip the removed node.
        previous, current = None, self.head
        while current:
            if current.value == value:
                if previous: previous.next = current.next
                else: self.head = current.next
                return True
            previous, current = current, current.next
        return False`,
    JavaScript: `// Each node stores a value and a link to the next node.
class Node { constructor(value, next = null) { this.value = value; this.next = next; } }

class LinkedList {
  constructor() { this.head = null; }
  addFirst(value) { this.head = new Node(value, this.head); }
  append(value) {
    // Follow links until the end, then attach the new node.
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }
  find(value) {
    for (let node = this.head; node; node = node.next) if (node.value === value) return node;
    return null;
  }
  remove(value) {
    // Reconnect the surrounding nodes to remove the match.
    let previous = null, current = this.head;
    while (current) {
      if (current.value === value) {
        if (previous) previous.next = current.next; else this.head = current.next;
        return true;
      }
      previous = current; current = current.next;
    }
    return false;
  }
}`,
    Java: `class LinkedList<T> {
  // Nodes form the chain; head points to its first node.
  private static class Node<T> { T value; Node<T> next; Node(T v, Node<T> n) { value=v; next=n; } }
  private Node<T> head;

  void addFirst(T value) { head = new Node<>(value, head); }
  void append(T value) {
    // Follow links until the end, then attach the new node.
    var node = new Node<T>(value, null);
    if (head == null) { head = node; return; }
    var current = head; while (current.next != null) current = current.next; current.next = node;
  }
  boolean contains(T value) {
    for (var node = head; node != null; node = node.next) if (Objects.equals(node.value, value)) return true;
    return false;
  }
  boolean remove(T value) {
    // Keep the previous node so its link can bypass the match.
    Node<T> previous = null, current = head;
    while (current != null) {
      if (Objects.equals(current.value, value)) {
        if (previous == null) head = current.next; else previous.next = current.next; return true;
      }
      previous = current; current = current.next;
    }
    return false;
  }
}`,
    "C++": `template <typename T> class LinkedList {
  // unique_ptr gives each node ownership of the rest of the chain.
  struct Node { T value; std::unique_ptr<Node> next; explicit Node(T v) : value(std::move(v)) {} };
  std::unique_ptr<Node> head;
public:
  void addFirst(T value) { auto node = std::make_unique<Node>(std::move(value)); node->next = std::move(head); head = std::move(node); }
  void append(T value) {
    // A pointer to the link makes updating the tail straightforward.
    auto* link = &head; while (*link) link = &((*link)->next); *link = std::make_unique<Node>(std::move(value));
  }
  bool contains(const T& value) const {
    for (auto* node = head.get(); node; node = node->next.get()) if (node->value == value) return true;
    return false;
  }
  bool remove(const T& value) {
    // Replace the matching link with the removed node's next link.
    auto* link = &head;
    while (*link) { if ((*link)->value == value) { *link = std::move((*link)->next); return true; } link = &((*link)->next); }
    return false;
  }
};`,
    "C#": `class LinkedList<T> {
  // Each node stores a value and a reference to the next node.
  class Node { public T Value; public Node? Next; public Node(T value, Node? next=null) => (Value, Next)=(value,next); }
  private Node? head;
  public void AddFirst(T value) => head = new Node(value, head);
  public void Append(T value) {
    // Follow Next references until the end of the chain.
    var node = new Node(value); if (head is null) { head = node; return; }
    var current = head; while (current.Next is not null) current = current.Next; current.Next = node;
  }
  public bool Contains(T value) {
    for (var node = head; node is not null; node = node.Next)
      if (EqualityComparer<T>.Default.Equals(node.Value, value)) return true;
    return false;
  }
  public bool Remove(T value) {
    // Reconnect the surrounding nodes to remove the match.
    Node? previous = null; var current = head;
    while (current is not null) {
      if (EqualityComparer<T>.Default.Equals(current.Value, value)) {
        if (previous is null) head = current.Next; else previous.Next = current.Next; return true;
      }
      previous = current; current = current.Next;
    }
    return false;
  }
}`,
    Go: `// Each node stores a value and a pointer to the next node.
type listNode[T comparable] struct { value T; next *listNode[T] }
type LinkedList[T comparable] struct { head *listNode[T] }

func (l *LinkedList[T]) AddFirst(value T) { l.head = &listNode[T]{value: value, next: l.head} }
func (l *LinkedList[T]) Append(value T) {
	// Walk the links, then replace the empty tail link.
	link := &l.head; for *link != nil { link = &(*link).next }; *link = &listNode[T]{value: value}
}
func (l *LinkedList[T]) Contains(value T) bool {
	for node := l.head; node != nil; node = node.next { if node.value == value { return true } }; return false
}
func (l *LinkedList[T]) Remove(value T) bool {
	// A pointer to the link lets us reconnect the chain in place.
	link := &l.head
	for *link != nil { if (*link).value == value { *link = (*link).next; return true }; link = &(*link).next }
	return false
}`,
    Rust: `// Box gives each node ownership of the next node in the chain.
struct Node<T> { value: T, next: Option<Box<Node<T>>> }
struct LinkedList<T> { head: Option<Box<Node<T>>> }

impl<T: PartialEq> LinkedList<T> {
    fn new() -> Self { Self { head: None } }
    fn add_first(&mut self, value: T) { self.head = Some(Box::new(Node { value, next: self.head.take() })); }
    fn append(&mut self, value: T) {
        // Follow mutable links until the empty tail is reached.
        let mut link = &mut self.head;
        while let Some(node) = link { link = &mut node.next; }
        *link = Some(Box::new(Node { value, next: None }));
    }
    fn contains(&self, value: &T) -> bool {
        let mut node = self.head.as_deref();
        while let Some(current) = node { if &current.value == value { return true; } node = current.next.as_deref(); }
        false
    }
    fn remove(&mut self, value: &T) -> bool {
        // Replace the matching link with the next link to remove its node.
        let mut link = &mut self.head;
        while link.as_ref().is_some() {
            if link.as_ref().is_some_and(|node| &node.value == value) {
                *link = link.as_mut().unwrap().next.take(); return true;
            }
            link = &mut link.as_mut().unwrap().next;
        }
        false
    }
}`,
  },
  __graphCode: {
    Python: `class Graph:
    # Map each vertex to the set of vertices connected to it.
    def __init__(self): self.edges = {}
    def add_vertex(self, vertex): self.edges.setdefault(vertex, set())
    def add_edge(self, a, b):
        # Add both directions to create an undirected edge.
        self.add_vertex(a); self.add_vertex(b)
        self.edges[a].add(b); self.edges[b].add(a)
    def remove_edge(self, a, b):
        self.edges.get(a, set()).discard(b); self.edges.get(b, set()).discard(a)
    def remove_vertex(self, vertex):
        for neighbor in self.edges.pop(vertex, set()): self.edges[neighbor].discard(vertex)
    def has_path(self, start, target):
        # Breadth-first search visits each reachable vertex once.
        if start not in self.edges or target not in self.edges: return False
        queue, visited = [start], {start}
        for vertex in queue:
            if vertex == target: return True
            for neighbor in self.edges[vertex] - visited: visited.add(neighbor); queue.append(neighbor)
        return False`,
    JavaScript: `class Graph {
  constructor() {
    // Map each vertex to the set of vertices connected to it.
    this.edges = new Map();
  }

  addVertex(vertex) { if (!this.edges.has(vertex)) this.edges.set(vertex, new Set()); }
  // Add both directions to create an undirected edge.
  addEdge(a, b) { this.addVertex(a); this.addVertex(b); this.edges.get(a).add(b); this.edges.get(b).add(a); }
  removeEdge(a, b) { this.edges.get(a)?.delete(b); this.edges.get(b)?.delete(a); }
  removeVertex(vertex) {
    for (const neighbor of this.edges.get(vertex) ?? []) this.edges.get(neighbor).delete(vertex);
    return this.edges.delete(vertex);
  }
  hasPath(start, target) {
    // Breadth-first search visits each reachable vertex once.
    if (!this.edges.has(start) || !this.edges.has(target)) return false;
    const queue = [start], visited = new Set([start]);
    for (let i = 0; i < queue.length; i++) {
      const vertex = queue[i]; if (vertex === target) return true;
      for (const neighbor of this.edges.get(vertex)) if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
    return false;
  }
}`,
    Java: `class Graph<T> {
  // The adjacency list maps every vertex to its neighbors.
  private final Map<T, Set<T>> edges = new HashMap<>();

  void addVertex(T v) { edges.computeIfAbsent(v, ignored -> new HashSet<>()); }
  // Store both directions because this graph is undirected.
  void addEdge(T a, T b) { addVertex(a); addVertex(b); edges.get(a).add(b); edges.get(b).add(a); }
  void removeEdge(T a, T b) { if (edges.containsKey(a)) edges.get(a).remove(b); if (edges.containsKey(b)) edges.get(b).remove(a); }
  boolean removeVertex(T v) {
    var neighbors = edges.remove(v); if (neighbors == null) return false;
    neighbors.forEach(n -> edges.get(n).remove(v)); return true;
  }
  boolean hasPath(T start, T target) {
    // Breadth-first search uses a queue and avoids revisiting vertices.
    if (!edges.containsKey(start) || !edges.containsKey(target)) return false;
    var queue = new ArrayDeque<T>(); var visited = new HashSet<T>(); queue.add(start); visited.add(start);
    while (!queue.isEmpty()) { var v = queue.remove(); if (v.equals(target)) return true;
      for (var n : edges.get(v)) if (visited.add(n)) queue.add(n); }
    return false;
  }
}`,
    "C++": `template <typename T> class Graph {
  // The adjacency list maps every vertex to its neighbors.
  std::unordered_map<T, std::unordered_set<T>> edges;
public:
  void addVertex(const T& v) { edges.try_emplace(v); }
  // Store both directions because this graph is undirected.
  void addEdge(const T& a, const T& b) { addVertex(a); addVertex(b); edges[a].insert(b); edges[b].insert(a); }
  void removeEdge(const T& a, const T& b) { edges[a].erase(b); edges[b].erase(a); }
  bool removeVertex(const T& v) {
    auto it = edges.find(v); if (it == edges.end()) return false;
    for (const auto& n : it->second) edges[n].erase(v); edges.erase(it); return true;
  }
  bool hasPath(const T& start, const T& target) const {
    // Breadth-first search explores the graph one level at a time.
    if (!edges.contains(start) || !edges.contains(target)) return false;
    std::queue<T> queue; std::unordered_set<T> visited{start}; queue.push(start);
    while (!queue.empty()) { T v = queue.front(); queue.pop(); if (v == target) return true;
      for (const auto& n : edges.at(v)) if (visited.insert(n).second) queue.push(n); }
    return false;
  }
};`,
    "C#": `class Graph<T> where T : notnull {
  // The adjacency list maps every vertex to its neighbors.
  private readonly Dictionary<T, HashSet<T>> edges = new();

  public void AddVertex(T v) { if (!edges.ContainsKey(v)) edges[v] = new(); }
  // Store both directions because this graph is undirected.
  public void AddEdge(T a, T b) { AddVertex(a); AddVertex(b); edges[a].Add(b); edges[b].Add(a); }
  public void RemoveEdge(T a, T b) { if (edges.TryGetValue(a, out var x)) x.Remove(b); if (edges.TryGetValue(b, out var y)) y.Remove(a); }
  public bool RemoveVertex(T v) {
    if (!edges.Remove(v, out var neighbors)) return false;
    foreach (var n in neighbors) edges[n].Remove(v); return true;
  }
  public bool HasPath(T start, T target) {
    // Breadth-first search uses a queue and avoids revisiting vertices.
    if (!edges.ContainsKey(start) || !edges.ContainsKey(target)) return false;
    var queue = new Queue<T>(); var visited = new HashSet<T> { start }; queue.Enqueue(start);
    while (queue.Count > 0) { var v = queue.Dequeue(); if (EqualityComparer<T>.Default.Equals(v, target)) return true;
      foreach (var n in edges[v]) if (visited.Add(n)) queue.Enqueue(n); }
    return false;
  }
}`,
    Go: `// The adjacency list maps every vertex to its neighbors.
type Graph[T comparable] struct { edges map[T]map[T]bool }

func NewGraph[T comparable]() *Graph[T] { return &Graph[T]{edges: make(map[T]map[T]bool)} }
func (g *Graph[T]) AddVertex(v T) { if g.edges[v] == nil { g.edges[v] = make(map[T]bool) } }
// Add both directions because this graph is undirected.
func (g *Graph[T]) AddEdge(a, b T) { g.AddVertex(a); g.AddVertex(b); g.edges[a][b] = true; g.edges[b][a] = true }
func (g *Graph[T]) RemoveEdge(a, b T) { delete(g.edges[a], b); delete(g.edges[b], a) }
func (g *Graph[T]) RemoveVertex(v T) bool {
	if g.edges[v] == nil { return false }; for n := range g.edges[v] { delete(g.edges[n], v) }; delete(g.edges, v); return true
}
func (g *Graph[T]) HasPath(start, target T) bool {
	// Breadth-first search visits each reachable vertex once.
	if g.edges[start] == nil || g.edges[target] == nil { return false }
	queue, visited := []T{start}, map[T]bool{start: true}
	for len(queue) > 0 { v := queue[0]; queue = queue[1:]; if v == target { return true }
		for n := range g.edges[v] { if !visited[n] { visited[n] = true; queue = append(queue, n) } } }
	return false
}`,
    Rust: `use std::collections::{HashMap, HashSet, VecDeque};

// The adjacency list maps every vertex to its neighbors.
struct Graph<T> { edges: HashMap<T, HashSet<T>> }
impl<T: Eq + Hash + Clone> Graph<T> {
    fn new() -> Self { Self { edges: HashMap::new() } }
    fn add_vertex(&mut self, v: T) { self.edges.entry(v).or_default(); }
    fn add_edge(&mut self, a: T, b: T) {
        // Store both directions because this graph is undirected.
        self.add_vertex(a.clone()); self.add_vertex(b.clone());
        self.edges.get_mut(&a).unwrap().insert(b.clone()); self.edges.get_mut(&b).unwrap().insert(a);
    }
    fn remove_edge(&mut self, a: &T, b: &T) {
        if let Some(n) = self.edges.get_mut(a) { n.remove(b); } if let Some(n) = self.edges.get_mut(b) { n.remove(a); }
    }
    fn remove_vertex(&mut self, v: &T) -> bool {
        let Some(neighbors) = self.edges.remove(v) else { return false };
        for n in neighbors { self.edges.get_mut(&n).unwrap().remove(v); } true
    }
    fn has_path(&self, start: &T, target: &T) -> bool {
        // Breadth-first search visits each reachable vertex once.
        if !self.edges.contains_key(start) || !self.edges.contains_key(target) { return false; }
        let mut queue = VecDeque::from([start]); let mut visited = HashSet::from([start]);
        while let Some(v) = queue.pop_front() { if v == target { return true; }
            for n in &self.edges[v] { if visited.insert(n) { queue.push_back(n); } } }
        false
    }
}`,
  },
  "Linked List": {
    summary: "Connects nodes with references so values can be inserted and removed without moving every item.",
    complexity: ["Search O(n)", "Add first O(1)", "Remove O(n)", "Space O(n)"],
    steps: ["Wrap a value in a node", "Connect it to the chain", "Follow links to search or remove"],
  },
  Graph: {
    summary: "Stores vertices and their connections in an adjacency list for efficient neighborhood traversal.",
    complexity: ["Add vertex O(1)", "Add edge O(1) avg", "Search O(V + E)", "Space O(V + E)"],
    steps: ["Add vertices", "Connect them with edges", "Traverse neighbors with breadth-first search"],
  },
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
  "Linked List": structures.__linkedListCode,
  Graph: structures.__graphCode,
  Record: {
    Python: `class PersonRecord:
    def __init__(self, name, age, email):
        # A record groups related values under named fields.
        self.name, self.age, self.email = name, age, email

    def get(self, field):
        # Restrict access to fields defined by this record.
        if field not in {"name", "age", "email"}: raise KeyError(field)
        return getattr(self, field)

    def update(self, field, value):
        if field not in {"name", "age", "email"}: raise KeyError(field)
        setattr(self, field, value)

    def contains(self, value):
        return value in (self.name, self.age, self.email)`,
    JavaScript: `class PersonRecord {
  constructor(name, age, email) {
    // A record groups related values under named fields.
    this.name = name; this.age = age; this.email = email;
  }

  get(field) {
    // Reject fields that are not part of the record's schema.
    if (!PersonRecord.fields.has(field)) throw new Error("Unknown field");
    return this[field];
  }
  update(field, value) {
    if (!PersonRecord.fields.has(field)) throw new Error("Unknown field");
    this[field] = value;
  }
  contains(value) { return [...PersonRecord.fields].some(f => this[f] === value); }
}
PersonRecord.fields = new Set(["name", "age", "email"]);`,
    Java: `class PersonRecord {
  private String name, email; private int age;

  PersonRecord(String name, int age, String email) {
    // Store related values as one strongly typed object.
    this.name = name; this.age = age; this.email = email;
  }
  Object get(String field) { return switch (field) {
    // Match a requested field name to its stored value.
    case "name" -> name; case "age" -> age; case "email" -> email;
    default -> throw new IllegalArgumentException("Unknown field");
  }; }
  void updateEmail(String value) { email = value; }
  void updateName(String value) { name = value; }
  void updateAge(int value) { age = value; }
  boolean contains(Object value) {
    return Objects.equals(name, value) || Objects.equals(age, value) || Objects.equals(email, value);
  }
}`,
    "C++": `class PersonRecord {
  // Private fields keep the record's data controlled by its methods.
  std::string name, email; int age;
public:
  PersonRecord(std::string n, int a, std::string e)
    : name(std::move(n)), email(std::move(e)), age(a) {}
  const std::string& getName() const { return name; }
  int getAge() const { return age; }
  const std::string& getEmail() const { return email; }

  // Update individual fields without replacing the whole record.
  void updateName(std::string value) { name = std::move(value); }
  void updateAge(int value) { age = value; }
  void updateEmail(std::string value) { email = std::move(value); }
  bool contains(const std::string& value) const { return name == value || email == value; }
};`,
    "C#": `class PersonRecord {
  // Private setters prevent callers from changing fields directly.
  public string Name { get; private set; }
  public int Age { get; private set; }
  public string Email { get; private set; }
  public PersonRecord(string name, int age, string email) =>
    (Name, Age, Email) = (name, age, email);

  // Return a field by its schema name.
  public object Get(string field) => field switch {
    "name" => Name, "age" => Age, "email" => Email,
    _ => throw new ArgumentException("Unknown field")
  };
  public void UpdateName(string value) => Name = value;
  public void UpdateAge(int value) => Age = value;
  public void UpdateEmail(string value) => Email = value;
  public bool Contains(object value) => Equals(Name, value) || Equals(Age, value) || Equals(Email, value);
}`,
    Go: `// PersonRecord groups related, named fields into one value.
type PersonRecord struct { Name string; Age int; Email string }

func NewPersonRecord(name string, age int, email string) *PersonRecord {
	return &PersonRecord{Name: name, Age: age, Email: email}
}

// Get safely looks up a field by its schema name.
func (p *PersonRecord) Get(field string) (any, bool) {
	switch field { case "name": return p.Name, true; case "age": return p.Age, true; case "email": return p.Email, true }
	return nil, false
}
func (p *PersonRecord) UpdateEmail(value string) { p.Email = value }
func (p *PersonRecord) Contains(value any) bool { return p.Name == value || p.Age == value || p.Email == value }`,
    Rust: `// Private fields are accessed through the record's methods.
struct PersonRecord { name: String, age: u32, email: String }

impl PersonRecord {
    fn new(name: String, age: u32, email: String) -> Self { Self { name, age, email } }
    fn get(&self, field: &str) -> Option<String> {
        // None signals that the requested field is not in the schema.
        match field { "name" => Some(self.name.clone()), "age" => Some(self.age.to_string()),
            "email" => Some(self.email.clone()), _ => None }
    }
    fn update_email(&mut self, value: String) { self.email = value; }
    fn contains(&self, value: &str) -> bool {
        self.name == value || self.email == value || self.age.to_string() == value
    }
}`,
  },
  Array: {
    Python: `class DynamicArray:
    def __init__(self):
        # Python's list provides resizable, indexed storage.
        self.items = []

    def append(self, value):
        self.items.append(value)

    def insert(self, index, value): self.items.insert(index, value)
    def get(self, index): return self.items[index]

    def index_of(self, value):
        # A value search scans from the beginning of the array.
        try: return self.items.index(value)
        except ValueError: return -1
    def remove(self, value):
        try: self.items.remove(value); return True
        except ValueError: return False
    def __len__(self): return len(self.items)`,
    JavaScript: `class DynamicArray {
  constructor() {
    // JavaScript arrays provide resizable, indexed storage.
    this.items = [];
  }

  append(value) { this.items.push(value); }
  insert(index, value) { this.items.splice(index, 0, value); }
  get(index) { return this.items[index]; }

  // Search returns -1 when the value is not present.
  indexOf(value) { return this.items.indexOf(value); }
  remove(value) {
    const index = this.indexOf(value);
    if (index < 0) return false;
    this.items.splice(index, 1); return true;
  }
  get size() { return this.items.length; }
}`,
    Java: `class DynamicArray<T> {
  // ArrayList grows its backing array as values are appended.
  private final ArrayList<T> items = new ArrayList<>();

  void append(T value) { items.add(value); }
  void insert(int index, T value) { items.add(index, value); }
  T get(int index) { return items.get(index); }

  // Search and removal compare values using equals.
  int indexOf(T value) { return items.indexOf(value); }
  boolean remove(T value) { return items.remove(value); }
  int size() { return items.size(); }
}`,
    "C++": `template <typename T> class DynamicArray {
  // vector stores values contiguously and expands its capacity as needed.
  std::vector<T> items;
public:
  void append(T value) { items.push_back(std::move(value)); }
  void insert(size_t index, T value) { items.insert(items.begin() + index, std::move(value)); }
  const T& get(size_t index) const { return items.at(index); }

  // A linear search returns -1 when no matching value exists.
  int indexOf(const T& value) const {
    auto it = std::find(items.begin(), items.end(), value);
    return it == items.end() ? -1 : static_cast<int>(it - items.begin());
  }
  bool remove(const T& value) {
    auto it = std::find(items.begin(), items.end(), value);
    if (it == items.end()) return false; items.erase(it); return true;
  }
  size_t size() const { return items.size(); }
};`,
    "C#": `class DynamicArray<T> {
  // List<T> supplies resizable, indexed storage.
  private readonly List<T> items = new();

  public void Append(T value) => items.Add(value);
  public void Insert(int index, T value) => items.Insert(index, value);
  public T Get(int index) => items[index];

  // IndexOf searches; Remove deletes the first matching value.
  public int IndexOf(T value) => items.IndexOf(value);
  public bool Remove(T value) => items.Remove(value);
  public int Size => items.Count;
}`,
    Go: `// A slice supplies resizable, indexed storage.
type DynamicArray[T comparable] struct { items []T }

func (a *DynamicArray[T]) Append(value T) { a.items = append(a.items, value) }
func (a *DynamicArray[T]) Insert(index int, value T) {
	// Grow first, shift later values right, then fill the gap.
	a.items = append(a.items, value); copy(a.items[index+1:], a.items[index:]); a.items[index] = value
}

func (a *DynamicArray[T]) Get(index int) T { return a.items[index] }
func (a *DynamicArray[T]) IndexOf(value T) int {
	// Search from left to right for the first match.
	for i, item := range a.items { if item == value { return i } }; return -1
}
func (a *DynamicArray[T]) Remove(value T) bool {
	i := a.IndexOf(value); if i < 0 { return false }; a.items = append(a.items[:i], a.items[i+1:]...); return true
}`,
    Rust: `// Vec supplies contiguous storage that grows as needed.
struct DynamicArray<T> { items: Vec<T> }

impl<T: PartialEq> DynamicArray<T> {
    fn new() -> Self { Self { items: Vec::new() } }
    fn append(&mut self, value: T) { self.items.push(value); }
    fn insert(&mut self, index: usize, value: T) { self.items.insert(index, value); }
    fn get(&self, index: usize) -> Option<&T> { self.items.get(index) }

    // position performs a left-to-right value search.
    fn index_of(&self, value: &T) -> Option<usize> { self.items.iter().position(|x| x == value) }
    fn remove(&mut self, value: &T) -> bool {
        if let Some(i) = self.index_of(value) { self.items.remove(i); true } else { false }
    }
    fn len(&self) -> usize { self.items.len() }
}`,
  },
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
export const implementationStructures = Object.keys(structures).filter((key) => !key.startsWith("__"));
export const getImplementation = (structure, language) => ({ ...structures[structure], code: code[structure][language] });
