# Q1: Why did you structure the component the way you did?

I chose to create a "shared" folder to hold any logic that can be reused across the project.
"shared" folder contains:

- **components:** This is where our design system lives
- **constants:** Includes all the constants/arrays our project needs
- **types:** Types definitions

**Components Structure:** Since this is an Angular project you'll find the typical files a component needs.
**Styling :**

- global styles are located in `styles.scss`: reset rules, css variables..
- I implemented a simple design token system to allow switching components colors/sizes (defaults are primary/md). A css class is appended inside the component's template e.g `color-secondary` then the table's css variables are overriden based on the chosen variant:
  `&.color-secondary {`
  `--color: var(--secondary-color);`
  `}`

# Q2: What trade-offs did you consciously make?

In different circumstances I'd :

- Use Angular signals for reactivity/state management.
- Style the table much differently, maybe I'd use custom layout instead of html table markup, to support fixed column widths and have more control over the css in general.
- Improve the overall user experience by adding (for e.g) : support for multi-column sorting, smarter pagination steps (for larger datasets)

# Q3: Where could this component break at scale?

Mostly UI related breaks like overflows/readability issues caused by too many columns or pagination steps.
The fact that it's paginated reduces the risk of breaking drastically since the DOM won't be overloaded with thousands of rows.
But theoretically if we stress test this component with huge datasets without the use of any pagination, infinite scrolling or virtualization. We can expect performance degradation (e.g laggy scrolling) or even breaking the tab by hitting the js heap memory limit, specially if we use bunch of custom rendered columns

# Q4: What would change if this needed to support both Angular AND React?

If we were to add support for both React and Angular, this component has to be rebuilt as a Web Component and become framework agnostic. StencilJS helps with following the best practices and guidelines for such components.

# Q5: Describe one specific bug or edge case you encountered and how you fixed it.

When implementing the table logic I came across some edge cases while navigating the table pages, like losing the filter or the sorting when switching pages. Since each method used to re-assign the `displayedRows` by itself it was hard to keep everything in sync. So I chose to centralize everything in one function responsible for updating the visible rows: `displayData`. This way, whenever the table needed to update I call that function to handle filtering/sorting/pagination.
