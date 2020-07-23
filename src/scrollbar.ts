let scrollBarWidth = -1;

/**
 * Computes the width of the browser's builtin scrollbar.
 */
const getScrollBarWidth = function ()
{
	if (scrollBarWidth != -1)
	{
		return (scrollBarWidth);
	}

	const scrollDiv = document.createElement("div");
	scrollDiv.classList.add("scrollbar-measure");
	document.body.appendChild(scrollDiv);

	scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);

	return (scrollBarWidth);
};

/**
 * Adds events to only show the scrollbar when the user's mouse is over the target element.
 * @param element The container element.
 */
const createScrollWrapper = function (element: HTMLElement)
{
	const child = element.firstElementChild;

	if (child == null || !(child instanceof HTMLElement))
	{
		return;
	}

	child.style.paddingRight = getScrollBarWidth() + "px";

	child.addEventListener("mouseover", () => child.style.paddingRight = "0");
	child.addEventListener("mouseout", () => child.style.paddingRight = getScrollBarWidth() + "px");
};

export default {};