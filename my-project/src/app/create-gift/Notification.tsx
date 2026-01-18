type NotificationData = {
  show: boolean;
  text: string;
  type: "info" | "success" | "warning" | "error";
};

export default function Notification({
  data,
}: {
  data: NotificationData;
}) {
  if (!data.show) return null;

  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 
      px-6 py-3 rounded-xl text-white shadow-xl
      ${colors[data.type]}`}
    >
      {data.text}
    </div>
  );
}
