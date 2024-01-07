import "./UserProfile.css";
import proimg from "./prof.jpg";
import {AiOutlineEdit} from 'react-icons/ai'
import ProfileBl from "../ProfileBl/ProfileBl"
import FeedBackForm from "../../FeedBackForm/FeedBackForm";

function UserProfile() {
  return (
    <div className="profile-page">
      <h1 className="page-head">Profile</h1>
      <div className="profile-top">
        <img src={proimg} alt="" />
        <h2 className="profile-name">Gandhi</h2>
        <span className="profile-id">id : w343dcsx</span>
        <AiOutlineEdit className="profile-edit"/>
      </div>
      <div className="profile-bottom">
        <div className="profile-left">
          <ProfileBl className="profile-left-tabel"/>
        </div>
        <div className="profile-right">
          <FeedBackForm/>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
