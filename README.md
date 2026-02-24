Answer 1:
getElementById: Selects a single element by unique id name 

getElementsByClassName: Selects all elements with a given class name and returns an HTMLCollection.

querySelector: Uses a CSS selector to select the first matching element.

querySelectorAll: Uses a CSS selector to select all matching elements returns a NodeList.

Answer 2:
we can create element using: document.createElement() 

const newDiv = document.createElement("div");

can add using newDiv.textContent = "Hello World!";

Insert into DOM
document.body.appendChild(newDiv);

Answer 3:
Event Bubbling is a process in the DOM where an event starts from the target element and then 
“bubbles up” to its parent elements.

How it works:
When you click (or trigger an event on) a child element:

1. The event runs on the target element first.

2. Then it moves up to its parent.

3.Then to the parent’s parent.

4. It continues up to the document root.

Example:

If you click a <button> inside a <div>, the event fires:
button → div → body → document

Answer 4:
Event Delegation is a technique where you attach a single event listener to a parent element instead of adding listeners to multiple child elements.

It works because of event bubbling — the event bubbles up from the child to the parent, and the parent can detect which child triggered it.

it useful for

1. Improves performance (fewer event listeners)

2. Works for dynamically added elements

3. Makes code cleaner and easier to manage

In short, event delegation handles child events using one listener on the parent element.

Answer 5:
preventDefault() and stopPropagation() are both event methods, but they do different things:

preventDefault() – Stops the browser’s default behavior.
Example: Prevent a form from submitting or stop a link from opening.

stopPropagation() – Stops the event from bubbling (or capturing) to parent elements.

In short:

preventDefault() = stops default action

stopPropagation() = stops event movement in the DOM





