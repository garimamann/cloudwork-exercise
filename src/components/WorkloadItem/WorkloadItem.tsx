import React from "react";
import TimeAgo from "react-timeago";
import { Status } from "../../state/workloads";

export interface WorkloadItemStateProps {
  id: number;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
}

export interface WorkloadItemProps
  extends WorkloadItemStateProps,
    WorkloadItemMethodProps {}

const WorkloadItem: React.SFC<WorkloadItemProps> = props => (
  <div className="WorkloadItem border w80 p2 mb2 flex flex-space-between">
    <div>
      <h3 className="WorkloadItem-heading">Workload #{props.id}</h3>
      <span className="WorkloadItem-subHeading">
        Complexity: {props.complexity}
      </span>
    </div>
    <div>
      {props.status === "WORKING" ? (
        <div className="m2 flex flex-space-between w80">
          <span>
            <TimeAgo date={props.completeDate} />
            ...
          </span>

          <button
            className="WorkloadItem-secondaryButton button"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <span className="WorkloadItem-statusText">
          {props.status.toLowerCase()}
        </span>
      )}
    </div>
  </div>
);

export { WorkloadItem };

export default WorkloadItem;
