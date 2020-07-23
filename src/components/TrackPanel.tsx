import React from "react";

interface TrackGoalPanelProps
{
    tracks: Track[];
}

const renderReferences = (references: PrimaryReference[]) =>
{
    if (references.length === 0)
    {
        return ("");
    }

    const text =
        references.map(reference =>
            reference.subGoals.length === 0 ?
                reference.goal :
                reference.goal + " " + reference.subGoals.join(", ")
        ).join("; ");
    
    return ("(" + text + ")");
};

const TrackPanel = ({ tracks }: TrackGoalPanelProps) =>
    <>
        {
            tracks.map((track, index) =>
                <div id={"track_" + track.track} className={"mb-1" + (index < tracks.length - 1 ? " border-b-1" : "") }>
                    <a className="block td-none text-center cursor-pointer">{track.track}</a>
                    <ol type="1">
                        {
                            track.goals.map(goal =>
                                <li key={goal.id} className="mb-1-3">{goal.text} {renderReferences(goal.references)}</li>
                            )
                        }
                    </ol>
                </div>
            )
        }
    </>;

export default TrackPanel;