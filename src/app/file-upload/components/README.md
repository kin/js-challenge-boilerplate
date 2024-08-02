# File Upload Feature Module
This directory contains the components for the "File Upload" feature. 

## Assumptions

### Responsive & Mobile-First
I followed a mobile-first development flow to keep the app responsive. As a result, some components use the following naming convention for their selectors:

- kn-{ componentNameBase }-{ deviceType }

The "deviceType" part of the name should be self-explanatory, and I created components specific to the device when there are cases where I wanted to use different html elements or css styling that didn't make sense to represent in a css media query. For example, to represent the same data, a list might be more appropriate for a mobile view, and likewise a table might be more appropriate for a desktop view. I find this sometimes works better than having Angular go through the motions to render two or more views and then only show one by hiding the others based on a css media query. 

<b>Note:</b> For this project I left out views that would be specific to tablets in the interest of time.

