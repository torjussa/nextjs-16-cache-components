import { cacheLife } from "next/cache";
async function fetchNotifications(): Promise<number> {

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Math.floor(Math.random() * 100);
}

export async function NotificationsCount() {
  const notifications = await fetchNotifications();

  return (
    <span className=" -top-3 -right-4 absolute bg-orange-800 text-white w-6 h-6 rounded-full p-1 text-xs">
      {notifications}
    </span>
  );
}
