import React, { useEffect } from "react";
import { Highlight } from "../highlight";

let isFirstChange = true;

const setState = (url: string, state: any) =>
{
    if (isFirstChange)
    {
        history.pushState(state, document.title, url);
        isFirstChange = false;
    }
    else
    {
        history.replaceState(state, document.title, url);
    }
};

const useQuery = (highlight: Highlight, setHighlight: (value: Highlight) => void) =>
{
    // TODO: Finish this.
    const getState = () =>
    {
        return (
            Object.values(highlight.courses).map(course =>
                course.course
            )
        );
    };

    // Feels kind of clunky, but not sure how to do it better right now.
    useEffect(() =>
    {
        let isMounted = true;

        const handler = (event: PopStateEvent) =>
        {
            // Empty state means the user is resetting their session.
            if (event.state === null || event.state === undefined)
            {

            }
            // Jump to the correct selection
            else
            {

            }
        };

        window.addEventListener("popstate", handler);

        return (() =>
        {
            isMounted = false;
            window.removeEventListener("popstate", handler);
        })
    }, []);
};

export default useQuery;