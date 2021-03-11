import UserCard from "../../component/profile/userCard";
import UserLink from "../../component/profile/UserLink";
import UserInfo from "../../component/profile/UserInfo";
import UserAbout from "../../component/profile/UserAbout";
import UserSkills from "../../component/profile/UserSkills";
import React from "react";

export default function profile() {
    return (
        <div className="container">
            <br/>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard/>
                        <UserLink/>
                    </div>
                    <div className="col-md-8">
                        <UserAbout/>
                        <UserInfo/>
                        <UserSkills/>
                    </div>
                </div>
            </div>
        </div>
    );
}