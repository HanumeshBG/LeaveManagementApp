import React, { useEffect } from "react";
import useFetch from "../../customHooks/useFetch";


const LeaveStatusWidget = () => {
    const { data: fetchedData, loading, error } = useFetch('http://localhost:3010/home/dashboard/loadstatus');
    useEffect(() => {
        if(fetchedData){
            fetchedData.result.map((leaveStatus) => {
                if(leaveStatus.status === 'applied'){
                    document.getElementById('appliedLeavesCount').innerText = leaveStatus.count;
                } else if(leaveStatus.status === 'approved'){
                    document.getElementById('approvedLeavesCount').innerText = leaveStatus.count;
                } else if(leaveStatus.status === 'rejected'){
                    document.getElementById('rejectedLeavesCount').innerText = leaveStatus.count;
                }
            })
        }
    }, [fetchedData]);

    return (
        <div className="row">
            <div className="col-sm-12 menuList" id="statusList">
                <div className="listTitle fs-5 p-2 text-body"> Leave Status </div>
                <ul className="listItem">
                        <li id="appliedLeaves">Applied <span id="appliedLeavesCount" className="badge badge-pill badge-secondary"></span></li>
                        <li id="approvedLeaves">Approved <span id="approvedLeavesCount" className="badge badge-pill badge-secondary"></span></li>
                        <li id="rejectedLeaves">Rejected <span id="rejectedLeavesCount" className="badge badge-pill badge-secondary"></span></li>
                </ul>
            </div>
        </div>
    )
}

export default LeaveStatusWidget;