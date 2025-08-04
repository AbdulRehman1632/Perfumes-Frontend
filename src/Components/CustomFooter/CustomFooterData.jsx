import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TikTokIcon from "@mui/icons-material/MusicNote";
export const footerData = [
  {
    // heading: "LOGO",
    image: "/assets/images/logo.png",
    para: "Best services for your online store growth.",
  },
  {
    heading: "Pages",
    links: [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Contact Us", path: "/contact" },
  
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Help center", path: "" },
      { label: "Terms & Conditions", path: "" },
      { label: "Privacy policy", path: "" },
      { label: "Returns & refund", path: "" },
      { label: "Survey & feedback", path: "" },
      
    ],
  },
 {
  heading: "Contact Us",
  links: [
    {
      label: "615 8th St, San Fernando",
      path: "https://www.google.com/maps/search/?api=1&query=615+8th+St,+San+Fernando,+CA+91340,+United+States"
    },
    { label: "+1 (808) 301-4984", path: "tel:+18083014984" },
    { label: "info@theproductist.com", path: "" },
  ],
}
]


  export const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/yourpage",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      link: "https://www.twitter.com/yourprofile",
    },
    {
      name: "YouTube",
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/yourchannel",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/yourprofile",
    },
    {
      name: "TikTok",
      icon: <TikTokIcon />, 
      link: "https://www.tiktok.com/@yourusername",
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/in/yourprofile",
    },
    {
      name: "Pinterest",
      icon: <PinterestIcon />,
      link: "https://www.pinterest.com/yourprofile",
    },
  ];
  