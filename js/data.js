const { useState, useEffect, useRef } = React;

const CIRCLES = [
  {
    id: 1, name: "My Family", type: "Family", role: "Admin",
    gradient: "linear-gradient(135deg,#FF6B6B,#FFA552)",
    icon: "assets/icons/circles/heart 1.svg",
    members: [
      { id: "sasha", initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { id: "mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
      { id: "ben",   initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)" },
      { id: "tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
      { id: "dad",   initial: "D", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
    ],
  },
  {
    id: 2, name: "Work", type: "Work", role: "Member",
    gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)",
    icon: "assets/icons/circles/work 1.svg",
    members: [
      { id: "sasha", initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { id: "ben",   initial: "B", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
      { id: "tanya", initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
    ],
  },
  {
    id: 3, name: "Beersaurus", type: "Friends", role: "Owner",
    gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)",
    icon: "assets/icons/circles/user 1.svg",
    members: [
      { id: "sasha", initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { id: "mom",   initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
    ],
  },
  {
    id: 4, name: "First Test", type: "Other", role: "Owner", archived: true,
    gradient: "linear-gradient(135deg,#A18CD1,#FBC2EB)",
    icon: "assets/icons/circles/star 1.svg",
    members: [
      { id: "sasha", initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { id: "alex",  initial: "A", gradient: "linear-gradient(135deg,#4F5BD5,#7B6FE0)" },
    ],
  },
  {
    id: 5, name: "Second Default", type: "Community", role: "Admin", archived: true,
    gradient: "linear-gradient(135deg,#4F5BD5,#A44FD5)",
    icon: "assets/icons/circles/category 1.svg",
    members: [
      { id: "sasha", initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { id: "kate",  initial: "K", gradient: "linear-gradient(135deg,#F857A6,#FF5858)" },
      { id: "lev",   initial: "L", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
    ],
  },
];

const CIRCLE_MEMBERS = {
  1: [
    { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sasha", role: "Admin",  status: "Active now",          isCurrentUser: true },
    { initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", name: "Mom",   role: "Member", status: "Home · 2 min ago" },
    { initial: "D", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", name: "Dad",   role: "Member", status: "Work · 5 min ago" },
    { initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", name: "Ben",   role: "Owner",  status: "On the move · Just now" },
    { initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", name: "Tanya", role: "Member", status: "9th Street · 2h ago" },
  ],
  2: [
    { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sasha", role: "Member", status: "Active now",          isCurrentUser: true },
    { initial: "B", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", name: "Ben",   role: "Admin",  status: "On the move · Just now" },
    { initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", name: "Tanya", role: "Owner",  status: "9th Street · 2h ago" },
  ],
  3: [
    { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sasha", role: "Owner",  status: "Active now", isCurrentUser: true },
    { initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", name: "Mom",   role: "Member", status: "Home · 2 min ago" },
  ],
  4: [
    { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sasha", role: "Owner",  status: "Active now", isCurrentUser: true },
    { initial: "A", gradient: "linear-gradient(135deg,#4F5BD5,#7B6FE0)", name: "Alex",  role: "Member", status: "Offline · 3d ago" },
  ],
  5: [
    { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sasha", role: "Admin",  status: "Active now", isCurrentUser: true },
    { initial: "K", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", name: "Kate",  role: "Owner",  status: "Studio · 1h ago" },
    { initial: "L", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", name: "Lev",   role: "Member", status: "Offline · 1w ago" },
  ],
};

const CURRENT_USER = { initial: "S", name: "Sasha", email: "sasha@heartify.io", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" };

const CIRCLE_ICON_OPTIONS = [
  { file: "heart 1.svg",    gradient: "linear-gradient(135deg,#F857A6,#FF5858)" },
  { file: "home 1.svg",     gradient: "linear-gradient(135deg,#4F5BD5,#7B6FE0)" },
  { file: "happy 1.svg",    gradient: "linear-gradient(135deg,#FF6B6B,#FFA552)" },
  { file: "work 1.svg",     gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
  { file: "star 1.svg",     gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
  { file: "user 1.svg",     gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
  { file: "pet 1.svg",      gradient: "linear-gradient(135deg,#A18CD1,#FBC2EB)" },
  { file: "category 1.svg", gradient: "linear-gradient(135deg,#4F5BD5,#A44FD5)" },
];

const CIRCLE_TYPES = ["Family", "Friends", "Work", "Community", "Other"];

const PLACE_ICON_KEYS = ["home", "heart", "briefcase", "coffee", "dumbbell", "shop", "star", "location"];

const PLACE_ICON_DEFS = {
  home:      { gradient: "linear-gradient(135deg,#7B68E8,#5FA8C8)", label: "Home",      file: "home.svg" },
  heart:     { gradient: "linear-gradient(135deg,#F857A6,#FF5858)", label: "Heart",     file: "heart.svg" },
  briefcase: { gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", label: "Work",      file: "briefcase.svg" },
  coffee:    { gradient: "linear-gradient(135deg,#FF6B6B,#FFA552)", label: "Coffee",    file: "coffee.svg" },
  dumbbell:  { gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", label: "Gym",       file: "dumbbell.svg" },
  shop:      { gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", label: "Shop",      file: "shop.svg" },
  star:      { gradient: "linear-gradient(135deg,#8E70C8,#C77DBB)", label: "Favourite", file: "star.svg" },
  location:  { gradient: "linear-gradient(135deg,#4F5BD5,#A44FD5)", label: "Pin",       file: "location.svg" },
};

const MAP_PINS = [
  { id: "sasha", initial: "S", name: "Sasha", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", lat: 34.052, lng: -118.243, status: "19 Plympton Street",   time: "Online", online: true,  isCurrentUser: true },
  { id: "ben",   initial: "B", name: "Ben",   gradient: "linear-gradient(135deg,#F857A6,#FF5858)", lat: 34.059, lng: -118.235, status: "100 Industrial Way",   time: "Online", online: true, sosActive: true },
  { id: "mom",   initial: "M", name: "Mom",   gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", lat: 34.047, lng: -118.255, status: "742 Evergreen Terrace", time: "5m ago", online: false },
  { id: "tanya", initial: "T", name: "Tanya", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", lat: 34.063, lng: -118.250, status: "9th Street",            time: "2h ago", online: false },
  { id: "dad",   initial: "D", name: "Dad",   gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)", lat: 34.044, lng: -118.262, status: "Oak Avenue",            time: "1h ago", online: false },
];

const PLACES = [
  { id: 1, name: "Cill",    icon: "heart",     circleId: 1, radius: 230, lat: 34.0522, lng: -118.2437, archived: false, sensitive: false, address: "350 S Grand Ave, Los Angeles" },
  { id: 2, name: "Spotiks", icon: "dumbbell",  circleId: 1, radius: 290, lat: 34.0430, lng: -118.2673, archived: true,  sensitive: false, address: "1111 S Figueroa St, Los Angeles" },
  { id: 3, name: "Cafe",   icon: "coffee",    circleId: 2, radius: 150, lat: 34.0611, lng: -118.2371, archived: false, sensitive: false, address: "727 N Broadway, Los Angeles" },
  { id: 4, name: "Office", icon: "briefcase", circleId: 1, radius: 140, lat: 34.0489, lng: -118.2518, archived: false, sensitive: false, address: "555 W 5th St, Los Angeles" },
  { id: 5, name: "Home",   icon: "home",      circleId: 1, radius: 50,  lat: 34.0668, lng: -118.3000, archived: false, sensitive: false, address: "1234 N Cahuenga Blvd, Hollywood" },
];
