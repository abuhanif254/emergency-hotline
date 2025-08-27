1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?

Answer :

getElementById, getElementByClassName, querySelector, querySelectorAll are all used to select elements from the HTML document object model in JavaScript, but they different in their selection criteria, return types, and behavior with dynamic DOM changes.

1.getElementByID: 

 select a single element based on its unique ID attribute.
returns a single element object If no element with the specified ID exists, it returns null.
Returns a static reference to the element. Since IDs are meant to be unique, this method is very efficient.

2. getElementsByClassName()

Selects elements based on their class attribute.
Returns a live HTMLCollection of elements. 
This means the collection automatically updates if elements with the specified class are added or removed from the DOM.
Returns a collection that reflects the current state of the DOM.
  can access individual elements within the collection using index notation

3. querySelector()

Selects the first element that matches a specified CSS selector.
 This allows for more flexible selection based on tag names, IDs, classes, attributes, or combinations of these.
Returns a single Element object. If no element matches the selector, it returns null.
Returns a static reference to the element.

4. querySelectorAll()

Selects all elements that match a specified CSS selector.
Returns a static NodeList of elements. This NodeList does not automatically update with DOM changes.
 Returns a collection that represents the elements at the time the method was called.  can iterate over this NodeList using methods like forEach or access elements by index.
 
 2. How do  **create and insert a new element into the DOM**?

 Answer : 

 i will create an element in memory, give it content, then append it to an existing element on the page.

Here is the complete process in one code block:

<!-- Let's assume this HTML on page: -->

<ul id="my-list"><li>First item</li></ul>

<!-- 1. Create the new element -->
const newItem = document.createElement('li');

<!--2. Add content to it -->
newItem.textContent = 'Second item';

<!--3. Find the parent element on the page -->
const parentList = document.querySelector('#my-list');

<!--4. Append the new element to the parent -->
parentList.appendChild(newItem);

3. What is **Event Bubbling** and how does it work?

As an example, here's a shorter form of that previous question on Event Bubbling:

Event bubbling is an event which is fired on an element and also fires on its parent, then   parent of p arent , and so on, up the page.

Think of it like Russian dolls—it happens that if  click the innermost doll, then 're clicking all the outer dolls that contain it as well. So, when  click a button inside a  div, the button click event will occur first, and then the click event for the div

This is very convenient for event delegation, where  just listen for clicks on an outer container to process all of the things inside. If  ever do need to stop the bubble, just call event.stopPropagation()  in the event handler.

4. What is **Event Delegation** in JavaScript? Why is it useful?

Answer: 

Event delegation is a simple and powerful pattern where  put a single event listener on a parent element instead of putting one on every single child element.

Think of it like a parent supervising kids playing in a room. Instead of giving each kid their own walkie-talkie to call  (which is a lot to manage),  just stand in the doorway and listen. When a kid needs something, they shout, and  can easily tell who it was.



<!-- How It Works -->

It relies on event bubbling. When  click a child element, that event "bubbles up" to the parent. The listener on the parent then catches the event and checks the `event.target` property to figure out exactly which child was clicked.

Example Code:

html
<ul id="parent-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>


javascript

// Instead of a listener on each <li>, we put one on the <ul>
const parentList = document.querySelector('#parent-list');

parentList.addEventListener('click', function(event) {
  // Check if the clicked element was an <li>
  if (event.target.tagName === 'LI') {
    console.log(' clicked on:', event.target.textContent);
  }
});




 <!-- Why It's So Useful -->

There are two huge benefits to this approach:

1.  It's More Efficient:  have just one event listener instead of potentially hundreds. This saves a lot of memory and keeps r page running smoothly, especially on long lists or big tables.

2.  It Works on Dynamic Elements: If  add a new child element to the parent later (like a new <li> added via JavaScript), the event listener will automatically work for it.  don't have to remember to add a new listener, which makes managing dynamic content way easier.



5. What is the difference between **preventDefault() and stopPropagation()** methods?



They do two completely different jobs. One stops the browser's default action, while the other stops the event's journey.


event.preventDefault()

This method stops the browser from doing what it would normally do for that specific event. It cancels the default browser behavior.

Analogy: You click on a submit button. The browser's default action is to refresh the page. preventDefault() is like shouting "STOP! Don't refresh the page, I'll handle what happens next with my own JavaScript."

Common uses:
Preventing a form from submitting and reloading the page.
Preventing a link (<a> tag) from navigating to a new URL.

It cancels the action, but the event will still bubble up to parent elements.


event.stopPropagation()

This method stops an event from traveling up the DOM tree to its parent elements. It stops event bubbling.

Analogy: You click a button that's inside a div. Normally, the click event would "bubble up" and trigger the div's click event too. stopPropagation() is like telling the button, "Your event stops here. Don't tell your parent div that you were clicked."

Common uses:
When a parent and a child element both have click events, but you only want the child's event to run.

It stops the journey, but it doesn't stop the browser's default action for that element (like a form submitting).


The Bottom Line:

  
<!-- Method  -->
`preventDefault() 
stopPropagation()

<!-- What It Stops -->
The browser's default action           
The event's journey (bubbling) 

<!-- In Simple Terms -->

 "Don't tell your parents about this." 
 "Don't do the usual thing." 