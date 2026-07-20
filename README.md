# Computing Field Guide

I built this project to make a few computer science topics easier to explore without jumping between textbooks, documentation, and scattered code examples. It is meant to work as both a learning guide for someone seeing these ideas for the first time and a quick reference for someone who just needs a reminder.

The site focuses on Big O notation, data structures, searching, sorting, and how those ideas connect to real software and databases. Most sections are interactive, so you can change an input or select a structure and see how the explanation changes.

## What is included

- Interactive comparisons of common Big O growth rates
- A graph for seeing how complexity changes as input size grows
- Time and space complexity references for common data structures
- Explanations of when each data structure is useful
- Search and sorting algorithm comparisons
- Guidance for choosing sorting algorithms based on the structure holding the data
- Data structure examples across Python, JavaScript, Java, C++, C#, Go, and Rust
- An implementation lab with copyable classes for records, arrays, linked lists, graphs, hash tables, stacks, queues, heaps, and binary search trees
- A section connecting data structures to database design and indexing

## Why I made it

Big O and data structures can feel more abstract than they need to be. A notation such as `O(n log n)` is easier to understand when you can compare it with other growth rates, and a linked list makes more sense when you can read a small implementation instead of only looking at a diagram.

I wanted one place where the visual explanation and the actual code could sit together. The code examples favor readability and comments so they can be studied, changed, or used as a starting point for a personal project.

## Running it locally

You will need a current version of Node.js and npm.

```bash
git clone https://github.com/creationsoftre/computing-field-guide.git
cd computing-field-guide
npm install
npm run dev
```

Vite will print the local address in the terminal. Open that address in your browser.

## Available commands

```bash
npm run dev      # Start the local development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Check the source files with ESLint
```

## Built with

- React
- Vite
- Motion
- GSAP
- CSS

## A note about the code examples

The implementation lab is intended to provide clear, useful reference code. Depending on the project, you may still want to add stricter validation, custom error handling, tests, package imports, or behavior for application-specific edge cases.

If you are learning, try copying an implementation and changing it. Add a method, print the internal state, or test what happens with empty and duplicate values. That is usually where these structures start to feel less theoretical.
