import { CourseId } from "../models";

export const courseNames: CourseId[] = [ "HMN", "THL", "PHL", "MTH/SCI", "MUS/ART", "TRV", "LAT", "OLP" ];

/**
 * Returns the next course in sequence wrapping around to the beginning if on the last course.
 * @param course The course to find the course after.
 */
export const getNextCourse = function (course: CourseId)
{
    const index = courseNames.indexOf(course) + 1;
    const corrected = index < courseNames.length ? index : 0;

    return (courseNames[corrected]);
};

/**
 * Returns the distance needed to be scrolled to bring the specified element into view.
 * @param target The element to find the scroll distance to.
 */
const findScroll = function (target: HTMLElement)
{
    let scrollDistance = 0;
    let current = target.parentElement?.firstElementChild;

    while (current !== undefined && current !== null && current !== target)
    {
        scrollDistance += current.scrollHeight;
        current = current.nextElementSibling;
    }

    return (scrollDistance);
};
/**
 * Animates scrolling the specified target element's parent to the desired scroll target with the specified speed.
 * @param target The target to scroll to.
 * @param scrollTarget The target value for the scroll property.
 * @param speed The speed at which to scroll.
 * @param elapsed The elapsed time. Used internally to handle speeding up and slowing down.
 */
const animateScroll = function (target: HTMLElement, scrollTarget: number, speed: number, elapsed: number)
{
    const change = 0.1;
    const parent = target.parentElement;

    if (
        parent === undefined
        || parent === null
    )
    {
        return;
    }

    const distance = Math.abs(parent.scrollTop - scrollTarget);

    if (distance <= Math.abs (speed * elapsed))
    {
        // Ensures that the elements are correctly aligned.
        const bounds = target.getBoundingClientRect();
        const current = parent.scrollTop;

        parent.scrollTo (0, current + bounds.top);
        return;
    }
    else
    {
        const modifier = parent.scrollTop < scrollTarget ? 1 : -1;
        const totalSpeed = modifier * speed * elapsed;

        console.log(parent.scrollTop);
        parent.scrollTo(0, parent.scrollTop + totalSpeed);
    }

    const now = window.performance.now();

    window.requestAnimationFrame(() =>
    {
        const later = window.performance.now();
        animateScroll(target, scrollTarget, speed + change, later - now);
    });
};

/**
 * Scrolls the specified element into view.
 * @param target The element to scroll into view.
 */
export const scrollIntoView = function (target: HTMLElement | null)
{
    if (target == null)
    {
        return;
    }

    animateScroll(target, findScroll(target), 10, 1);
};