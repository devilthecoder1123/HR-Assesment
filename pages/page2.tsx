/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const tabs = [
  { name: "Applied", href: "#", count: "2", current: false },
  { name: "Phone Screening", href: "#", count: "4", current: false },
  { name: "Interview", href: "#", count: "3", current: true },
  { name: "Offer", href: "#", count: "3", current: false },
  { name: "Disqualified", href: "#", count: "2", current: false },
];

const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Phone Screening",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1485599341290-72b539f227a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "January 15, 2020",
    appliedDatetime: "2020-07-10T16:00:00",
    status: "Phone Screening",
  },
  {
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    imageUrl: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3MlMjB3b21hbnxlbnwwfDF8MHx8fDA%3D",
    applied: "February 2, 2020",
    appliedDatetime: "2020-07-20T11:20:45",
    status: "Completed phone screening",
  },
  {
    name: "Michael Smith",
    email: "michael.smith@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214e9df14a4d3e5d43f4d80b9d46c59e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "February 15, 2020",
    appliedDatetime: "2020-08-05T14:15:22",
    status: "Offer",
  },
  {
    name: "Linda Davis",
    email: "linda.davis@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1599565731456-826047fa25da?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "March 1, 2020",
    appliedDatetime: "2020-08-10T10:30:56",
    status: "Disqualified",
  },
  {
    name: "James Wilson",
    email: "james.wilson@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1596598587488-9d2b64c1f5b1?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0MjQ5&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "March 10, 2020",
    appliedDatetime: "2020-08-15T12:45:30",
    status: "Applied",
  },
  {
    name: "Patricia Johnson",
    email: "patricia.johnson@example.com",
    imageUrl: "https://images.unsplash.com/photo-1640058909005-161a3a2db3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1c2luZXNzJTIwd29tYW58ZW58MHwxfDB8fHww",
    applied: "April 1, 2020",
    appliedDatetime: "2020-08-20T08:55:40",
    status: "Phone Screening",
  },
  {
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1600745781275-56b856fc5c6e?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "April 10, 2020",
    appliedDatetime: "2020-09-01T13:25:20",
    status: "Completed phone screening",
  },
  {
    name: "Jessica Brown",
    email: "jessica.brown@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NTEx&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "May 1, 2020",
    appliedDatetime: "2020-09-10T17:40:10",
    status: "Offer",
  },
  {
    name: "William Taylor",
    email: "william.taylor@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555685810-03927ff35b68?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NjE2&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "May 15, 2020",
    appliedDatetime: "2020-09-20T09:15:30",
    status: "Disqualified",
  },
  {
    name: "Karen Lewis",
    email: "karen.lewis@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1602553280508-1a9209491d05?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0Njg2&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "June 1, 2020",
    appliedDatetime: "2020-10-01T14:20:40",
    status: "Applied",
  },
  {
    name: "David Anderson",
    email: "david.anderson@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1563825474-13a0d8b53c3d?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NzE2&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "June 15, 2020",
    appliedDatetime: "2020-10-10T11:35:50",
    status: "Phone Screening",
  },
  {
    name: "Nancy Wilson",
    email: "nancy.wilson@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1544717301-b16b9cc1cc66?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NzI5&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "July 1, 2020",
    appliedDatetime: "2020-10-20T10:10:00",
    status: "Completed phone screening",
  },
  {
    name: "Daniel White",
    email: "daniel.white@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1588776819722-0549ae631c8e?ixid=MXwyMTI4MTd8MHwxfGFsbHwxfHx8fHx8fHwxNjc4Njg0NzYx&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    applied: "July 15, 2020",
    appliedDatetime: "2020-11-01T15:50:15",
    status: "Offer",
  },
];


