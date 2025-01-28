const routes = {
  home: {
    path: "/home",
    element: "Home",
    isProtected: true,
  },
  profile: {
    path: "/profile/:username",
    element: "ViewProfile",
    isProtected: true,
  },
  editProfile: {
    path: "/editProfile",
    element: "EditProfile",
    isProtected: true,
  },
  notifications: {
    path: "/notifications",
    element: "Notification",
    isProtected: true,
  },
  following : {
    path: "/following",
    element : "FollowingList",
    isProtected : true,
  },
  followers : {
    path: "/followers",
    element : "FollowerList",
    isProtected : true,
  },
  search: {
    path: "/search",
    element: "Search",
    isProtected: true,
  },
  login: {
    path: "/",
    element: "Login",
    isProtected: false,
  },
  signup: {
    path: "/signup",
    element: "Signup",
    isProtected: false,
  },
  forgetPassword: {
    path: "/forget",
    element: "ForgetPassword",
    isProtected: false,
  },
  notFound: {
    path: "*",
    element: "NotFound",
    isProtected: false,
  },
};

export default routes;
