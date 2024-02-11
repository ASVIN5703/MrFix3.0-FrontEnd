import {
    UilUserCircle,
    UilDashboard,
    UilExclamationOctagon ,
    UilPackage,
    UilFeedback,
    UilCloudDatabaseTree,
    UilProcess,
    UilRegistered,
    UilSchedule,
}  from "@iconscout/react-unicons";

  //SideBar
export const SidebarData=[
    {
        icon: UilDashboard,
        heading: "Dashboard",
        path:"/dashboard",
    },
    {
        icon: UilUserCircle,
        heading: "Profile",
        path:"/adminprofile",
    },
    
    {
        icon: UilExclamationOctagon ,
        heading: "Complaints",
        path:"/complaints",
    },
    {
        icon: UilPackage,
        heading: 'Manage',
        path:"/manage",
    },
    {
       icon: UilFeedback ,
       heading: 'Feedback'   ,
       path:"/feedback",
    }
];


export const CardsData=[
    {
        title:"Total",
        color:{
           backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
           boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        value:"20",
        png:UilCloudDatabaseTree,
    },
    {
        title:"On Progress",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          },
        value:"5",
        png:UilProcess,
    },
    {
        title: "Completed",
        color: {
        backGround:"linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
         },
         value:"10",
         png: UilRegistered,
    },
    {
        title:"Pending",
        color:{
           backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
           boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        value:"30",
        png: UilSchedule,
    }
    

]