const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selected, setSelected] = useState(publishingOptions[0]);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const filteredCandidates = candidates.filter(candidate => activeTab === "Interview" ? candidate.status === "Completed phone screening" : candidate.status === activeTab);



  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        {/* Navbar */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Logout
        </button>
        <Disclosure as="nav" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=500"
                    className="h-8 w-auto"
                  />
                </div>

                {/* Links section */}
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current ? "bg-gray-100" : "hover:text-gray-700",
                          "rounded-md px-3 py-2 text-sm font-medium text-gray-900",
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                {/* Search section */}
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-500">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>

              {/* Actions section */}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 flex-shrink-0">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="border-b border-gray-200 bg-gray-50 lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current ? "bg-gray-100" : "hover:bg-gray-100",
                    "block rounded-md px-3 py-2 font-medium text-gray-900",
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav aria-label="Breadcrumb" className="flex">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Jobs
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                      />
                      <a
                        href="#"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Engineering
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Back End Developer
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  Full-time
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  Remote
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  $120k &ndash; $140k
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  Closing on January 9, 2020
                </div>
              </div>
            </div>
            <div className="mt-5 flex xl:ml-4 xl:mt-0">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  Edit
                </button>
              </span>

              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <LinkIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  View
                </button>
              </span>

              <Listbox
                as="div"
                value={selected}
                onChange={setSelected}
                className="sm:ml-3"
              >
                <Label className="sr-only">Change published status</Label>
                <div className="relative">
                  <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                    <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                      <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-purple-500 px-3 py-2 text-white shadow-sm">
                        <CheckIcon
                          aria-hidden="true"
                          className="-ml-0.5 h-5 w-5"
                        />
                        <p className="text-sm font-semibold">{selected.name}</p>
                      </div>
                      <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-purple-500 p-2 hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50">
                        <span className="sr-only">Change published status</span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-white"
                        />
                      </ListboxButton>
                    </div>
                  </div>

                  <ListboxOptions
                    transition
                    className="absolute left-0 z-10 -mr-1 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:left-auto sm:right-0"
                  >
                    {publishingOptions.map((option) => (
                      <ListboxOption
                        key={option.name}
                        value={option}
                        className="group cursor-default select-none p-4 text-sm text-gray-900 data-[focus]:bg-purple-500 data-[focus]:text-white"
                      >
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p className="font-normal group-data-[selected]:font-semibold">
                              {option.name}
                            </p>
                            <span className="text-purple-500 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </span>
                          </div>
                          <p className="mt-2 text-gray-500 group-data-[focus]:text-purple-200">
                            {option.description}
                          </p>
                        </div>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                  More
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Edit
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      View
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pb-16 pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Candidates</h2>

              {/* Tabs */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  value={activeTab}
                  onChange={(e) => handleTabClick(e.target.value)}
                  className="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  {tabs.map((tab) => (
                    <option key={tab.name} value={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav aria-label="Tabs" className="-mb-px mt-2 flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => handleTabClick(tab.name)}
                        className={classNames(
                          tab.name === activeTab
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                        )}
                      >
                        {tab.name}
                        {tab.count ? (
                          <span
                            className={classNames(
                              tab.name === activeTab
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-900",
                              "ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
                            )}
                          >
                            {tab.count}
                          </span>
                        ) : null}
                      </button>

                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Stacked list */}
            <ul
              role="list"
              className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
            >
              {filteredCandidates.map((candidate) => (
                <li key={candidate.email}>
                  <a href="#" className="group block">
                    <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src={candidate.imageUrl}
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-purple-600">
                              {candidate.name}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <EnvelopeIcon
                                aria-hidden="true"
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              />
                              <span className="truncate">
                                {candidate.email}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on{" "}
                                <time dateTime={candidate.appliedDatetime}>
                                  {candidate.applied}
                                </time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  aria-hidden="true"
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                />
                                {candidate.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
            >
              <div className="-mt-px flex w-0 flex-1">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  <ArrowLongLeftIcon
                    aria-hidden="true"
                    className="mr-3 h-5 w-5 text-gray-400"
                  />
                  Previous
                </a>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  1
                </a>
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <a
                  href="#"
                  aria-current="page"
                  className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
                >
                  2
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  3
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  4
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  5
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  6
                </a>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  Next
                  <ArrowLongRightIcon
                    aria-hidden="true"
                    className="ml-3 h-5 w-5 text-gray-400"
                  />
                </a>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}
