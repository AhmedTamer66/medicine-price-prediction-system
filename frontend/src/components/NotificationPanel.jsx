import {
  FaBell,
  FaArrowUp,
  FaCheckCircle,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    icon: <FaArrowUp className="text-red-500" />,
    text: "Price increase predicted for Panadol",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-500" />,
    text: "Database synchronized successfully",
  },
  {
    id: 3,
    icon: <FaBell className="text-yellow-500" />,
    text: "3 medicines have new price updates",
  },
];

export default function NotificationPanel() {
  return (
    <div className="rounded-xl bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            {item.icon}

            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}