export const list = function (...values: (string | undefined | null)[])
{
    return (
        values.filter(value => value !== "" && value !== null && value !== undefined).join(" ")
    );
};

export const courseNames: CourseId[] = [ "HMN", "THL", "PHL", "MTH/SCI", "MUS/ART", "TRV", "LAT", "OLP" ];

export const getNextCourse = function (course: CourseId)
{
    const index = courseNames.indexOf(course) + 1;
    const corrected = index < courseNames.length ? index : 0;

    return (courseNames[corrected]);
};

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

export const scrollIntoView = function (target: HTMLElement | null)
{
    if (target == null)
    {
        return;
    }

    animateScroll(target, findScroll(target), 10, 1);
};