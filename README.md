
---

# Angular Blogging App Documentation

## Overview

The Angular Blogging App is a Single Page Application (SPA) built with Angular and Angular Server-Side Rendering (SSR). It incorporates various features for a seamless blogging experience, including CRUD operations, pagination, search filtering, state management, and several third-party libraries and tools for enhanced functionality and aesthetics.

## Features

1. **Angular SSR:**
   - The app leverages Angular Server-Side Rendering for improved performance and SEO optimization.

2. **CRUD Operations:**
   - Full implementation of Create, Read, Update, and Delete (CRUD) operations for blog posts.

3. **Pagination and Search Filtering:**
   - The app provides pagination for easy navigation through blog posts.
   - Incorporates search filtering for efficient content discovery.

4. **State Management with Ngrx:**
   - Utilizes Ngrx for robust state management, ensuring a scalable and maintainable application.

5. **Styling with Bootstrap and Tailwind CSS:**
   - Combines the styling capabilities of Bootstrap and Tailwind CSS for a visually appealing and responsive design.

6. **Carousel Slider:**
   - Integrates `ngx-slick-carousel`, `slick-carousel`, and `jquery` to implement a feature-rich carousel slider for dynamic and interactive content presentation.

7. **Animation with AOS:**
   - Employs AOS (Animate On Scroll) for smooth and engaging animations throughout the app.

8. **Alerts with ngx-toastr:**
   - Implements `ngx-toastr` for displaying user-friendly alerts, enhancing the user experience.

9. **Lightbox Display with ng-gallery:**
   - Utilizes `ng-gallery` for an elegant lightbox display, supporting image viewing and playing YouTube videos.

10. **Reactive Forms for Post Management:**
    - Leverages Angular Reactive Forms for creating and updating blog posts, ensuring a dynamic and user-friendly experience.

11. **Angular 17 Updates:**
    - Takes advantage of the latest features in Angular 17, including the use of `signal` and `toSignal` for enhanced functionality and subscribing to observables without using async pipes. This feature of subscribing to observables with `toSignal()` 

## Example

 ```typescript
    this.posts = toSignal(this.posts$, {initialValue: null})
 ```

  This makes it simple to subscribe to an observable without having to make sure you unsubscribe from the observable when the component is terminated.

## Installation

To run the Angular Blogging App locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/KellynCodes/stackbuild-blog-site.git
   ```

2. Install dependencies:

   ```bash
   cd angular-blogging-app
   npm install
   ```

3. Build and serve the app:

   ```bash
   npm run build:ssr
   npm run serve:ssr
   ```

4. Access the app in your browser at `http://localhost:4200`.

## Conclusion

The Angular Blogging App combines modern technologies and libraries to provide a feature-rich and visually appealing blogging experience. It incorporates the latest Angular updates, ensuring scalability and performance. Feel free to explore the source code and customize it according to your requirements.

For detailed information on specific features, refer to the relevant sections of this documentation.

---
