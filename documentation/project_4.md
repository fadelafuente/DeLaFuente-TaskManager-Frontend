# Project4 - Final Project

### Why React's virtual DOM improves performance:
The virtual DOM is an abstraction of the actual DOM. When a change is made in a component, a new virtual DOM is created and compared to the old virtual DOM. A set of minimum operations needed to reflect these changes are created and React performs these operations on the actual DOM. This way, you can rerender only portions of the the DOM rather then the entire DOM, increasing speed and efficiency.