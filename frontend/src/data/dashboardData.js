import {
  BsBook,
 BsJoystick,
  BsYoutube,
  BsFire,
} from "react-icons/bs"

console.log({
  BsBook,
  BsJoystick,
  BsYoutube,
  BsFire,
});
export const stats =[

  {
  id: 1,
  title:"Study Time",
  value: "3h 20m",
  percentage:"↑ 18% vs yesterday",
  icon: BsBook,
  variant:"study"
},
 {
    id: 2,
    title: "Entertainment Time",
    value: "45m",
    percentage: "↓ 22% vs yesterday",
    icon: BsJoystick,
    variant: "entertainment",
  },
  {
    id: 3,
    title: "Videos Watched",
    value: "12",
    percentage: "↑ 2 vs yesterday",
    icon: BsYoutube,
    variant: "video",
  },

  {
    id: 4,
    title: "Study Streak",
    value: "7 Days",
    percentage: "🔥 Keep it up!",
    icon: BsFire,
    variant: "streak",
  },

]

export const pieChartData = [
  {
    name: "Study",
    value: 75,
  },
  {
    name: "Entertainment",
    value: 25,
  },
];

export const weeklyStudyData = [
  {
    day: "Mon",
    hours: 2,
  },
  {
    day: "Tue",
    hours: 3,
  },
  {
    day: "Wed",
    hours: 1.5,
  },
  {
    day: "Thu",
    hours: 4,
  },
  {
    day: "Fri",
    hours: 3.5,
  },
  {
    day: "Sat",
    hours: 5,
  },
  {
    day: "Sun",
    hours: 4.2,
  },
];

export const recentVideos = [
  {
    id: 1,
    thumbnail: "/thumbnails/react.jpg",
    title: "React JS Full Course for Beginners",
    channel: "SuperSimpleDev",
    category: "Study",
    duration: "1:32:45",
    time: "Today, 10:30 AM",
  },

  {
    id: 2,
    thumbnail: "/thumbnails/node.jpg",
    title: "Node.js & Express.js Full Course",
    channel: "CodeWithHarry",
    category: "Study",
    duration: "2:45:10",
    time: "Today, 08:15 AM",
  },

  {
    id: 3,
    thumbnail: "/thumbnails/java.jpg",
    title: "DSA in Java",
    channel: "Apna College",
    category: "Study",
    duration: "1:15:30",
    time: "Yesterday, 09:20 PM",
  },

  {
    id: 4,
    thumbnail: "/thumbnails/comedy.jpg",
    title: "Top 10 Comedy Scenes 😂",
    channel: "FunnyVines",
    category: "Entertainment",
    duration: "15:20",
    time: "Yesterday, 07:40 PM",
  },

  {
    id: 5,
    thumbnail: "/thumbnails/roadmap.jpg",
    title: "Web Development Roadmap",
    channel: "Traversy Media",
    category: "Study",
    duration: "22:18",
    time: "Yesterday, 05:10 PM",
  },
];

export const topSubjects = [
  {
    id: 1,
    subject: "JavaScript",
    percentage: 35,
  },
  {
    id: 2,
    subject: "React",
    percentage: 25,
  },
  {
    id: 3,
    subject: "Java",
    percentage: 20,
  },
  {
    id: 4,
    subject: "Node.js",
    percentage: 12,
  },
  {
    id: 5,
    subject: "Others",
    percentage: 8,
  },
];